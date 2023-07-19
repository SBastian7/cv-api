const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

// GET /projects
router.get('/', ProjectController.getAllProjects);

// GET /projects/:id
router.get('/:id', ProjectController.getProjectById);

// POST /projects
router.post('/', ProjectController.createProject);

// PUT /projects/:id
router.put('/:id', ProjectController.updateProject);

// DELETE /projects/:id
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
