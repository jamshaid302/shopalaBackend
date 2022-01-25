import responseSchema from "../../utils/responseSchema.js";
import PaymentService from "../../services/payment.js";

async function postStripeCardPayment(req, res) {
  const { campaign_id, payment_id } = req.body;
  if (
    !campaign_id ||
    !payment_id ||
    !campaign_id.trim() ||
    !payment_id.trim()
  ) {
    return res
      .status(400)
      .json(responseSchema.responseSchema({ message: "error", data: [] }));
  }

  const paymentRes = await PaymentService.stripeCardPayment({
    paymentId: payment_id,
    campaignId: campaign_id,
  });

  const response = responseSchema.responseSchema(paymentRes);
  return response.status_code === 1
    ? res.status(200).json(response)
    : res.status(400).json(response);
}

async function postStripeIdealPayment(req, res) {
  const { campaign_id, payment_id } = req.body;
  if (
    !campaign_id ||
    !payment_id ||
    !campaign_id.trim() ||
    !payment_id.trim()
  ) {
    return res
      .status(400)
      .json(responseSchema.responseSchema({ message: "error", data: [] }));
  }

  const paymentRes = await PaymentService.stripeIdealPayment({
    paymentId: payment_id,
    campaignId: campaign_id,
  });

  const response = responseSchema.responseSchema(paymentRes);
  return response.status_code === 1
    ? res.status(200).json(response)
    : res.status(400).json(response);
}

async function postPaypalCreatePayment(req, res) {
  const { campaign_id } = req.body;
  if (!campaign_id || !campaign_id.trim()) {
    return res
      .status(400)
      .json(responseSchema.responseSchema({ message: "error", data: [] }));
  }

  const paymentRes = await PaymentService.paypalCreatePayment({
    campaignId: campaign_id,
  });

  const response = responseSchema.responseSchema(paymentRes);
  return response.status_code === 1
    ? res.status(200).json(response)
    : res.status(400).json(response);
}

async function postPaypalExecutePayment(req, res) {
  const { campaign_id, payment_id, payer_id } = req.body;
  if (
    !campaign_id ||
    !payment_id ||
    !payer_id ||
    !campaign_id.trim() ||
    !payment_id.trim() ||
    !payer_id.trim()
  ) {
    return res
      .status(400)
      .json(responseSchema.responseSchema({ message: "error", data: [] }));
  }

  const paymentRes = await PaymentService.paypalExecutePayment({
    campaignId: campaign_id,
    paymentId: payment_id,
    payerId: payer_id,
  });

  const response = responseSchema.responseSchema(paymentRes);
  return response.status_code === 1
    ? res.status(200).json(response)
    : res.status(400).json(response);
}

export default {
  postStripeCardPayment,
  postStripeIdealPayment,
  postPaypalCreatePayment,
  postPaypalExecutePayment,
};
