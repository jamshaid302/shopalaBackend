import express from "express"
import passport from "passport"
import roleGrant from "../../utils/roleGrant.js"
import authValidation from "../../validations/user.validation.js"
import validate from "../../middlewares/validate.js"
import catchAsync from "../../utils/catchAsync.js"
import { uploadProfileImage } from "../../utils/s3Upload.js"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import multer from "multer"
import controllers from "./controllers.js"
import { createRoutesFromArray } from "../../utils/route.js"

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secretkey",
}

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload)
  })
)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/")
    let extension = extArray[extArray.length - 1]
    cb(null, file.fieldname + "-" + Date.now() + "." + extension)
  },
})

const upload = multer({ storage: storage })

export default createRoutesFromArray(express.Router(), [
  {
    method: "get",
    path: "/",
    controller: controllers.getAllUsers,
    middlewares: [
      passport.authenticate("jwt", { session: false }),
      roleGrant.grantAccess("readAny", "user"),
    ],
  },
  {
    method: "get",
    path: "/profile",
    controller: controllers.getUserProfile,
    middlewares: [
      passport.authenticate("jwt", { session: false }),
      roleGrant.grantAccess("readAny", "user"),
    ],
  },
  {
    method: "get",
    path: "/:id?",
    controller: controllers.getUserById,
    middlewares: [
      passport.authenticate("jwt", { session: false }),
      roleGrant.grantAccess("readAny", "user"),
    ],
  },
  {
    method: "get",
    path: "/email/:id?",
    controller: controllers.getUserByEmail,
    middlewares: [
      passport.authenticate("jwt", { session: false }),
      validate(authValidation.email),
      roleGrant.grantAccess("readAny", "user"),
    ],
  },
  {
    method: "post",
    path: "/login",
    controller: controllers.postLoginUser,
    middlewares: [validate(authValidation.login)],
  },
  {
    method: "post",
    path: "/registration",
    controller: catchAsync(controllers.postRegisterUser),
    middlewares: [
      uploadProfileImage.single("avatar"),
      validate(authValidation.register),
    ],
  },
  {
    method: "patch",
    path: "/:id?",
    controller: controllers.patchUserById,
    middlewares: [
      uploadProfileImage.single("avatar"),
      passport.authenticate("jwt", { session: false }),
      validate(authValidation.update),
      roleGrant.grantAccess("updateAny", "user"),
    ],
  },
  {
    method: "delete",
    path: "/:id?",
    controller: controllers.deleteUserById,
    middlewares: [
      passport.authenticate("jwt", { session: false }),
      validate(authValidation.id),
      roleGrant.grantAccess("deleteAny", "user"),
    ],
  },
])

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
