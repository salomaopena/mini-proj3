const User = require('../models/user.model');
const {
    validationResult
} = require('express-validator');
const AuthMessages = require("../messages/auth.messages");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.getInfo = (req, res) => {
    var message = AuthMessages.success.s1;
    message.body = req.user;
    return res.status(message.http).send(message)
}

exports.login = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)

    let username = req.body.username
    let password = escape(req.body.password)

    User.findOne({
        "auth.username": username
    }, (error, user) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)

        if (!user || !bcrypt.compareSync(password, user.auth.password))
            return res.header("Authorization", null).status(AuthMessages.error.e0.http).send(AuthMessages.error.e0);
        var payload = {
            pk: user.auth.public_key
        }

        var options = {
            expiresIn: config.auth.expiration_time,
            issuer: config.auth.issuer
        };

        var token = jwt.sign(payload, user.auth.private_key, options)

        var message = AuthMessages.success.s0
        message.body = user
        return res.header("Authorization", token).status(message.http).send(message);

    });

}


exports.checkAuth = (req, res, callback) => {

    var token = req.headers.authorization

    if (!token) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

    var payload = jwt.decode(token);

    User.findOne({
        "auth.public_key": payload.pk
    }, (error, user) => {

        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (!user) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

        jwt.verify(token, user.auth.private_key, (error) => {
            if (error) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

            req.user = user
            return callback();
        });

    });

};