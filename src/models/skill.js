const db = require("../config/database");

class Skill {
  static getAllSkills(callback) {
    db.all("SELECT * FROM Skill", (err, rows) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static getSkillById(id, callback) {
    db.get("SELECT * FROM Skill WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  static createSkill(skill, callback) {
    const { user_id, name, experience_level } = skill;
    db.run(
      "INSERT INTO Skill (user_id, name, experience_level) VALUES (?, ?, ?)",
      [user_id, name, experience_level],
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

  static updateSkill(id, skill, callback) {
    const { user_id, name, experience_level } = skill;
    db.run(
      "UPDATE Skill SET user_id = ?, name = ?, experience_level = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [user_id, name, experience_level, id],
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

  static deleteSkill(id, callback) {
    db.run("DELETE FROM Skill WHERE id = ?", [id], (err) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null);
      }
    });
  }
}

module.exports = Skill;
