const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/educationController');

// GET /educations
router.get('/', EducationController.getAllEducations);

// GET /educations/:id
router.get('/:id', EducationController.getEducationById);

// POST /educations
router.post('/', EducationController.createEducation);

// PUT /educations/:id
router.put('/:id', EducationController.updateEducation);

// DELETE /educations/:id
router.delete('/:id', EducationController.deleteEducation);

module.exports = router;
