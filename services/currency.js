var currency=require("../models/currency");
var db=require("../config/database");
const mongoose = require("mongoose");

var currencyDal={
    getAll:function (callback){
        currency.find().then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    getById:function (id, callback){
        currency.findById(id).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    add:function (body, callback){
        var userObj=new currency({
            name: body.name,
        });
        userObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    update:function (body,callback){
        currency.updateOne(
            { "_id" : body.id },
            { $set: {
                    name: body.name,
                } ,
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
        currency.findByIdAndRemove(id).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

}

module.exports=currencyDal
