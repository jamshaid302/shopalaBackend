import express from "express"
import roleGrant from "../../utils/roleGrant.js"
import authValidation from "../../validations/currency.validation.js"
import validate from "../../middlewares/validate.js"

import { createRoutesFromArray } from "../../utils/route.js"
import controllers from "./controllers.js"

export default createRoutesFromArray(express.Router(), [
  {
    method: "get",
    path: "/",
    controller: controllers.getAllCurrencies,
    middlewares: [roleGrant.grantAccess("readAny", "currency")],
  },
  {
    method: "get",
    path: "/:id?",
    controller: controllers.getCurrencyById,
    middlewares: [
      roleGrant.grantAccess("readAny", "currency"),
      validate(authValidation.id),
    ],
  },
  {
    method: "post",
    path: "/",
    controller: controllers.postCurrency,
    middlewares: [
      roleGrant.grantAccess("readAny", "currency"),
      validate(authValidation.add),
    ],
  },
  {
    method: "patch",
    path: "/:id?",
    controller: controllers.patchCurrencyById,
    middlewares: [
      roleGrant.grantAccess("readAny", "currency"),
      validate(authValidation.update),
    ],
  },
  {
    method: "delete",
    path: "/:id?",
    controller: controllers.deleteCurrencyById,
    middlewares: [
      roleGrant.grantAccess("readAny", "currency"),
      validate(authValidation.id),
    ],
  },
])

/**
 * @swagger
 * components:
 *   schemas:
 *     Currency:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The currency name
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Currency
 *   description: The Currency APIs
 */

/**
 * @swagger
 * /api/currency:
 *   get:
 *     summary: Returns the list of all the currency
 *     tags: [Currency]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the currency
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Currency'
 */

/**
 * @swagger
 * /api/currency/{id}:
 *   get:
 *     summary: Get the currency by id
 *     tags: [Currency]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The currency id
 *     responses:
 *       200:
 *         description: The currency description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       404:
 *         description: The currency was not found
 */

/**
 * @swagger
 * /api/currency:
 *   post:
 *     summary: Create a new currency
 *     tags: [Currency]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Currency'
 *     responses:
 *       200:
 *         description: The currency was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/currency/{id}:
 *  patch:
 *    summary: Update the currency by the id
 *    tags: [Currency]
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The currency id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Currency'
 *    responses:
 *      200:
 *        description: The currency was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Currency'
 *      404:
 *        description: The currency was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/currency/{id}:
 *   delete:
 *     summary: Remove the currency by id
 *     tags: [Currency]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The currency id
 *
 *     responses:
 *       200:
 *         description: The currency was deleted
 *       404:
 *         description: The currency was not found
 */
