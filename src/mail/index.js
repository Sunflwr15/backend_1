const nodemailer = require("nodemailer");
require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const sendEmail = async (email, subject, template, context) => {
  try {
    const handlebarsOption = {
      viewEngine: {
        partialsDir: path.resolve("./src/mail/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/mail/"),
    };
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });
    transporter.use("compile", hbs(handlebarsOption));
    transporter.verify(function (err, success) {
      if (err) {
        console.log("BRUH", err);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    try {
      await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: subject,
        template: template,
        context: context,
      });
      return "Success";
    } catch (error) {
      return "Error";
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { sendEmail };
