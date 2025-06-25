const express = require('express');
const { PrismaClient } = require('@prisma/client');
const verifyToken = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

module.exports = router;
