const express = require('express');
const router = express.Router();

// const AuthController = require('./controllers/AuthController')
// const ContactController = require('./controllers/ContactController')

router.get('/hello', (req, res) => {
  res.send("Hello World");
})

router.get('/readme', (req, res) => {
  res.send("Readmed");
})

// router.post('/login', AuthController.login);
// router.post('/registro', AuthController.signup);

// router.post('/email/new-contact', ContactController.newContact)

module.exports = router;