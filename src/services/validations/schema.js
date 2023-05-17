const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const newProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).required();

const newSaleSchema = Joi.array().items(
  Joi.object({
    productId: idSchema,
    quantity: idSchema,
  }),
);

module.exports = {
  idSchema,
  newProductSchema,
  newSaleSchema,
};
