const { saleModel } = require('../models');

const insert = async () => {
  const newSaleId = await saleModel.insert();
  return { type: null, message: newSaleId };
};

module.exports = { insert };