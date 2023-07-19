const db = require('../config/database');

class Project {
  static getAllProjects(callback) {
    db.all('SELECT * FROM Project', (err, rows) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static getProjectById(id, callback) {
    db.get('SELECT * FROM Project WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  static createProject(project, callback) {
    const { user_id, title, description } = project;
    db.run(
      'INSERT INTO Project (user_id, title, description) VALUES (?, ?, ?)',
      [user_id, title, description],
      function (err) {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          callback(null, this.lastID);
        }
      }
    );
  }

  static updateProject(id, project, callback) {
    const { user_id, title, description } = project;
    db.run(
      'UPDATE Project SET user_id = ?, title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user_id, title, description, id],
      (err) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          callback(null);
        }
      }
    );
  }

  static deleteProject(id, callback) {
    db.run('DELETE FROM Project WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null);
      }
    });
  }
}

module.exports = Project;
