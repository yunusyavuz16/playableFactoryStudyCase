const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

const router = express.Router();

const checkJwt = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
};

router.post('/profile', checkJwt, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;
