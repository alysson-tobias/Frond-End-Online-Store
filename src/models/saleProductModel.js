const camelize = require('camelize');
const saleModel = require('./saleModel');
const connection = require('../connection');
const {
  createColumnsAndPlaceholders,
} = require('../utils/createColumnsAndPlaceholders');

const findById = async (id) => {
  const query = `
  SELECT
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp
  ON s.id = sp.sale_id
  WHERE s.id = ?;
  `;

  const [sale] = await connection.execute(query, [id]);
  return camelize(sale);
}; 

const insert = async (productList) => {
  const newSaleId = await saleModel.insert();

  const { columns, placeholders } = createColumnsAndPlaceholders(
    productList[0],
  );

  const query = `INSERT INTO sales_products (sale_id, ${columns}) VALUES(?, ${placeholders})`;

  const promises = productList.map(async (product) => 
  connection.execute(query, [newSaleId, ...Object.values(product)]));

  await Promise.all(promises);

  return newSaleId;
};

const getAll = async () => {
  const query = `
  SELECT
  sp.sale_id,
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products AS sp
  INNER JOIN sales AS s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id, sp.product_id;
  `;

  const [saleList] = await connection.execute(query);
  return camelize(saleList);
};

const remove = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

const update = async (updateSale, saleId) => {
  const query = `
  UPDATE sales_products
  SET quantity = ?
  WHERE sale_id = ?
  AND product_id = ?
  `;

  const promises = updateSale
  .map(({ quantity, productId }) => connection.execute(query, [quantity, saleId, productId]));

  await Promise.all(promises);
};

module.exports = {
  insert,
  findById,
  getAll,
  remove,
  update,
};
