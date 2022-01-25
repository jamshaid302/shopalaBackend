import Joi from "joi"
export const cardPayment = {
  body: Joi.object().keys({
    campaign_id: Joi.string().max(100).required(),
    payment_id: Joi.string().max(100).required(),
    customer_email: Joi.string().max(300).email().required(),
    customer_name: Joi.string().max(100).required(),
  }),
}
