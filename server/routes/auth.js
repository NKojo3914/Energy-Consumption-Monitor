const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/email');
const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Helper to generate a random token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Password reset request
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.json({ success: true }); // Don't reveal if user exists
    const resetToken = generateToken();
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });
    // TODO: Send email with reset link (e.g., `/reset-password?token=${resetToken}`)
    console.log(`[DEV] Password reset link: http://localhost:3000/api/auth/reset-password?token=${resetToken}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process request', details: err.message });
  }
});

// Password reset
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: 'Token and new password required' });
  try {
    const user = await prisma.user.findFirst({ where: { resetToken: token, resetTokenExpiry: { gte: new Date() } } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hash, resetToken: null, resetTokenExpiry: null },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password', details: err.message });
  }
});

// Email verification (send on register)
router.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });
  try {
    const user = await prisma.user.findFirst({ where: { verifyToken: token, verifyTokenExpiry: { gte: new Date() } } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verifyToken: null, verifyTokenExpiry: null },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify email', details: err.message });
  }
});

// Register (with email verification)
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) return res.status(400).json({ error: 'All fields required' });
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const verifyToken = generateToken();
    const verifyTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
    const user = await prisma.user.create({ data: { email, name, password: hash, verifyToken, verifyTokenExpiry } });
    await sendVerificationEmail(email, verifyToken); // Send real email
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

module.exports = router;
