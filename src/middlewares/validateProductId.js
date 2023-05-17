const httpStatus = require('../utils/httpStatus');

const validateProductId = (req, res, next) => {
  const { productId } = req.body;

  if (productId === undefined) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: '"productId" is required' });
  }
  next();
};

module.exports = { validateProductId };
