const express = require('express');
const router = express.Router();
const OutcomeController = require('../controllers/outcomeController');
const authenticateToken = require('../utils/authenticateToken');

router.post('/', authenticateToken, OutcomeController.createOutcome);

router.get('/types/', authenticateToken, OutcomeController.getOutcomeTypes);

router.get('/', authenticateToken, OutcomeController.getAllOutcomes);

router.get('/:id', authenticateToken, OutcomeController.getOutcome);

router.put('/:id', authenticateToken, OutcomeController.updateOutcome);

router.delete('/:id', authenticateToken, OutcomeController.deleteOutcome);


module.exports = router;
