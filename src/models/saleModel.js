const connection = require('../connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ()',
  );

  return insertId;
};

module.exports = { insert };
