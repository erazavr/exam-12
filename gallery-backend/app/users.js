const path = require('path');

const express = require('express');
const bcrypt = require("bcrypt");
const multer = require('multer');
const axios = require('axios');

const config = require('../config');
const User = require('../models /User');
const nanoid = require("nanoid");

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user)
});

router.post ('/', async (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    try {
        user.generateToken();
        await user.save();
        return res.send(user)
    } catch (error) {
        return res.status(400).send(error)
    }
});
router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username or password not correct'})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct'});
    }
    user.generateToken();
    await user.save();
    res.send(user)
});

router.delete('/sessions', async (req, res) => {
    const success = {message: "Success"};
    try {
        const token = req.get('Authorization').split(' ')[1];
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);

        user.generateToken();
        await user.save();
        res.send(success);
    } catch (error) {
        return res.send(success)
    }

});

router.post('/facebook', async (req, res) => {

    try {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(url);


        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'})
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'User ID incorrect'})
        }

        let user = await User.findOne({facebookId: req.body.id});
        if (!user) {
            const [firstName, lastName] = req.body.name.split(' ');
            user = new User({
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                firstName,
                lastName,

            })
        }
        user.generateToken();
        await user.save();

        return res.send(user)
    } catch (e) {
        return res.sendStatus(401)
    }



});

module.exports = router;