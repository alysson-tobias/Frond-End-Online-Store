const {
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  BAD_REQUEST,
} = require('./httpStatus');

const errorTypes = {
  INVALID_VALUE: UNPROCESSABLE_ENTITY,
  PRODUCT_NOT_FOUND: NOT_FOUND,
  VALUE_REQUIRED: BAD_REQUEST,
  SALE_NOT_FOUND: NOT_FOUND,
};

module.exports = { errorTypes };