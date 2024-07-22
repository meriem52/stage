const Logger = require('../utils/logger');
const logger = new Logger('auth-controller');
const AuthService = require('../services/authService');

const register = (req, res) => {
    const { username, password } = req.body;


    logger.info(`Received registration request for username: ${username}`);


    AuthService.register(username, password)
        .then(() => {

            logger.info(`User ${username} registered successfully`);
            res.status(201).send({ message: 'User registered successfully' });
        })
        .catch(error => {

            logger.error(`Error during registration: ${error.message}`);
            res.status(400).send({ error: error.message });
        });
};

const login = (req, res) => {
    const { username, password } = req.body;


    logger.info(`User ${username} attempting to log in`);


    AuthService.login(username, password)
        .then(token => {
            if (token) {

                logger.info(`User ${username} logged in successfully`);
                res.send({ token });
            } else {

                logger.warn(`Invalid login attempt for username: ${username}`);
                res.status(401).send({ error: 'Invalid username or password' });
            }
        })
        .catch(error => {

            logger.error(`Error during login: ${error.message}`);
            res.status(500).send({ error: error.message });
        });
};

module.exports = { register, login };


module.exports = { register, login };
