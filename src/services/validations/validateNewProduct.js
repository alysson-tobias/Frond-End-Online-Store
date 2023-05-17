const { newProductSchema } = require('./schema');

const validatedNewProduct = (newProduct) => {
 const { error } = newProductSchema.validate(newProduct);
  const hasName = newProduct.name !== undefined;
  if (error) {
    return {
      type: hasName ? 'INVALID_VALUE' : 'VALUE_REQUIRED',
      message: error.message,
    };
  }
};

module.exports = { validatedNewProduct };
