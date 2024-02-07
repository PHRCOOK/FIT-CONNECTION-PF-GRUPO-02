require('dotenv').config();

const nodemailer = require('nodemailer');

const { MAIL_USERNAME, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    },
});

module.exports = { transporter };