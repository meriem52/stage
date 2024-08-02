const { UserModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const {  loginSchema } = require('../validation/loginvalidation');

async function login(username, password) {
    const { error } = loginSchema().validate({ username, password });
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
        throw new Error('Invalid username');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    token=jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '78h' });
    console.log('Generated token:', token);
    return token;
}





module.exports = {  login };
