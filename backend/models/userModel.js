const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: { type: String,  required: true, unique: true},

    password: {  type: String, required: true, unique: true}

});
userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };