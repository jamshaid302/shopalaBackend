import express from "express"

// routes
import productRoute from "./product/index.js"
import campaignRoute from "./campaign/index.js"
import languageRoute from "./language/index.js"
import territoryRoute from "./territory/index.js"
import userRoute from "./user/index.js"
import currencyRoute from "./currency/index.js"
import customApiRoute from "./custom/index.js"
import paymentsRoute from "./payment/index.js"
import checkoutApisRoute from "./checkout-api/index.js"


const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
protectedRouter.use("/product", productRoute)
protectedRouter.use("/campaign", campaignRoute)
protectedRouter.use("/language", languageRoute)
protectedRouter.use("/currency", currencyRoute)
protectedRouter.use("/custom", customApiRoute)
protectedRouter.use("/territory", territoryRoute)

// Un-Protected Routes

unProtectedRouter.use("/user", userRoute)
unProtectedRouter.use("/payment", paymentsRoute)
unProtectedRouter.use("/checkout", checkoutApisRoute)


export { protectedRouter, unProtectedRouter }
