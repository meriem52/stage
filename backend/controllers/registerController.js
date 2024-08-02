const Logger = require('../utils/logger');
const logger = new Logger('auth-controller');
const registerService = require('../services/registerService');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
// Register a new user
const register = (req, res) => {
    const { username, password } = req.body;

    logger.info(`Received registration request for username: ${username}`);

    registerService.register(username, password)
        .then(() => {
            logger.info(`User ${username} registered successfully`);
            res.status(201).send({ message: 'User registered successfully' });
        })
        .catch(error => {
            logger.error(`Error during registration: ${error.message}`);
            res.status(400).send({ error: error.message });
        });
};
module.exports = { register};
