const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/goals
router.get('/', async (req, res) => {
  const goals = await prisma.goal.findMany();
  res.json(goals);
});

// POST /api/goals
router.post('/', async (req, res) => {
  const { targetKwh, startDate, endDate, userId } = req.body;
  try {
    const goal = await prisma.goal.create({
      data: { targetKwh, startDate: new Date(startDate), endDate: new Date(endDate), userId },
    });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Error creating goal' });
  }
});

// PUT /api/goals/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.goal.update({
      where: { id },
      data,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating goal' });
  }
});

// DELETE /api/goals/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.goal.delete({ where: { id } });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting goal' });
  }
});

module.exports = router;
