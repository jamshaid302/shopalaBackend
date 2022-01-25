const express = require("express");
const router=express.Router();
const userDAL=require("../services/user");
const passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const passport = require("passport")
const roleGrant=require("../utils/roleGrant");
const authValidation=require("../validations/user.validation");
const validate = require('../middlewares/validate');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const responseSchema = require("../utils/responseSchema");
const {registrationEmail} = require("../utils/emailer");


const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey : "secretkey"};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload);
}));

const multer  = require('multer')
const {required} = require("joi");
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

router.get("/",passport.authenticate('jwt', { session: false }),roleGrant.grantAccess('readAny', 'user'),function (req,res){
    userDAL.getAll(function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })

})

router.get('/id/:id?',passport.authenticate('jwt', { session: false }),validate(authValidation.id),roleGrant.grantAccess('readAny', 'user'), (req, res) => {
    userDAL.getById(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});

router.get('/email/:id?',passport.authenticate('jwt', { session: false }),validate(authValidation.email),roleGrant.grantAccess('readAny', 'user'), (req, res) => {
    userDAL.getByEmail(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });

});

router.post("/login",validate(authValidation.login),function (req,res){
    userDAL.getByEmail(req.body.email, (data) => {
        if (data.message == "success" && data.data.length>0) {
            if(passwordHash.verify(req.body.password, data.data[0].password)){
                delete data.data[0].password
                jwt.sign({user:data.data[0]}, "secretkey",(err, token)=>{
                    const response = responseSchema.responseSchema({message:"success",data:{token:token}});
                    res.status(200).json(response)
                })

            } else{
                const response = responseSchema.responseSchema({message:"failed",data:"Password is wrong"});
                res.status(401).json(response)
            }
        } else{
            const response = responseSchema.responseSchema({message:"failed",data:"Email is wrong"});
            res.status(401).json(response)
        }
    });
})

router.post("/registration",upload.single('avatar'),validate(authValidation.register),catchAsync(function (req,res){
    req.body.image= req.protocol+"://"+req.get('host')+"/"+req.file.path.replace("\\",'/');
    const hashedPassword = passwordHash.generate(req.body.password);
    req.body.password = hashedPassword;
    userDAL.add(req.body,function (data){

        if(data.message == "success"){
            registrationEmail(data.data)
        }
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
}))

router.patch("/:id?",upload.single('avatar'),passport.authenticate('jwt', { session: false }),validate(authValidation.update),roleGrant.grantAccess('updateAny', 'user'),function (req,res){
    req.body.id = req.params.id;
    if(req.file!=undefined){
        req.body.image= req.protocol+"://"+req.get('host')+"/"+req.file.path.replace("\\",'/');
    }else{
        delete req.body.avatar;
    }
    userDAL.update(req.body,function (data){
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    })
})

router.delete('/:id?',passport.authenticate('jwt', { session: false }),validate(authValidation.id),roleGrant.grantAccess('deleteAny', 'user'), (req, res) => {
    userDAL.removeById(req.params.id, (data) => {
        const response = responseSchema.responseSchema(data);
        response.status_code == 1 ? res.status(200).json(response) : res.status(401).json(response)
    });
});


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: The Email
 *         password:
 *           type: string
 *           description: The Password
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User APIs
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /user/id/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

/**
 * @swagger
 * /user/email/{email}:
 *   get:
 *     summary: Get the user by Email
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ "admin", "vendor"]
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The language id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

module.exports=router;
