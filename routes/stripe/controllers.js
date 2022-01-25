import Stripe from "stripe"
import responseSchema from "../../utils/responseSchema.js"
import { paymentEmail } from "../../utils/emailer.js"
import campaignDal from "../../services/campaign.js"
import config from "../../config/index.js"

const stripe = Stripe(config.env.payments.STRIPE_SECRET_KEY)

async function postStripePayment(req, res) {
  const {
    campaign_id: campaignId,
    payment_id: paymentId,
    customer_email: customerEmail,
    customer_name: customerName,
  } = req.body

  const campaignData = await campaignDal.getById({ id: campaignId })

  if (campaignData.message === "error" || !campaignData?.data) {
    return res.status(400).json(responseSchema.responseSchema(campaignData))
  }

  let campaign = campaignData.data[0]

  // stripe.customers
  //   .create({
  //     email: customerEmail,
  //     payment_method: paymentId,
  //     name: customerName,
  //   })
  //   .then(customer => {

  try {
    await stripe.paymentIntents.create({
      amount: campaign.price * 100,
      currency: campaign.currency.name,
      description: campaign.user.first_name,
      payment_method: paymentId,
      customer: customer.id,
      confirm: true,
    })

    paymentEmail(campaign.user, {
      ...campaign.product,
      price: campaign.price,
    })
    res.status(200).json(responseSchema.responseSchema({ message: "success" }))
  } catch {
    const response = responseSchema.responseSchema({
      message: "error",
      data: "Payment Failed",
    })
    res.status(400).json(response)
  }
}

async function createPaymentIntent (req, res)  {
  const {paymentMethodType, currency} = req.body;

  const params = {
    payment_method_types: [paymentMethodType],
    amount: 1999,
    currency: currency,
  }
  //
  // if(paymentMethodType === 'acss_debit') {
  //   params.payment_method_options = {
  //     acss_debit: {
  //       mandate_options: {
  //         payment_schedule: 'sporadic',
  //         transaction_type: 'personal',
  //       },
  //     },
  //   }
  // }

  // [0] https://stripe.com/docs/api/payment_intents/create
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
}

async function configure (req, res) {
  res.send({
    publishableKey: config.env.payments.STRIPE_PUBLISHABLE_KEY,
  });

}

export default {
  postStripePayment,
  createPaymentIntent,
  configure
}
