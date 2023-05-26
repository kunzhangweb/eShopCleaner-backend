const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'msin636fall2019@gmail.com',
        pass: 'meanstack'
    }
});


router.post("", (req, res, next) => {

    if (req.body.sendtype == 'email') {
        var mailto = req.body.to;
        var mailfrom = req.body.from;
    } else {
        var mailto = req.body.tel + '@txt.att.net;' + req.body.tel + '@tmomail.net;' + req.body.tel + '@vtext.com;' + req.body.tel + '@messaging.sprintpcs.com;' + req.body.tel + '@mms.att.net;' + req.body.tel + '@vzwpix.com;' + req.body.tel + '@vzwpix.com;';

        console.log(mailto);

    }
    var mailOptions = {
        from: req.body.from,
        to: mailto,
        subject: req.body.subject,
        html: req.body.text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                "Email Send": info.response
            })
        }
    });

});

module.exports = router;
