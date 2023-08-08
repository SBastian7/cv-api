const express = require('express');
const router = express.Router();
const IncomeController = require('../controllers/incomeController');
const authenticateToken = require('../utils/authenticateToken');

router.post('/', authenticateToken, IncomeController.createIncome);

router.get('/', authenticateToken, IncomeController.getAllIncomes);

router.get('/:id', authenticateToken, IncomeController.getIncome);

router.put('/:id', authenticateToken, IncomeController.updateIncome);

router.delete('/:id', authenticateToken, IncomeController.deleteIncome);

router.get('/types', authenticateToken, IncomeController.getIncomeTypes);

module.exports = router;
