const express = require('express');
const router = express.Router();

const Authorization = require('./shared/Authorization')
const AuthController = require('./controllers/AuthController')
const ContactController = require('./controllers/ContactController')

router.get('/hello', (req, res) => {
  res.send("Hello World");
})

router.get('/authorization', Authorization, (req, res) => {
  res.send("Is authorization");
})

router.post('/login', AuthController.login);
router.post('/registro', AuthController.signup);

// router.post('/email/new-contact', ContactController.newContact)

module.exports = router;