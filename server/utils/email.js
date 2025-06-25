const nodemailer = require('nodemailer');

// Configure your SMTP transport here
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASS || 'password',
  },
});

async function sendVerificationEmail(to, verifyToken) {
  const verifyUrl = `http://localhost:3000/api/auth/verify-email?token=${verifyToken}`;
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@example.com',
    to,
    subject: 'Verify your email address',
    html: `<h2>Verify your email</h2><p>Click the link below to verify your email address:</p><a href="${verifyUrl}">${verifyUrl}</a>`
  });
  return info;
}

module.exports = { sendVerificationEmail };
