const express = require("express");
const router=express.Router();
const languageDAL=require("../services/language");
const roleGrant = require("../utils/roleGrant");
const authValidation=require("../validations/language.validation");
const validate = require('../middlewares/validate');
const httpStatus = require('http-status');
const responseSchema = require("../utils/responseSchema");

router.get("/",roleGrant.grantAccess('readAny', 'language'),function (req,res){
    languageDAL.getAll(function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })

})

router.get('/:id?',roleGrant.grantAccess('readAny', 'language'),validate(authValidation.id), (req, res) => {

    languageDAL.getById(req.params.id, (data, doc) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});

router.post("/",roleGrant.grantAccess('readAny', 'language'),validate(authValidation.add),function (req,res){
    languageDAL.add(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.patch("/:id?",roleGrant.grantAccess('readAny', 'language'),validate(authValidation.update),function (req,res){
    req.body.id = req.params.id;
    languageDAL.update(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.delete('/:id?',roleGrant.grantAccess('readAny', 'language'), validate(authValidation.id),(req, res) => {
    languageDAL.removeById(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });
});


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

module.exports=router;
