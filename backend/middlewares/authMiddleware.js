/*const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Logger = require('../utils/logger');
const logger = new Logger('auth-middleware');

const authenticateJWT = (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            logger.warn('Access denied. No token provided.');
            return res.status(401).send({ error: 'Access denied. No token provided.' });
        }

        req.user = jwt.verify(token, JWT_SECRET);
        logger.info(`User ${req.user.id} authenticated successfully`);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            logger.warn('Invalid token. Please authenticate properly.');
            return res.status(401).send({ error: 'Invalid token. Please authenticate properly.' });
        }
        logger.error(`Server error. Unable to authenticate: ${error.message}`);
        res.status(500).send({ error: 'Server error. Unable to authenticate.' });
    }
};

module.exports = authenticateJWT;
*/
/*

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Logger = require('../utils/logger');
const logger = new Logger('auth-middleware');

const authenticateJWT = (req, res, next) => {
    try {
        // Log cookies for debugging
        logger.info(`Cookies received: ${JSON.stringify(req.cookies)}`);

        const token = req.cookies.authToken;

        if (!token) {
            logger.warn('Access denied. No token provided.');
            return res.status(401).send({ error: 'Access denied. No token provided.' });
        }

        // Log token for debugging (only for development, remove in production)
        logger.info(`Token received: ${token}`);

        // Verify and decode the JWT
        req.user = jwt.verify(token, JWT_SECRET);
        logger.info(`User ${req.user.id} authenticated successfully`);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            logger.warn('Invalid token. Please authenticate properly.');
            return res.status(401).send({ error: 'Invalid token. Please authenticate properly.' });
        }
        logger.error(`Server error. Unable to authenticate: ${error.message}`);
        res.status(500).send({ error: 'Server error. Unable to authenticate.' });
    }
};

module.exports = authenticateJWT;
*/
/*//e5er haja
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Logger = require('../utils/logger');
const logger = new Logger('auth-middleware');

const authenticateJWT = (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).send({ error: 'Access denied. No token provided.' });
        }

        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({ error: 'Invalid token. Please authenticate properly.' });
        }
        res.status(500).send({ error: 'Server error. Unable to authenticate.' });
    }
};

module.exports = authenticateJWT;
*/

/* e5er faza realy
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Logger = require('../utils/logger');
const logger = new Logger('auth-middleware');

const authenticateJWT = (req, res, next) => {
    try {
        // Log cookies for debugging
        logger.info(`Cookies received: ${JSON.stringify(req.cookies)}`);

        const token = req.cookies.authToken;

        if (!token) {
            logger.warn('Access denied. No token provided.');
            return res.status(401).send({ error: 'Access denied. No token provided.' });
        }

        // Log token for debugging (only for development, remove in production)
        logger.info(`Token received: ${token}`);

        // Verify and decode the JWT
        req.user = jwt.verify(token, JWT_SECRET);
        logger.info(`User ${req.user.id} authenticated successfully`);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            logger.warn('Invalid token. Please authenticate properly.');
            return res.status(401).send({ error: 'Invalid token. Please authenticate properly.' });
        }
        logger.error(`Server error. Unable to authenticate: ${error.message}`);
        res.status(500).send({ error: 'Server error. Unable to authenticate.' });
    }
};

module.exports = authenticateJWT;
*/


/*le 1er aout
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Logger = require('../utils/logger');
const logger = new Logger('auth-middleware');

const authenticateJWT = (req, res, next) => {
    try {
        logger.info(`Cookies received: ${JSON.stringify(req.cookies)}`);

        const token = req.cookies.authToken;

        if (!token) {
            logger.warn('Access denied. No token provided.');
            return res.status(401).send({ error: 'Access denied. No token provided.' });
        }

        logger.info(`Token received for verification: ${token}`); // Ajoutez ce log

        req.user = jwt.verify(token, JWT_SECRET);
        logger.info(`User ${req.user.id} authenticated successfully`);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            logger.warn('Invalid token. Please authenticate properly.');
            return res.status(401).send({ error: 'Invalid token. Please authenticate properly.' });
        }
        logger.error(`Server error. Unable to authenticate: ${error.message}`);
        res.status(500).send({ error: 'Server error. Unable to authenticate.' });
    }
};

module.exports = authenticateJWT;
*/
/* last versuin
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Logger = require('../utils/logger');
const logger = new Logger('auth-middleware');

const authenticateJWT = (req, res, next) => {
    try {
        logger.info(`Cookies received: ${JSON.stringify(req.cookies)}`);
        const token = req.cookies.authToken;
        if (!token) {
            logger.warn('Access denied. No token provided.');
            return res.status(401).send({ error: 'Access denied. No token provided.' });
        }

        console.log('Token received for verification:', token);
        req.user = jwt.verify(token, JWT_SECRET);
        logger.info(`User ${req.user.id} authenticated successfully`);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            logger.warn('Invalid token. Please authenticate properly.');
            return res.status(401).send({ error: 'Invalid token. Please authenticate properly.' });
        }
        logger.error(`Server error. Unable to authenticate: ${error.message}`);
        res.status(500).send({ error: 'Server error. Unable to authenticate.' });
    }
};

module.exports = authenticateJWT;
*/
// authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Blacklist = require('../models/blacklistModel');
const Logger = require('../utils/logger');
const logger = new Logger('auth-middleware');

const authenticateJWT = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            logger.warn('Access denied. No token provided.');
            return res.status(401).send({ error: 'Access denied. No token provided.' });
        }

        // Vérifier si le token est dans la blacklist
        const blacklistedToken = await Blacklist.findOne({ token });
        if (blacklistedToken) {
            logger.warn('Access denied. Token is blacklisted.');
            return res.status(401).send({ error: 'Access denied. Token is blacklisted.' });
        }

        req.user = jwt.verify(token, JWT_SECRET);
        logger.info(`User ${req.user.id} authenticated successfully`);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            logger.warn('Invalid token. Please authenticate properly.');
            return res.status(401).send({ error: 'Invalid token. Please authenticate properly.' });
        }
        logger.error(`Server error. Unable to authenticate: ${error.message}`);
        res.status(500).send({ error: 'Server error. Unable to authenticate.' });
    }
};

module.exports = authenticateJWT;
