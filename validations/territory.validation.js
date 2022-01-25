const Joi = require('joi');

const id = {
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};

const update = {
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
    body: Joi.object().keys({
        name:Joi.string().required(),
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
