var product=require("../models/product");
var db=require("../config/database");
const mongoose = require("mongoose");
const user = require("../models/user");

var productDal={
    getAll:function (userId,callback) {
        var query = {user_id: userId,is_active:true}
        product.find(query).populate("user_id",'email first_name last_name role image').then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })

    },
    getById:function (body, callback){
        var query = {_id: body.id,is_active:true}
        product.find(query).populate("user_id",'email first_name last_name role image').then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },
    getByUserId:function (body, callback){
        var query = {user_id: body,is_active:true}
        product.find(query).populate("user_id",'email first_name last_name role image').then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    add:function (body, callback){
        var obj=new product(body);
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
        delete body.id;
        product.updateOne(
            { "_id" : id },
            { $set: body ,
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
        product.updateOne(
            { "_id" : id },
            { $set: {is_active:false} ,
            },
            {runValidators: true}
        ).then(function (updateDate) {
            var obj={message:"success",data:"Deleted"}
            callback(obj)
        }).catch(function (err) {
            var obj={message:"error",data:err.message}
            callback(obj)
        });
    },


}

module.exports=productDal
