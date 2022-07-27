const router = require('express').Router();
const controler = require('../controllers/sale.controller'); 
const validateJWT = require('../middlewares/validateJWT');

router.get('/:id', validateJWT, controler.getById);
router.get('/user/:id', validateJWT, controler.getAll);
router.put('/:id', validateJWT, controler.editStatusById);
router.post('/', validateJWT, controler.create);

module.exports = router;
