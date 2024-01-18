const Joi = require('joi');
const { validateSchema } = require('./validateBodySchema');

exports.validateSignin = (req, res, next) => {
    const dataSchema = Joi.object()
      .keys({
        username: Joi.string().required().messages({
          'any.required': 'username is required',
          'string.empty': 'username is not allowed to be empty',
        }),
        deviceId: Joi.string().required().messages({
          'any.required': 'deviceId is required',
          'string.empty': 'deviceId is not allowed to be empty',
        }),
        password: Joi.string().required().regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).messages({
          'any.required': 'password is a required field',
          'string.pattern.base': 'password must be at least 8 characters long with a number, Upper and lower cases, and a special character',
        }),
      })
      .options({ abortEarly: false });

    return validateSchema(dataSchema, req.body, res, next);
  };