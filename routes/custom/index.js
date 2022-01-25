import express from "express"
import roleGrant from "../../utils/roleGrant.js"

import controller from "./controllers.js"
import { createRoutesFromArray } from "../../utils/route.js"

export default createRoutesFromArray(express.Router(), [
  {
    method: "get",
    path: "/",
    controller: controller.getCustomAll,
    middlewares: [roleGrant.grantAccess("readAny", "currency")],
  },
])

/**
 * @swagger
 * tags:
 *   name: Custom
 *   description: The combined table APIs
 */

/**
 * @swagger
 * /api/custom:
 *   get:
 *     summary: Returns the list of all the currency,territory,language
 *     tags: [Custom]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the currency,territory,language
 */
