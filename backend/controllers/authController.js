const Logger = require('../utils/logger'); // Importer la classe Logger
const logger = new Logger('auth-controller'); // Créer une instance de Logger pour le contrôleur
const AuthService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Log pour enregistrer les données reçues
        logger.info(`Received registration request for username: ${username}`);

        // Appeler le service d'enregistrement
        await AuthService.register(username, password);

        // Log pour enregistrer le succès de l'enregistrement
        logger.info(`User ${username} registered successfully`);

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        // Log pour enregistrer les erreurs survenues
        logger.error(`Error during registration: ${error.message}`);

        res.status(400).send({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Log pour enregistrer la tentative de connexion
        logger.info(`User ${username} attempting to log in`);

        // Appeler le service de connexion
        const token = await AuthService.login(username, password);

        if (token) {
            // Log pour enregistrer la connexion réussie
            logger.info(`User ${username} logged in successfully`);

            res.send({ token });
        } else {
            // Log pour enregistrer l'échec de la connexion
            logger.warn(`Invalid login attempt for username: ${username}`);

            res.status(401).send({ error: 'Invalid username or password' });
        }
    } catch (error) {
        // Log pour enregistrer les erreurs survenues
        logger.error(`Error during login: ${error.message}`);

        res.status(500).send({ error: error.message });
    }
};

module.exports = { register, login };


/*

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
                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000
                });
                res.send({ message: 'Login successful' });
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
*/