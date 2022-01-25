var express = require("express");
var router=express.Router();
var campaignDAL=require("../services/campaign");
var passwordHash = require('password-hash');
var jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const roleGrant = require("../utils/roleGrant");

const authValidation=require("../validations/campaign.validation");
const validate = require('../middlewares/validate');
const httpStatus = require('http-status');
const responseSchema = require("../utils/responseSchema");
const {campaignEmail} = require("../utils/emailer")

router.get("/",roleGrant.grantAccess('readAny', 'campaign'),function (req,res){
    const userId = req.user.user._id;
    campaignDAL.getAll(userId,function (data){
        var response = responseSchema.responseSchema(data)
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })

})

router.get('/:id?',roleGrant.grantAccess('readAny', 'campaign'),validate(authValidation.id), (req, res) => {

    const userId = req.user.user._id;
    var body = {
        id:req.params.id,
        user_id:userId
    }
    campaignDAL.getById(body, (data, doc) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});

router.post('/user',roleGrant.grantAccess('readAny', 'campaign'),validate(authValidation.userid), (req, res) => {

    campaignDAL.getByUserId(req.body, (data, doc) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});


router.post("/",validate(authValidation.add),function (req,res){

    const userId = req.user.user._id;
    const body = req.body;
    body.user_id = userId;

    campaignDAL.add(body,function (data){
        campaignEmail(req.user.user)
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.patch("/:id?",roleGrant.grantAccess('updateAny', 'campaign'),validate(authValidation.update),function (req,res){

    req.body.id = req.params.id;
    campaignDAL.update(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.delete('/:id?',roleGrant.grantAccess('deleteAny', 'campaign'), validate(authValidation.id),(req, res) => {
    campaignDAL.removeById(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });
});


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


module.exports=router;
