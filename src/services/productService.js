 const { productModel } = require('../models');
 const { validateId } = require('./validations/validateId');
 const { validatedNewProduct } = require('./validations/validateNewProduct');

const getAll = async () => {
const productList = await productModel.getAll();
return productList;
};

const findById = async (id) => {
  const error = validateId(id);
  if (error) return error;

  const product = await productModel.findById(id);

  if (!product.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product[0] };
};

const insert = async (newProduct) => {
  const error = validatedNewProduct(newProduct);
  if (error) return error;

  const insertedProductId = await productModel.insert(newProduct);
  const insertedProduct = await productModel.findById(insertedProductId);

  return { type: null, message: insertedProduct[0] };
};

const update = async (newProduct, id) => {
  const error = validatedNewProduct(newProduct);
  if (error) return error;
  
  await productModel.update(newProduct, id);
  const hasProduct = await productModel.findById(id);
  if (!hasProduct.length) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; // utilizar aqui o try&cath, depois!!!!
  }
  return { type: null, message: hasProduct[0] };
}; 

  const remove = async (id) => {
    const hasProduct = await productModel.findById(id);
    if (!hasProduct.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    
    await productModel.remove(id);
    return { type: null, message: '' };
  };

  const search = async (searchToy) => {
    const products = await productModel.search(searchToy);
    return products;
  };

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
  search,
};
