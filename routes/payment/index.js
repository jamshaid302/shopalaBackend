import express from "express";

import controllers from "./controllers.js";
import { createRoutesFromArray } from "../../utils/route.js";

export default createRoutesFromArray(express.Router(), [
  {
    method: "post",
    path: "/stripe",
    controller: controllers.postStripeCardPayment,
    middlewares: [],
  },
  {
    method: "post",
    path: "/stripe/ideal",
    controller: controllers.postStripeIdealPayment,
    middlewares: [],
  },

  {
    method: "post",
    path: "/paypal/create-payment",
    controller: controllers.postPaypalCreatePayment,
    middlewares: [],
  },
  {
    method: "post",
    path: "/paypal/execute-payment",
    controller: controllers.postPaypalExecutePayment,
    middlewares: [],
  },
]);

