const router = require('express').Router();
const controler = require('../controllers/product.controller'); 
const validateJWT = require('../middlewares/validateJWT');

router.get('/', validateJWT, controler.getAll);

module.exports = router;
