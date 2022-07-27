const router = require('express').Router();
const controler = require('../controllers/user.controller'); 

router.post('/', controler.loginUser);

module.exports = router;