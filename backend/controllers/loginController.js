const loginService = require("../services/loginService");
const Logger = require('../utils/logger');
const logger = new Logger('auth-controller');
const { loginSchema } = require('../validation/loginValidation');

const login = (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        const errorMessage = `Validation error: ${error.details.map(detail => detail.message).join(', ')}`;
        logger.error(errorMessage);
        return res.status(400).send({ error: errorMessage });
    }

    const { username, password } = value;

    logger.info(`Received login request for username: ${username}`);

    loginService.login(username, password)
        .then(token => {
            if (token) {
                logger.info(`Generated token for user: ${username}`);

                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'None',
                });

                res.send({ message: 'Login successful' });
            } else {
                logger.warn('Invalid login attempt');
                res.status(401).send({ error: 'Invalid username or password' });
            }
        })
        .catch(error => {
            logger.error(`Login error: ${error.message}`);
            res.status(503).send({ error: 'Service unavailable' });
        });
};

module.exports = { login };
