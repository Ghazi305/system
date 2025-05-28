// const { Op } = require('sequelize');
// const { Account, Transaction } = require('../database/models'); 
// const { v4: uuidv4 } = require('uuid'); 
// const Nodemailer = require("nodemailer");
// const { MailtrapTransport } = require("mailtrap"); 
// const cron = require('node-cron');

// class Helpers {
//   static async sendOTP(recipientEmail, message) {
//     const TOKEN = "de24737571720df82a58c5e589a5fb96";
    
//     const transport = Nodemailer.createTransport(
//       MailtrapTransport({
//       token: TOKEN,
//     })
//   );

//     const sender = {
//        address: "hello@demomailtrap.com",
//        name: "E-bank",
//     }; 
//     const recipients = [ recipientEmail ];
    
//    transport
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "Electronic Bank",
//     text: message,
//     category: "إرسال رمز التحقق",
//   })
//     .then(console.log, console.error);
//   }
// } 
// module.exports =  { Helpers }; 