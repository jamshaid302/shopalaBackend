const express = require("express");
const router=express.Router();
const currencyDAL=require("../services/currency");
const roleGrant = require("../utils/roleGrant");
const authValidation=require("../validations/currency.validation");
const validate = require('../middlewares/validate');
const httpStatus = require('http-status');
const responseSchema = require("../utils/responseSchema");

router.get("/",roleGrant.grantAccess('readAny', 'currency'),function (req,res){
    currencyDAL.getAll(function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })

})

router.get('/:id?',roleGrant.grantAccess('readAny', 'currency'),validate(authValidation.id), (req, res) => {

    currencyDAL.getById(req.params.id, (data, doc) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});

router.post("/",roleGrant.grantAccess('readAny', 'currency'),validate(authValidation.add),function (req,res){
    currencyDAL.add(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.patch("/:id?",roleGrant.grantAccess('readAny', 'currency'),validate(authValidation.update),function (req,res){
    req.body.id = req.params.id;
    currencyDAL.update(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.delete('/:id?',roleGrant.grantAccess('readAny', 'currency'), validate(authValidation.id),(req, res) => {
    currencyDAL.removeById(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });
});


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

module.exports=router;
