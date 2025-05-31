const express = require('express');
const router = express.Router(); 
const dashboradController = require('../app/controller/DashboradController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/dashborad', authMiddleware, dashboradController.getDataDashborad);


module.exports = router; 