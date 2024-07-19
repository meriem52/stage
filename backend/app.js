const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
//const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middleware CORS
app.use(cors()); // Ajouter cette ligne pour activer CORS





// Middleware pour parser le JSON
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Middleware pour la gestion des erreurs
//app.use(errorMiddleware);

module.exports = app;

