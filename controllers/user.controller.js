const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

module.exports.register = async (req, res) => {
    try {
        const { login, password } = req.body;

        if(!login) {
            return res.status(400).json({ error: 'Login is required' });
        }

        if(!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ login, password: encryptedPassword });

        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
    }   
}

module.exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if(!login) {
            return res.status(400).json({ error: 'Login is required' });
        }

        if(!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const user = await User.findOne({ login });

        if(user && (await bcrypt.compare(password, user.password))) {
            const Token = jwt.sign(
                { user_id: user._id, login },
                config.TOKEN_KEY,
                { expiresIn: "1h" }
            );

            user.token = Token;
            req.user = user;

            return res.status(200).json({ "token": user.token })
        }

        return res.status(400).send("Invalid Credentials");

    } catch (err) {
        console.log(err);
    }
}


module.exports.me = (req, res) => {
    return res.status(201).json({ "token": req.user });
}