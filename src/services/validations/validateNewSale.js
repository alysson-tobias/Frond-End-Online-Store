const { newSaleSchema } = require('./schema');

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);
  
  if (error) {
    const type = error.details[0].type === 'any.required' ? 'VALUE_REQUIRED' : 'INVALID_VALUE';
    return {
      type,
      message: error.message.replace(/\[\d+\]\./, ''),
    };
  }
};

module.exports = { validateNewSale };

// fonte do regex: https://www.freecodecamp.org/news/javascript-string-replace-example-with-regex