const nodemailer = require("nodemailer");

exports.emailTransport = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: `${process.env.USER_EMAIL}`,
    pass: `${process.env.PASS_EMAIL}`,
  },
});
