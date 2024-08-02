const loginService = require("../services/loginService");
const Logger = require('../utils/logger');
const logger = new Logger('auth-controller');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');

const login = (req, res) => {
    const { username, password } = req.body;

    logger.info(`Received login request for username: ${username}`);

    loginService.login(username, password)
        .then(token => {
            if (token) {
                logger.info(`Generated token for user: ${username}`);

                res.cookie('authToken', token, {
                    httpOnly: true, // Ensures cookie is not accessible via JavaScript
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    sameSite: 'None', // Adjust according to your needs
                });

                res.send({ message: 'Login successful' });
            } else {
                logger.warn('Invalid login attempt');
                res.status(401).send({ error: 'Invalid username or password' });
            }
        })
        .catch(error => {
            logger.error(`Login error: ${error.message}`);
            res.status(500).send({ error: error.message });
        });
};
module.exports = {  login};
