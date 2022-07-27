const router = require('express').Router();
const controler = require('../controllers/user.controller'); 
const validateJWT = require('../middlewares/validateJWT');

router.post('/user', validateJWT, controler.createByAdmin);
router.delete('/:id', validateJWT, controler.deleteUser);

module.exports = router;
