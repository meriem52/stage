const Blacklist = require('../models/blacklistModel');
//node const logger = new Logger('auth-controller');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/appConfig');
const Logger = require("../utils/logger");

const logout = (req, res) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(400).send({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        Blacklist.create({ token, expiresAt: decoded.exp * 1000 })
            .then(() => {
                res.clearCookie('authToken');
                res.send({ message: 'Logged out successfully' });
            })
            .catch(error => res.status(500).send({ error: 'Internal server error' }));
    });
};
module.exports = {  logout};
