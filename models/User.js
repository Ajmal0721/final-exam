const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import Schema from mongoose
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
