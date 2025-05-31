const express = require('express');
const router = express.Router(); 
const authController = require('../app/controller/AuthController');
const OTPController = require('../app/controller/OTPController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('logout', authController.logout);

router.put('/rest-pass/:id', authController.resetPass);

router.put('/update/:id', authMiddleware, authController.updateUser);

router.get('/user/:id', authMiddleware, authController.getProfile);

router.put('/chenge-pass/:id', authMiddleware, authController.changePass);

router.post('/send-otp', OTPController.sendOTP);

router.post('/verify-otp', OTPController.verifyOTP);


module.exports = router; 