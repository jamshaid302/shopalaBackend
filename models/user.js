var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    first_name: { type: String, required: true,maxlength:50 },
    last_name: { type: String, required: true,maxlength:50 },
    email: { type: String, required: true,maxlength:50,unique:true },
    password: { type: String, required: true,maxlength:5000 },
    role: { type: String, required: true,maxlength:50,enum:['admin','vendor'] },
    image: {type: String,  required: true,maxlength:500 },
    set_by_admin: {type: Boolean,  required: true, default: false },
});
module.exports=mongoose.model("User",schema);
