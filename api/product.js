var express = require("express");
var router=express.Router();
var productDAL=require("../services/product");
var passwordHash = require('password-hash');
var jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const roleGrant = require("../utils/roleGrant");

const authValidation=require("../validations/product.validation");
const validate = require('../middlewares/validate');
const httpStatus = require('http-status');

const multer  = require('multer')
const responseSchema = require("../utils/responseSchema");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})

const upload = multer({ storage: storage })

router.get("/",roleGrant.grantAccess('readAny', 'product'),function (req,res){
    productDAL.getAll(req.user.user._id,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })

})

router.get('/:id?',validate(authValidation.id), (req, res) => {

    const userId = req.user.user._id;
    var body = {
        id:req.params.id,
        user_id:userId
    }
    productDAL.getById(body, (data, doc) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});

router.get('/user/:user_id?',validate(authValidation.userid), (req, res) => {
    productDAL.getByUserId(req.params.user_id, (data, doc) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});


router.post("/",upload.fields([{name: 'image', maxCount: 1}, {name: 'brand_logo', maxCount: 1}]),validate(authValidation.add),function (req,res){
    if(req.files.image!=undefined){
        req.body.image= req.protocol+"://"+req.get('host')+"/"+req.files.image[0].path.replace("\\",'/');

    }
    if(req.files.brand_logo!=undefined) {
        req.body.brand_logo = req.protocol + "://" + req.get('host') + "/" + req.files.brand_logo[0].path.replace("\\", '/');
    }

    productDAL.add(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.patch("/:id?",upload.fields([{name: 'image', maxCount: 1}, {name: 'brand_logo', maxCount: 1}]),validate(authValidation.update),function (req,res){
    if(req.files.image!=undefined){
        req.body.image= req.protocol+"://"+req.get('host')+"/"+req.files.image[0].path.replace("\\",'/');

    }else{
        delete req.body.image;
    }
    if(req.files.brand_logo!=undefined) {
        req.body.brand_logo = req.protocol + "://" + req.get('host') + "/" + req.files.brand_logo[0].path.replace("\\", '/');
    }else{
        delete req.body.brand_logo;
    }
    req.body.id=req.params.id
    productDAL.update(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.delete('/:id?',validate(authValidation.id), (req, res) => {
    productDAL.removeById(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });
});

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

module.exports=router;
