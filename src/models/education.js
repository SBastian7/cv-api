const db = require('../config/database');

class Education {
  static getAllEducations(callback) {
    db.all('SELECT * FROM Education', (err, rows) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static getEducationById(id, callback) {
    db.get('SELECT * FROM Education WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  static createEducation(education, callback) {
    const { user_id, degree, institution, major, start_date, end_date } = education;
    db.run(
      'INSERT INTO Education (user_id, degree, institution, major, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, degree, institution, major, start_date, end_date],
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

  static updateEducation(id, education, callback) {
    const { user_id, degree, institution, major, start_date, end_date } = education;
    db.run(
      'UPDATE Education SET user_id = ?, degree = ?, institution = ?, major = ?, start_date = ?, end_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user_id, degree, institution, major, start_date, end_date, id],
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

  static deleteEducation(id, callback) {
    db.run('DELETE FROM Education WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null);
      }
    });
  }
}

module.exports = Education;
