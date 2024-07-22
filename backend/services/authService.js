const { UserModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validation/validation');

async function register(username, password) {
    // Valider les données d'enregistrement
    const { error } = registerSchema().validate({ username, password });
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }

    try {
        // Hacher le mot de passe avant de sauvegarder
        const user = new UserModel({ username, password });
        await user.save();
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
}

async function login(username, password) {
    // Valider les données de connexion
    const { error } = loginSchema().validate({ username, password });
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
        throw new Error('Invalid username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // Utiliser process.env.JWT_SECRET pour signer le jeton JWT
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { register, login };