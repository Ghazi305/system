const express = require('express');
const router = express.Router(); 
const authController = require('../app/controller/AuthController');
const OTPController = require('../app/controller/OTPController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('logout', authController.logout);

router.put('/rest-pass/:id', authController.resetPass);

router.put('/update/:id', authController.updateUser);

router.put('/chenge-pass/:id', authController.changePass);

router.post('/send-otp', OTPController.sendOTP);

router.post('/verify-otp', OTPController.verifyOTP);


module.exports = router; 