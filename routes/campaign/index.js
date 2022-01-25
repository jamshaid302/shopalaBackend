import express from "express";
import controllers from "./controllers.js";

import { uploadCampaignImage } from "../../utils/s3Upload.js";
import { createRoutesFromArray } from "../../utils/route.js";
import roleGrant from "../../utils/roleGrant.js";
import authValidation from "../../validations/campaign.validation.js";
import validate from "../../middlewares/validate.js";

export default createRoutesFromArray(express.Router(), [
  {
    method: "get",
    path: "/",
    controller: controllers.getAllCampaigns,
    middlewares: [roleGrant.grantAccess("readAny", "campaign")],
  },
  {
    method: "get",
    path: "/:id?",
    controller: controllers.getCampaignById,
    middlewares: [roleGrant.grantAccess("readAny", "campaign")],
  },
  {
    method: "post",
    path: "/user",
    controller: controllers.getCampaignById,
    middlewares: [roleGrant.grantAccess("readAny", "campaign")],
  },
  {
    method: "post",
    path: "/",
    controller: controllers.postCampaign,
    middlewares: [
      uploadCampaignImage.fields([{ name: "image", maxCount: 1 }]),
      validate(authValidation.add),
    ],
  },
  {
    method: "patch",
    path: "/:id?",
    controller: controllers.patchCampaignById,
    middlewares: [
      uploadCampaignImage.fields([{ name: "image", maxCount: 1 }]),
      roleGrant.grantAccess("updateAny", "campaign"),
      validate(authValidation.id),
    ],
  },
  {
    method: "delete",
    path: "/:id?",
    controller: controllers.deleteCampaignById,
    middlewares: [
      roleGrant.grantAccess("deleteAny", "campaign"),
      validate(authValidation.id),
    ],
  },
]);

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         user_id:
 *           type: string
 *           description: The user_id
 *         product_id:
 *           type: string
 *           description: The product_id
 *         currency_id:
 *           type: string
 *           description: The currency
 *         price:
 *           type: number
 *           description: The price
 *         description:
 *           type: string
 *           description: The description
 *         status:
 *           type: string
 *           description: The status(active,pause)
 *         territory_id:
 *           type: string
 *           description: The territory_id
 *         language_id:
 *           type: string
 *           description: The language_id
 *         paypal:
 *           type: boolean
 *           description: The paypal
 *         ideal:
 *           type: boolean
 *           description: The ideal
 *         google_pay:
 *           type: boolean
 *           description: The google_pay
 *         apple_pay:
 *           type: boolean
 *           description: The apple_pay
 *         credit_card:
 *           type: boolean
 *           description: The credit_card
 *         free_shipping:
 *           type: boolean
 *           description: The free_shipping
 *         free_terms:
 *           type: string
 *           description: The free_terms
 *         thankyou:
 *           type: string
 *           description: The thankyou
 *         privacy_link:
 *           type: string
 *           description: The privacy_link
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Campaign
 *   description: The Campaign APIs
 */

/**
 * @swagger
 * /api/campaign:
 *   get:
 *     summary: Returns the list of all the campaign
 *     tags: [Campaign]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the campaign
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 */

/**
 * @swagger
 * /api/campaign/{id}:
 *   get:
 *     summary: Get the campaign by id
 *     tags: [Campaign]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The campaign id
 *     responses:
 *       200:
 *         description: The campaign description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       404:
 *         description: The campaign was not found
 */

/**
 * @swagger
 * /api/campaign/user:
 *   post:
 *     summary: get all campaigns of specific user
 *     tags: [Campaign]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: The campaign was successfully reterived
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/campaign:
 *   post:
 *     summary: Register a new campaign
 *     tags: [Campaign]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       200:
 *         description: The campaign was successfully created
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/campaign/{id}:
 *   patch:
 *     summary: Update campaign
 *     tags: [Campaign]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The campaign id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       200:
 *         description: The Campaign was updated updated
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/campaign/{id}:
 *   delete:
 *     summary: Delete the campaign by id
 *     tags: [Campaign]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The campaign id
 *
 *     responses:
 *       200:
 *         description: The Campaign was deleted
 *       404:
 *         description: The Campaign was not found
 */
