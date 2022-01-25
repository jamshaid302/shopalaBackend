const express = require("express");
const router=express.Router();
const currencyDAL=require("../services/currency");
const languageDAL=require("../services/language");
const territoryDAL=require("../services/territory");
const roleGrant = require("../utils/roleGrant");
const authValidation=require("../validations/currency.validation");
const validate = require('../middlewares/validate');
const httpStatus = require('http-status');
const responseSchema = require("../utils/responseSchema");

router.get("/",roleGrant.grantAccess('readAny', 'currency'),async (req,res)=>{
    currencyDAL.getAll(function (data){
        languageDAL.getAll(function (language){
            territoryDAL.getAll(function (territory){
                let obj={};
                if(data.message=="success" && language.message=="success"&& territory.message=="success"){
                    obj={status_code:1,message:"Success",data:{currency:data.data,language:language.data,territory:territory.data}};

                }else{
                    obj={status_code:0,message:"Failed",data:{currency:data.data,language:language.data,territory:territory.data}};

                }

                obj.status_code == 1 ? res.status(200).json(obj) : res.status(401).json(obj)
            })
        })

    })

})




/**
 * @swagger
 * tags:
 *   name: Custom
 *   description: The combined table APIs
 */

/**
 * @swagger
 * /api/custom:
 *   get:
 *     summary: Returns the list of all the currency,territory,language
 *     tags: [Custom]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the currency,territory,language
 */


module.exports=router;
