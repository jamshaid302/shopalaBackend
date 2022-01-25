const environment = {
  port: process.env.PORT || 2022,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.DB_URI,
  payments: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    PAYPAL_API: process.env.PAYPAL_API,
    PAYPAL_TOKEN:
      "QVJESXRobDZzQTB4OENZb01aYThLT1A4YjktenNudEwwMmh0TS1XRXJZUkllV3pKcnV1azJtUUc4NjhhZUdETTRvSHZickVDSE5nU1lKUjg6RUt6ZVdIQUFrSVFkbWh4eFVlbnFTNzAzci1IOHlSbzVpX1g5dEh0QmtRUkpkV2NXeU9UN0RGLWVmdVFscUZlZ2dNc05vaHUzcmlKUnBKazI=",
  },
  emailer: {
    ADMIN_EMAIL_ID:
      process.env.ADMIN_EMAIL_ID || "imafullstackdeveloper@gmail.com",
    ADMIN_EMAIL_SERVICE: process.env.ADMIN_EMAIL_SERVICE || "gmail",
    ADMIN_EMAIL_PASSWORD:
      process.env.ADMIN_EMAIL_PASSWORD || "randompassword123",
  },
};

export default environment;
