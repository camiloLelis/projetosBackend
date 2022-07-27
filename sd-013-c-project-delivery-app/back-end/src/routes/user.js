const router = require('express').Router();
const controler = require('../controllers/user.controller'); 
const validateJWT = require('../middlewares/validateJWT');

router.get('/', validateJWT, controler.getAll);
router.post('/', controler.createUser);
router.delete('/:id', validateJWT, controler.deleteUser);

module.exports = router;
