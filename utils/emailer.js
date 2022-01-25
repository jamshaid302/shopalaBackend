const nodemailer = require('nodemailer');
const config = require('../config.json');

const registrationEmail = function (user) {
    const subject = "Your Account Created Successfully"
    const body = `<h1>Congratulation! ${user.first_name}. Your account has been created successfully</h1>`

    const transporter = nodemailer.createTransport({
        service: config.ADMIN_EMAIL_SERVICE,
        auth: {
            user: config.ADMIN_EMAIL_ID,
            pass: config.ADMIN_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: config.ADMIN_EMAIL_ID,
        to: user.email,
        subject: subject,
        html: body,
        cc: config.ADMIN_EMAIL_ID
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const campaignEmail = function (user) {
    const subject = "Your Campaign Created Successfully"
    const body = `<h1>Congratulation! ${user.first_name}. Your campaign has been created successfully</h1>`

    const transporter = nodemailer.createTransport({
        service: config.ADMIN_EMAIL_SERVICE,
        auth: {
            user: config.ADMIN_EMAIL_ID,
            pass: config.ADMIN_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: config.ADMIN_EMAIL_ID,
        to: user.email,
        subject: subject,
        html: body,
        cc: config.ADMIN_EMAIL_ID
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    registrationEmail,
    campaignEmail
};

