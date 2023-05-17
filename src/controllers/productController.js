const { productService } = require('../services');
const { errorTypes } = require('../utils/errorTypes');
const { OK, CREATED, NO_CONTENT, NOT_FOUND } = require('../utils/httpStatus');

const getAll = async (req, res) => {
  const productList = await productService.getAll();
  res.status(200).json(productList);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(OK).json(message);
};

const insert = async (req, res) => {
  const newProduct = req.body;
  const { type, message } = await productService.insert(newProduct);

   if (type) return res.status(errorTypes[type]).json({ message });
  res.status(CREATED).json(message);
};

const update = async (req, res) => {
  const newProduct = req.body;
  const { id } = req.params;
  const { type, message } = await productService.update(newProduct, id);

  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(OK).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.remove(id);
  if (type) return res.status(NOT_FOUND).json({ message });
  res.status(NO_CONTENT).send();
};

const search = async (req, res) => {
  const { q: searchToy } = req.query;
  const products = await productService.search(searchToy);
  res.status(OK).json(products);
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
  search,
};