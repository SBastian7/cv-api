const app = require('./app');
const db = require('./config/database');
const port = process.env.PORT || 3000;

// Start the server
db.run('PRAGMA foreign_keys = ON', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
