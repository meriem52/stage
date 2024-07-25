const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');

const authenticateJWT = (req, res, next) => {
    try {
        const token = req.cookies.authToken; // Get token from cookie

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
