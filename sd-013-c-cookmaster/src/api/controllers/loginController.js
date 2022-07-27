const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secretKey = 'seusecretdetoken';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await loginService.loginUserService(email, password);
        const config = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
        const { password: _password, ...a } = user;
        const token = jwt.sign({ data: a }, secretKey, config);

        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUserController,
};