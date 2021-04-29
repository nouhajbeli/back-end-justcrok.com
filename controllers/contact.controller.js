const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: process.env.host,
    port: 465, 
    secure: true,
    auth: {
    user: process.env.justcrokmail,
    pass: process.env.pass
    }
  })
exports.sendEmail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { nom, email, message} = req.body;
 
    transporter
    .sendMail({
      to: process.env.justcrokmail ,
      from: email,
      subject: " new email",
      html: `<p>${message}</p>`,
    })
    .then(console.log("Success!"))
    .catch((err) => console.log(err));
    res.status(201).json({ msg: 'mail sent' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};