/**
 * Handle Success.
 * @param {object} schema schema.
 * @param {object} body body request.
 * @param {object} res data response.
 * @param {object} next move body request.
 * @returns {object} response.
 */
exports.validateSchema = (schema, body, res, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const errors = error.details.map((err) => err.message);
    
    return res.status(400).json({
        status: 400,
        error: errors[0].replace(/"/g, '')
      });
  }

  return next();
};
