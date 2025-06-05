const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/devices
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const devices = await prisma.device.findMany({ where: { userId } });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching devices', details: err.message });
  }
});

// POST /api/devices
router.post('/', async (req, res) => {
  const { name, location, status, userId } = req.body;
  if (!name || !userId) return res.status(400).json({ error: 'name and userId are required' });
  try {
    const device = await prisma.device.create({
      data: { name, location, status, userId },
    });
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ error: 'Error creating device', details: err.message });
  }
});

// PUT /api/devices/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.device.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating device', details: err.message });
  }
});

// DELETE /api/devices/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.device.delete({ where: { id } });
    res.json({ message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting device', details: err.message });
  }
});

module.exports = router;
