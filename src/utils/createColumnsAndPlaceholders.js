const snakeize = require('snakeize');

const createColumnsAndPlaceholders = (obj) => {
  const columns = Object.keys(snakeize(obj)).join(', ');
  const placeholders = Object.keys(obj).map(() => '?').join(', ');
  return { columns, placeholders };
};

module.exports = { createColumnsAndPlaceholders };
