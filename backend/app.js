const express = require('express');
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

