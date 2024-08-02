const express = require('express');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/protected', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});

router.get('/', (req, res) => {
    res.send('Hello, world!');
});

module.exports = router;