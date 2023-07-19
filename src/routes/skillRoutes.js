const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/skillController');

// GET /skills
router.get('/', SkillController.getAllSkills);

// GET /skills/:id
router.get('/:id', SkillController.getSkillById);

// POST /skills
router.post('/', SkillController.createSkill);

// PUT /skills/:id
router.put('/:id', SkillController.updateSkill);

// DELETE /skills/:id
router.delete('/:id', SkillController.deleteSkill);

module.exports = router;
