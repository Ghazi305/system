const express = require('express');
const router = express.Router(); 
const dashboradController = require('../app/controller/DashboradController');

router.get('/dashborad', dashboradController.getDataDashborad);


module.exports = router; 