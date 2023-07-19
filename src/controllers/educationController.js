const Education = require('../models/education');

class EducationController {
  static getAllEducations(req, res) {
    Education.getAllEducations((err, educations) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(educations);
      }
    });
  }

  static getEducationById(req, res) {
    const id = req.params.id;
    Education.getEducationById(id, (err, education) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!education) {
        res.status(404).json({ error: 'Education not found' });
      } else {
        res.json(education);
      }
    });
  }

  static createEducation(req, res) {
    const education = req.body;
    Education.createEducation(education, (err, educationId) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ id: educationId });
      }
    });
  }

  static updateEducation(req, res) {
    const id = req.params.id;
    const education = req.body;
    Education.updateEducation(id, education, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(204);
      }
    });
  }

  static deleteEducation(req, res) {
    const id = req.params.id;
    Education.deleteEducation(id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(204);
      }
    });
  }
}

module.exports = EducationController;
