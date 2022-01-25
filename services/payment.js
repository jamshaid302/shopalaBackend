import CampaignService from "./campaign.js";
import Stripe from "stripe";
import { paymentEmail } from "../utils/emailer.js";
import config from "../config/index.js";
import axios from "axios";

const stripe = Stripe(config.env.payments.STRIPE_SECRET_KEY);
const paypalAPI = config.env.payments.PAYPAL_API;
const paypalToken = config.env.payments.PAYPAL_TOKEN;

export default {
  stripeCardPayment: async ({ paymentId, campaignId }) => {
    const campaignData = await CampaignService.getById({ id: campaignId });

    if (campaignData.message === "error" || !campaignData?.data) {
      return campaignData;
    }

    let campaign = campaignData.data[0];

    const params = {
      amount: campaign.price * 100,
      currency: campaign.currency.name,
      description: campaign.user.first_name,
      payment_method: paymentId,
      confirm: true,
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create(params);

      paymentEmail(campaign.user, {
        ...campaign.product,
        price: campaign.price,
      });

      return {
        message: "success",
        data: [],
      };
    } catch (e) {
      return {
        message: "error",
        data: { message: e.message },
      };
    }
  },

  stripeIdealPayment: async ({ paymentId, campaignId }) => {
    const campaignData = await CampaignService.getById({ id: campaignId });

    if (campaignData.message === "error" || !campaignData?.data) {
      return campaignData;
    }

    let campaign = campaignData.data[0];

    const params = {
      amount: campaign.price * 100,
      // currency: campaign.currency.name,
      currency: "eur",
      description: campaign.user.first_name,
      payment_method_types: [paymentId],
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create(params);

      paymentEmail(campaign.user, {
        ...campaign.product,
        price: campaign.price,
      });

      return {
        message: "success",
        data: [{ clientSecret: paymentIntent.client_secret }],
      };
    } catch (e) {
      return {
        message: "error",
        data: { message: e.message },
      };
    }
  },

  paypalCreatePayment: async ({ campaignId }) => {
    const campaignData = await CampaignService.getById({ id: campaignId });
    if (campaignData.message === "error" || !campaignData?.data) {
      return campaignData;
    }
    let campaign = campaignData.data[0];

    const config = {
      url: paypalAPI + "/v1/payments/payment",
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${paypalToken}`,
      },
      data: {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        transactions: [
          {
            amount: {
              total: campaign.price,
              currency: campaign.currency.name,
            },
          },
        ],
        redirect_urls: {
          return_url: "https://example.com",
          cancel_url: "https://example.com",
        },
      },
    };

    try {
      const res = await axios(config);

      let token = "";

      let links = res.data.links;
      for (const i of links) {
        if (i.rel == "approval_url") {
          token = i.href.split("EC-")[1];
        }
      }
      return {
        message: "success",
        data: [{ token: token }],
      };
    } catch (e) {
      return {
        message: "error",
        data: { message: e.message },
      };
    }
  },

  paypalExecutePayment: async ({ campaignId, paymentId, payerId }) => {
    const campaignData = await CampaignService.getById({ id: campaignId });
    if (campaignData.message === "error" || !campaignData?.data) {
      return campaignData;
    }
    let campaign = campaignData.data[0];
    const config = {
      url: paypalAPI + "/v1/payments/payment/" + paymentId + "/execute",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${paypalToken}`,
      },
      data: {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              total: campaign.price,
              currency: campaign.currency.name,
            },
          },
        ],
      },
    };
    try {
      const response = await axios(config);

      paymentEmail(campaign.user, {
        ...campaign.product,
        price: campaign.price,
      });

      return {
        message: "success",
        data: [{ response: response.data }],
      };
    } catch (e) {
      return {
        message: "error",
        data: { message: e.message },
      };
    }
  },
};
