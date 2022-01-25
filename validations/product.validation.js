const Joi = require('joi');

const id = {
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};

const userid = {
    params: Joi.object().keys({
        user_id:Joi.string().required(),
    }),
};

const update = {
    body: Joi.object().keys({
        name:Joi.string().required(),
        description:Joi.string().required(),
        quantity:Joi.number().required(),
        image:Joi.number().allow(""),
        brand_logo:Joi.allow(""),
    }),
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};

const add = {
    body: Joi.object().keys({
        user_id:Joi.string().required(),
        name:Joi.string().required(),
        description:Joi.string().required(),
        quantity:Joi.number().required(),
        image:Joi.number().allow(""),
        brand_logo:Joi.allow(""),
    }),
};


module.exports = {
    id,
    update,
    add,
    userid
};
