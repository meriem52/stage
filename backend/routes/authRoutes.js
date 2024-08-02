const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');


router.post('/register', registerController.register);
router.post('/login', loginController.login);

router.post('/logout', logoutController.logout);

router.get('/check-auth', authController.checkAuth);

router.get('/home', authenticateJWT, (req, res) => {
    res.send('Welcome to the home page!');
});



module.exports = router;
