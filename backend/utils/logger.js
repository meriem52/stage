const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

class Logger {
    constructor(appLabel = 'my-app', logLevel = 'info') {
        // Format personnalisé pour les messages de log
        this.myFormat = printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        });

        // Créer le logger
        this.logger = createLogger({
            level: logLevel, // Niveau de log minimum (peut être modifié en fonction des besoins)
            format: combine(
                label({ label: appLabel }), // Étiquette personnalisée pour identifier l'application
                timestamp(), // Ajouter un timestamp à chaque log
                colorize(), // Colorier les logs (pour la console)
                this.myFormat // Utiliser le format personnalisé
            ),
            transports: [
                new transports.Console(), // Afficher les logs dans la console
                new transports.File({ filename: 'app.log' }) // Enregistrer les logs dans un fichier
            ]
        });
    }

    // Méthodes pour loguer les messages
    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }
}

module.exports = Logger;
