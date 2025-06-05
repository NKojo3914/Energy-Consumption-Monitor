const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/readings - Get all readings for a user (userId as query param)
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId is required' });
  try {
    const readings = await prisma.reading.findMany({ where: { userId } });
    res.json(readings);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching readings' });
  }
});

// POST /api/readings - Add a new reading
router.post('/', async (req, res) => {
  const { value, userId } = req.body;
  if (!value || !userId) return res.status(400).json({ error: 'value and userId are required' });
  try {
    const reading = await prisma.reading.create({
      data: { value, userId },
    });
    res.status(201).json(reading);
  } catch (err) {
    res.status(500).json({ error: 'Error creating reading' });
  }
});

// DELETE /api/readings/:id - Delete a reading
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.reading.delete({ where: { id } });
    res.json({ message: 'Reading deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting reading' });
  }
});

module.exports = router;
