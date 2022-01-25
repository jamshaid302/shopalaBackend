var user=require("../models/user");
var db=require("../config/database");
const mongoose = require("mongoose");

var userDal={
    getAll:function (callback){
        user.find().select({  "password": 0}).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    getById:function (id, callback){
        user.findById(id).select({  "password": 0}).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    getByEmail:function (email, callback){
        var query = {email: email}
        user.find(query).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    add:function (body, callback){
        var userObj=new user({
            first_name: body.first_name,
            last_name: body.last_name,
            email:body.email,
            password: body.password,
            image: body.image,
            role: body.role,
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
        var id=body.id;
        delete body.id;
        user.updateOne(
            { "_id" : id },
            { $set: body
                ,
            },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

        // user.findOneAndUpdate({ _id: id.body._id }, id.body, { new: true }, (data, doc) => {
        //     var obj={message:"success",data:data}
        //     callback(obj)
        //
        // }).catch(function (err){
        //     var obj={message:"error",data:err.message}
        //     callback(obj)
        // });
    },

    removeById:function (id,callback){
        user.findByIdAndRemove(id).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },


}

module.exports=userDal
