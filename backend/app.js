/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
//const errorMiddleware = require('./middlewares/errorMiddleware');
//const cookieParser = require('cookie-parser');

const app = express();


app.use(cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser le JSON
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

//app.use(errorMiddleware);

module.exports = app;

*/
/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie-parser middleware

app.use(express.json());




// Error handling middleware, if any
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Routes
app.use('/api/auth', authRoutes)

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// app.use(errorMiddleware);

module.exports = app;
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200', // L'origine de votre application Angular
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie-parser middleware

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

module.exports = app;
