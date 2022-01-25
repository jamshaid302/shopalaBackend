const Joi = require('joi');

const register = {
    body: Joi.object().keys({
        first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        role: Joi.string().required().valid('vendor','admin'),
    }),
};

const id = {
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};

const email = {
    params: Joi.object().keys({
        id:Joi.string().email().required(),
    }),
};

const update = {
    params: Joi.object().keys({
        id:Joi.string().required(),

    }),
    body: Joi.object().keys({
        first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        avatar:Joi.string().allow(""),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login,
    id,
    update,
    email
};
