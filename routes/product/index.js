import express from "express";
import { createRoutesFromArray } from "../../utils/route.js";

import roleGrant from "../../utils/roleGrant.js";
import authValidation from "../../validations/product.validation.js";
import validate from "../../middlewares/validate.js";
import { uploadProductImage } from "../../utils/s3Upload.js";
import controllers from "./controllers.js";

export default createRoutesFromArray(express.Router(), [
  {
    method: "get",
    path: "/",
    controller: controllers.getAllProducts,
    middlewares: [roleGrant.grantAccess("readAny", "product")],
  },
  {
    method: "get",
    path: "/:id?",
    controller: controllers.getProductById,
    middlewares: [validate(authValidation.id)],
  },
  {
    method: "get",
    path: "/user/:user_id?",
    controller: controllers.getProductsByUserId,
    middlewares: [validate(authValidation.userid)],
  },
  {
    method: "post",
    path: "/",
    controller: controllers.postProduct,
    middlewares: [
      uploadProductImage.fields([
        { name: "image", maxCount: 1 },
        { name: "brand_logo", maxCount: 1 },
      ]),
      validate(authValidation.add),
    ],
  },
  {
    method: "patch",
    path: "/:id?",
    middlewares: [
      uploadProductImage.fields([
        { name: "image", maxCount: 1 },
        { name: "brand_logo", maxCount: 1 },
      ]),
      validate(authValidation.update),
    ],
    controller: controllers.updateProductById,
  },
  {
    method: "delete",
    path: "/:id?",
    controller: controllers.deleteProductById,
    middlewares: [validate(authValidation.id)],
  },
]);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         user_id:
 *           type: string
 *           description: The user_id
 *         name:
 *           type: string
 *           description: The name
 *         description:
 *           type: string
 *           description: The description
 *         quantity:
 *           type: number
 *           description: The quantity
 *         image:
 *           type: string
 *           description: The image
 *         brand_logo:
 *           type: string
 *           description: The brand_logo
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The User APIs
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Returns the list of all the Products
 *     tags: [Products]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */

/**
 * @swagger
 * /api/product/user/{user_id}:
 *   get:
 *     summary: Get all products by user_id
 *     tags: [Products]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user_id
 *     responses:
 *       200:
 *         description: The products description by user_id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The products was not found
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Register a new Product
 *     tags: [Products]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               brand_logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The product was successfully created
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               brand_logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete the product by id
 *     tags: [Products]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
