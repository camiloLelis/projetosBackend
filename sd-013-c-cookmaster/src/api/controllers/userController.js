const UserService = require('../services/UserService');

const createUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
    /*   const role = req.body.role === undefined ? 'user' : req.body.role; */
        const role = 'user';
        const returnService = await UserService.createUserService(name, email, password, role);
        return res.status(201).json(returnService);
    } catch (error) {
        // console.log(error.message, '<-----');
        next(error);
    } 
};

module.exports = {
    createUserController,
};