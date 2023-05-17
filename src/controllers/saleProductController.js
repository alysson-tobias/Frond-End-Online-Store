const { saleProductService } = require('../services');
const { errorTypes } = require('../utils/errorTypes');
const httpStatus = require('../utils/httpStatus');

const insert = async (req, res) => {
  const { type, message } = await saleProductService.insert(req.body);
  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(httpStatus.CREATED).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await saleProductService.getAll();
  res.status(httpStatus.OK).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleProductService.findById(id);

  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(httpStatus.OK).json(message);
};

const remove = async (req, res) => {
   const { id } = req.params;

   const { type, message } = await saleProductService.remove(id);
  if (type) return res.status(errorTypes[type]).json({ message });
  
  return res.status(httpStatus.NO_CONTENT).end();
};

const update = async (req, res) => {
  const updateSale = req.body;
  const { id } = req.params;

  const { type, message } = await saleProductService.update(updateSale, id);
  if (type) return res.status(errorTypes[type]).json({ message });

  return res.status(httpStatus.OK).json(message);
};

module.exports = {
  insert,
  getAll,
  findById,
  remove,
  update,
};