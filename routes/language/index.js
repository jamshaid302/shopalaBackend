import express from "express"
import roleGrant from "../../utils/roleGrant.js"
import authValidation from "../../validations/language.validation.js"
import validate from "../../middlewares/validate.js"

import { createRoutesFromArray } from "../../utils/route.js"
import controllers from "./controllers.js"

export default createRoutesFromArray(express.Router(), [
  {
    method: "get",
    path: "/",
    controller: controllers.getAllLanguages,
    middlewares: [roleGrant.grantAccess("readAny", "language")],
  },
  {
    method: "get",
    path: "/:id?",
    controller: controllers.getLanguageById,
    middlewares: [
      roleGrant.grantAccess("readAny", "language"),
      validate(authValidation.id),
    ],
  },
  {
    method: "post",
    path: "/",
    controller: controllers.postLanguage,
    middlewares: [
      roleGrant.grantAccess("readAny", "language"),
      validate(authValidation.add),
    ],
  },
  {
    method: "patch",
    path: "/:id?",
    controller: controllers.patchLanguageById,
    middlewares: [
      roleGrant.grantAccess("readAny", "language"),
      validate(authValidation.update),
    ],
  },
  {
    method: "delete",
    path: "/:id?",
    controller: controllers.deleteLanguageById,
    middlewares: [
      roleGrant.grantAccess("readAny", "language"),
      validate(authValidation.id),
    ],
  },
])

/**
 * @swagger
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The language name
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Languages
 *   description: The Languages APIs
 */

/**
 * @swagger
 * /api/language:
 *   get:
 *     summary: Returns the list of all the languages
 *     tags: [Languages]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the Languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 */

/**
 * @swagger
 * /api/language/{id}:
 *   get:
 *     summary: Get the language by id
 *     tags: [Languages]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The language id
 *     responses:
 *       200:
 *         description: The language description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       404:
 *         description: The language was not found
 */

/**
 * @swagger
 * /api/language:
 *   post:
 *     summary: Create a new language
 *     tags: [Languages]
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
 *         description: The language was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/language/{id}:
 *  patch:
 *    summary: Update the language by the id
 *    tags: [Languages]
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The language id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Language'
 *    responses:
 *      200:
 *        description: The language was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Language'
 *      404:
 *        description: The language was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/language/{id}:
 *   delete:
 *     summary: Remove the language by id
 *     tags: [Languages]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The language id
 *
 *     responses:
 *       200:
 *         description: The language was deleted
 *       404:
 *         description: The language was not found
 */
