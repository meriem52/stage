const Logger = require('../utils/logger');
const logger = new Logger('auth-controller');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');

const checkAuth = (req, res) => {
    logger.info('Received check-auth request');
    const token = req.cookies.authToken;

    if (!token) {
        logger.error('No token provided in check-auth request');
        return res.status(401).send({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        logger.info(`Token verified successfully, user ID: ${decoded.id}`);
        return res.send({ message: 'Authenticated', user: decoded });
    } catch (err) {
        logger.error(`Error verifying token during check-auth: ${err.message}`);
        return res.status(401).send({ message: 'Not authenticated' });
    }
};

module.exports = {  checkAuth };
