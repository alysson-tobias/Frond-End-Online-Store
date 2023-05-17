const productService = require('../productService');

const validateProductList = async (productList) => {
  const doesProductExist = await Promise.all(productList.map(async ({ productId }) => (
    productService.findById(productId)
  ))).then((res) => !res.some(({ type }) => type === 'PRODUCT_NOT_FOUND'));

  if (!doesProductExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = { validateProductList };
