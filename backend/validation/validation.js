const Joi = require('joi');

const createSchema = (fields) => Joi.object(fields);

const a=4;
const b=30;
const c=5;
const username = Joi.string().alphanum().min(a).max(b).required();
const password = Joi.string().min(c).required();

const registerSchema = () => createSchema({ username, password });
const loginSchema = () => createSchema({ username, password });


module.exports = { registerSchema, loginSchema };
