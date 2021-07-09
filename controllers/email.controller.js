const fs = require("fs");
const Handlebars = require("handlebars");
const Nodemailer = require("nodemailer");
const config = require("../config/config");
const EmailMessages = require("../messages/email.messages");

exports.send = (req, res) => {

    let email = fs.readFileSync(__dirname + "/../views/email.handlebars", "utf8");

    let compiled_email = Handlebars.compile(email)({
        name: req.body.name,
        subject: req.body.subject,
        message: req.body.message
    });

    let transporter = Nodemailer.createTransport(config.email);

    let mail_options = {
        from: config.email.auth.user,
        to: req.body.email,
        subject: req.body.subject,
        html: compiled_email,
        bcc: config.email.auth.user
    }

    transporter.sendMail(mail_options, (error) => {
        if (error) {
            console.log(error);
            return res.status(EmailMessages.error.e0.http).send(EmailMessages.error.e0);
        }
        return res.status(EmailMessages.success.s0.http).send(EmailMessages.success.s0);
    });

}