const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

module.exports = { registerUser, loginUser, logoutUser };
