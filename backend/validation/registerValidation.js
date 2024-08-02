const Joi = require('joi');
const schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().min(5).required(),
}).unknown(false); // Disallow additional properties
const registerSchema = () => schema;
module.exports = { registerSchema };
