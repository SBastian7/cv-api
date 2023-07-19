const Skill = require('../models/skill');

class SkillController {
  static getAllSkills(req, res) {
    Skill.getAllSkills((err, skills) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(skills);
      }
    });
  }

  static getSkillById(req, res) {
    const id = req.params.id;
    Skill.getSkillById(id, (err, skill) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!skill) {
        res.status(404).json({ error: 'Skill not found' });
      } else {
        res.json(skill);
      }
    });
  }

  static createSkill(req, res) {
    const skill = req.body;
    Skill.createSkill(skill, (err, skillId) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ id: skillId });
      }
    });
  }

  static updateSkill(req, res) {
    const id = req.params.id;
    const skill = req.body;
    Skill.updateSkill(id, skill, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(204);
      }
    });
  }

  static deleteSkill(req, res) {
    const id = req.params.id;
    Skill.deleteSkill(id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(204);
      }
    });
  }
}

module.exports = SkillController;
