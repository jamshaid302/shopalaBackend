import express from "express"
import roleGrant from "../../utils/roleGrant.js"
import authValidation from "../../validations/territory.validation.js"
import validate from "../../middlewares/validate.js"

import controllers from "./controllers.js"
import { createRoutesFromArray } from "../../utils/route.js"

export default createRoutesFromArray(express.Router(), [
  {
    method: "get",
    path: "/",
    controller: controllers.getAllTerritories,
    middlewares: [roleGrant.grantAccess("readAny", "territory")],
  },
  {
    method: "get",
    path: "/:id?",
    controller: controllers.getTerritoryById,
    middlewares: [
      roleGrant.grantAccess("readAny", "territory"),
      validate(authValidation.id),
    ],
  },
  {
    method: "post",
    path: "/",
    controller: controllers.postTerritory,
    middlewares: [validate(authValidation.add)],
  },
  {
    method: "patch",
    path: "/:id?",
    controller: controllers.patchTerritoryById,
    middlewares: [
      roleGrant.grantAccess("updateAny", "territory"),
      validate(authValidation.update),
    ],
  },
  {
    method: "delete",
    path: "/:id?",
    controller: controllers.deleteTerritoryById,
    middlewares: [
      roleGrant.grantAccess("deleteAny", "territory"),
      validate(authValidation.id),
    ],
  },
])

/**
 * @swagger
 * components:
 *   schemas:
 *     Territory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The territory name
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Territories
 *   description: The Territories APIs
 */

/**
 * @swagger
 * /api/territory:
 *   get:
 *     summary: Returns the list of all the territorys
 *     tags: [Territories]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the Territories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 */

/**
 * @swagger
 * /api/territory/{id}:
 *   get:
 *     summary: Get the territory by id
 *     tags: [Territories]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The territory id
 *     responses:
 *       200:
 *         description: The territory description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       404:
 *         description: The territory was not found
 */

/**
 * @swagger
 * /api/territory:
 *   post:
 *     summary: Create a new territory
 *     tags: [Territories]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       200:
 *         description: The territory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/territory/{id}:
 *  patch:
 *    summary: Update the territory by the id
 *    tags: [Territories]
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The territory id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Language'
 *    responses:
 *      200:
 *        description: The territory was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Language'
 *      404:
 *        description: The territory was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/territory/{id}:
 *   delete:
 *     summary: Remove the territory by id
 *     tags: [Territories]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The territory id
 *
 *     responses:
 *       200:
 *         description: The territory was deleted
 *       404:
 *         description: The territory was not found
 */
