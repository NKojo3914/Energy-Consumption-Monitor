const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/goals
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const goals = await prisma.goal.findMany({ where: { userId } });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching goals', details: err.message });
  }
});

// POST /api/goals
router.post('/', async (req, res) => {
  const { targetKwh, startDate, endDate, userId } = req.body;
  if (!targetKwh || !startDate || !endDate || !userId) return res.status(400).json({ error: 'All fields are required' });
  try {
    const goal = await prisma.goal.create({
      data: { targetKwh, startDate: new Date(startDate), endDate: new Date(endDate), userId },
    });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Error creating goal', details: err.message });
  }
});

// PUT /api/goals/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.goal.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating goal', details: err.message });
  }
});

// DELETE /api/goals/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.goal.delete({ where: { id } });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting goal', details: err.message });
  }
});

module.exports = router;
