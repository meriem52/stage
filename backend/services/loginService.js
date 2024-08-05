const { UserModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const { loginSchema } = require('../validation/loginValidation');
const Logger = require('../utils/logger');
const logger = new Logger('login-service');

async function login(username, password) {
    logger.info(`Received login request with username: '${username}' and password: '${password}'`);

    const { error, value } = loginSchema.validate({ username, password });
    if (error) {
        const errorMessage = `Validation error: ${error.details.map(detail => detail.message).join(', ')}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    logger.info(`Validated login request with username: '${value.username}' and password: '${value.password}'`);

    const user = await UserModel.findOne({ username });
    if (!user) {
        logger.warn('Invalid username');
        throw new Error('Invalid username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.warn('Invalid password');
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    logger.info('Generated token:', token);
    return token;
}

module.exports = { login };
