const router = require('express').Router();
const contact = require('../controllers/contact.controller');
const { body } = require('express-validator');
const jwtHelper = require('../config/jwtHelper');

//  send mail revendiquer mosque
router.post(
  '/sendEmail',
  contact.sendEmail
);
module.exports = router;