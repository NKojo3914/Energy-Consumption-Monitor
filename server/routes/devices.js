const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/devices
router.get('/', async (req, res) => {
  const devices = await prisma.device.findMany();
  res.json(devices);
});

// POST /api/devices
router.post('/', async (req, res) => {
  const { name, location, status, userId } = req.body;
  try {
    const device = await prisma.device.create({
      data: { name, location, status, userId },
    });
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ error: 'Error creating device' });
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
    res.status(500).json({ error: 'Error updating device' });
  }
});

// DELETE /api/devices/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.device.delete({ where: { id } });
    res.json({ message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting device' });
  }
});

module.exports = router;
