var campaign=require("../models/campaign");
var db=require("../config/database");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var campaignDal={
    getAll:function (userId,callback) {
        campaign.aggregate([
            {$match:{is_active:true}},
            {
                $lookup:{
                    from:"products",
                    "let":{"productId":"$product_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{
                                    $and:[
                                        {$eq: ["$_id","$$productId"]},
                                        {$eq:["$is_active", true]}
                                    ]
                                }
                            },
                        }
                    ],
                    as:"product"
                }

            },
            { $unwind : { path: "$product", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"territories",
                    localField:"territory_id",
                    foreignField:"_id",
                    as:"territory"
                }
            },
            { $unwind : { path: "$territory", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"languages",
                    localField:"language_id",
                    foreignField:"_id",
                    as:"language"
                }
            },
            { $unwind : { path: "$language", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"currencies",
                    localField:"currency_id",
                    foreignField:"_id",
                    as:"currency"
                }
            },
            { $unwind : { path: "$currency", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"users",
                    localField:"user_id",
                    foreignField:"_id",
                    as:"user"
                }
            },
            { $unwind : { path: "$user", preserveNullAndEmptyArrays: true } },
            { $unset: ["user.password","user.set_by_admin"] }
        ]).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },
    getById:function (body, callback){
        var query = {_id: body.id,is_active:true}
        campaign.aggregate([
            {$match: { _id:ObjectId(body.id),is_active:true  }},
            {
                $lookup:{
                    from:"products",
                    "let":{"productId":"$product_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{
                                    $and:[
                                        {$eq: ["$_id","$$productId"]},
                                        {$eq:["$is_active", true]}
                                    ]
                                }
                            },
                        }
                    ],
                    as:"product"
                }

            },
            { $unwind : { path: "$product", preserveNullAndEmptyArrays: true } },

            {
                $lookup:{
                    from:"territories",
                    localField:"territory_id",
                    foreignField:"_id",
                    as:"territory"
                }
            },
            { $unwind : { path: "$territory", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"languages",
                    localField:"language_id",
                    foreignField:"_id",
                    as:"language"
                }
            },
            { $unwind : { path: "$language", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"currencies",
                    localField:"currency_id",
                    foreignField:"_id",
                    as:"currency"
                }
            },
            { $unwind : { path: "$currency", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"users",
                    localField:"user_id",
                    foreignField:"_id",
                    as:"user"
                }
            },
            { $unwind : { path: "$user", preserveNullAndEmptyArrays: true } },
            { $unset: ["user.password","user.set_by_admin"] }
        ]).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },
    getByUserId:function (body, callback){
        campaign.aggregate([
            {$match: { user_id:ObjectId(body.user_id),is_active:true  }},
            {
                $lookup:{
                    from:"products",
                    "let":{"productId":"$product_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{
                                    $and:[
                                        {$eq: ["$_id","$$productId"]},
                                        {$eq:["$is_active", true]}
                                    ]
                                }
                            },
                        }
                    ],
                    as:"product"
                }

            },
            { $unwind : { path: "$product", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"territories",
                    localField:"territory_id",
                    foreignField:"_id",
                    as:"territory"
                }
            },
            { $unwind : { path: "$territory", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"languages",
                    localField:"language_id",
                    foreignField:"_id",
                    as:"language"
                }
            },
            { $unwind : { path: "$language", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"currencies",
                    localField:"currency_id",
                    foreignField:"_id",
                    as:"currency"
                }
            },
            { $unwind : { path: "$currency", preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:"users",
                    localField:"user_id",
                    foreignField:"_id",
                    as:"user"
                }
            },
            { $unwind : { path: "$user", preserveNullAndEmptyArrays: true } },
            { $unset: ["user.password","user.set_by_admin"] }
        ]).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    add:function (body, callback){
        var obj=new campaign(body);
        obj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    update:function (body,callback){
        var id=body.id;
        delete body.id
        campaign.updateOne(
            { "_id" : id },
            { $set: body,
            },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

    },

    removeById:function (id,callback){
        campaign.updateOne(
            { "_id" : id },
            { $set: {is_active:false},
            },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
}
module.exports=campaignDal
