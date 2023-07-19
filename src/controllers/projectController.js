const Project = require('../models/project');

class ProjectController {
  static getAllProjects(req, res) {
    Project.getAllProjects((err, projects) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(projects);
      }
    });
  }

  static getProjectById(req, res) {
    const id = req.params.id;
    Project.getProjectById(id, (err, project) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!project) {
        res.status(404).json({ error: 'Project not found' });
      } else {
        res.json(project);
      }
    });
  }

  static createProject(req, res) {
    const project = req.body;
    Project.createProject(project, (err, projectId) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ id: projectId });
      }
    });
  }

  static updateProject(req, res) {
    const id = req.params.id;
    const project = req.body;
    Project.updateProject(id, project, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(204);
      }
    });
  }

  static deleteProject(req, res) {
    const id = req.params.id;
    Project.deleteProject(id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(204);
      }
    });
  }
}

module.exports = ProjectController;
