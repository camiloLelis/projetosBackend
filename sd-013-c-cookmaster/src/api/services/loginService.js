const Joi = require('joi');
const UserModels = require('../models/UserModels');
const errr = require('../utils/objerr');

const loginValidate = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const loginUserService = async (email, password) => {
    const { error } = loginValidate.validate({ email, password });
    if (error) throw errr(401, 'All fields must be filled');
    const user = await UserModels.findUserOne(email);
    if (!user || user.password !== password) throw errr(401, 'Incorrect username or password');
    return user;
};

module.exports = {
    loginUserService,
};