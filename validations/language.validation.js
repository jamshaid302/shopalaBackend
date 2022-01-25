const Joi = require('joi');

const id = {
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};

const update = {
    body: Joi.object().keys({
        name:Joi.string().required(),
    }),
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};

const add = {
    body: Joi.object().keys({
        name:Joi.string().required(),
    }),
};


module.exports = {
    id,
    update,
    add
};
