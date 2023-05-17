const { idSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"id" must be a number greater than 0',
    };
  }
};

module.exports = { validateId };
