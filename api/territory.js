var express = require("express");
var router=express.Router();
var territoryDAL=require("../services/territory");
const roleGrant = require("../utils/roleGrant");
const authValidation=require("../validations/territory.validation");
const validate = require('../middlewares/validate');
const httpStatus = require('http-status');
const responseSchema = require("../utils/responseSchema")

router.get("/",roleGrant.grantAccess('readAny', 'territory'),function (req,res){
    territoryDAL.getAll(function (data){
        const response = responseSchema.responseSchema(data)
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })

})

router.get('/:id?',roleGrant.grantAccess('readAny', 'territory'),validate(authValidation.id), (req, res) => {

    territoryDAL.getById(req.params.id, (data, doc) => {
        const response = responseSchema.responseSchema(data)
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});

router.post("/",validate(authValidation.add),function (req,res){
    territoryDAL.add(req.body,function (data){
        const response = responseSchema.responseSchema(data)
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.patch("/:id?",roleGrant.grantAccess('updateAny', 'territory'),validate(authValidation.update),function (req,res){
    req.body.id = req.params.id;
    territoryDAL.update(req.body,function (data){
        const response = responseSchema.responseSchema(data)
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.delete('/:id?',roleGrant.grantAccess('deleteAny', 'territory'),validate(authValidation.id), (req, res) => {
    territoryDAL.removeById(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data)
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });
});

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

module.exports=router;
