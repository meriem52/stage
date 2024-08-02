const { UserModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const { registerSchema} = require('../validation/registerValidation');

async function register(username, password) {
    const { error } = registerSchema().validate({ username, password });
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }
    try {
        const user = new UserModel({ username, password });
        await user.save();
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
}

module.exports = { register };
