const Joi = require('joi');

const numberSchema = Joi.number().min(1).required();

const productSchema = Joi.object({
  productId: numberSchema,
  quantity: numberSchema,
});

const saleSchema = Joi.array().items(productSchema);

module.exports = (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  const { productId, quantity } = req.body[0];
  
  const hasProductId = productId !== undefined;
  const hasQuantity = quantity !== undefined;

  const status = (!hasProductId || !hasQuantity ? 400 : 422);

  if (error) {
    const message = error.message.split('[0].').join('');
    return res.status(status).json({ message });
  }

  next();
};