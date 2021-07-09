const User = require('../models/user.model');
const {
    validationResult
} = require('express-validator');
const UserMessages = require("../messages/user.messages");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Animal = require("../models/animal.model");

exports.get = (req, res) => {

    User.find(req.query, (error, users) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)

        var message = UserMessages.success.s2

        if (users.length < 0)
            message = UserMessages.success.s5

        message.body = users;
        return res.status(message.http).send(message)
    });

}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        _id: req.params.id
    }, (error, user) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (!user) return res.status(UserMessages.error.e1.http).send(UserMessages.error.e1);
        let message = UserMessages.success.s2;
        message.body = user;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        "auth.username": req.body.auth.username
    }, (error, user) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (user) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0)

        new User({
            name: req.body.name,
            type: req.body.type,
            birth_date: req.body.birth_date,
            description: req.body.description,
            location: {
                city: req.body.location.city,
                district: req.body.location.district,
                country: req.body.location.country
            },
            auth: {
                username: req.body.auth.username,
                password: req.body.auth.password
            }
        }).save((error, user) => {
            if (error) console.log('Ops! Ocorreu um erro' + error)

            const payload = {
                pk: user.auth.public_key
            }

            const options = {
                expiresIn: config.auth.expiration_time,
                issuer: config.auth.issuer
            };

            const token = jwt.sign(payload, user.auth.private_key, options);


            const message = UserMessages.success.s0;
            message.body = user;
            return res.header("location", "/users/" + user._id).header("Authorization", token).status(message.http).send(message);
        })
    });

}

exports.update = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, user) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (!user) return res.status(UserMessages.error.e1.http).send(UserMessages.error.e1);

        const message = UserMessages.success.s1;
        message.body = user;
        return res.status(message.http).send(message);

    });

}

exports.delete = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (result.deletedCount <= 0) return res.status(UserMessages.error.e1.http).send(UserMessages.error.e1);

        Animal.updateMany({}, {
            $pull: {
                comments: {
                    user: req.params.id
                }
            }
        }, (error) => {
            if (error) console.log('Ops! Ocorreu um erro' + error)
            return res.status(UserMessages.success.s3.http).send(UserMessages.success.s3);
        });
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)

        if (result.n <= 0) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0);
        return res.status(UserMessages.success.s6.http).send(UserMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)

        if (result.n <= 0) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0);
        return res.status(UserMessages.success.s4.http).send(UserMessages.success.s4);

    });
}