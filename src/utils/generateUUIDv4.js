const { v4: uuidv4 } = require('uuid');

const generateUUIDv4 = () => {
  return uuidv4();
};

module.exports = generateUUIDv4;
