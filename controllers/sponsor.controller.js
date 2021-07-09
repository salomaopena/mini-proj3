const Sponsor = require('../models/sponsor.model')
const {
    validationResult
} = require('express-validator');
const SponsorMessages = require("../messages/sponsor.messages")

exports.get = (req, res) => {

    Sponsor.find(req.query, (error, sponsor) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        let message = SponsorMessages.success.s2;

        if (sponsor.length < 0)
            message = SponsorMessages.success.s5;

        message.body = sponsor;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Sponsor({
        name: req.body.name,
        type: req.body.type,
        birth_date: req.body.birth_date,
        description: req.body.description,
        location: {
            city: req.body.location.city,
            district: req.body.location.district,
            country: req.body.location.country,
        },
        active: req.body.active
    }).save((error, sponsor) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        const message = SponsorMessages.success.s0
        message.body = sponsor;
        return res.header("location", "/sponsor/" + sponsor._id).status(message.http).send(message);
    });

}

exports.update = (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, sponsor) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (!sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

        let message = SponsorMessages.success.s1;
        message.body = sponsor;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (result.deletedCount <= 0) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
    });

    return res.status(SponsorMessages.success.s3);
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOne({
        _id: req.params.id
    }, (error, sponsor) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)
        if (!sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
        let message = SponsorMessages.success.s2;
        message.body = sponsor;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)

        if (result.n <= 0) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
        return res.status(SponsorMessages.success.s6.http).send(SponsorMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) console.log('Ops! Ocorreu um erro' + error)

        if (result.n <= 0) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
        return res.status(SponsorMessages.success.s4.http).send(SponsorMessages.success.s4);

    });
}