const Joi = require('joi');

const id = {
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};
const userid = {
    body: Joi.object().keys({
        user_id:Joi.string().required(),
    }),
};

const update = {
    body: Joi.object().keys({
        product_id:Joi.string().allow(null),
        currency_id:Joi.string().allow(null),
        price:Joi.number().allow(null),
        description:Joi.string().allow(null),
        territory:Joi.string().allow(null),
        language_id:Joi.string().allow(null),
        paypal:Joi.bool().allow(null),
        ideal:Joi.bool().allow(null),
        google_pay:Joi.bool().allow(null),
        apple_pay:Joi.bool().allow(null),
        credit_card:Joi.bool().allow(null),
        free_shipping:Joi.bool().allow(null),
    }),
    params: Joi.object().keys({
        id:Joi.string().required(),
    }),
};

const add = {
    body: Joi.object().keys({
        user_id:Joi.string().required(),
        product_id:Joi.string().required(),
        currency_id:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required(),
        status:Joi.string().required().valid('active','pause'),
        territory_id:Joi.string().required(),
        language_id:Joi.string().required(),
        paypal:Joi.bool().required(),
        ideal:Joi.bool().required(),
        google_pay:Joi.bool().required(),
        apple_pay:Joi.bool().required(),
        credit_card:Joi.bool().required(),
        free_shipping:Joi.bool().required(),
        free_terms:Joi.string().allow(""),
        thankyou:Joi.string().allow(""),
        privacy_link:Joi.string().allow(""),
    }),
};


module.exports = {
    id,
    update,
    add,
    userid
};
