const Joi = require('joi');

const loginSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().min(5).required()
}).unknown(false);

module.exports = { loginSchema };
