const Joi = require('joi');
const UserModels = require('../models/UserModels');
const errr = require('../utils/objerr');

const userValidate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const createUserService = async (name, email, password, role) => {
    const { error } = userValidate.validate({ name, email, password });
    if (error) throw errr(400, 'Invalid entries. Try again.');
/*     const emailRegex = /\S+@\S+\.\S+/;
    const emailValidator = emailRegex.test(email);
    if (!emailValidator) throw util.objError(400, 'Invalid entries. Try again.'); */
    const emailExist = await UserModels.findUserOne(email);
    if (emailExist) throw errr(409, 'Email already registered');
    const returnInsertUser = await UserModels.insertUserOne(name, email, password, role);
    const user = { name, email, role, _id: returnInsertUser };
    return { user };
}; 

module.exports = {
    createUserService,
};