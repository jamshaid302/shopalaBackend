var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    name: { type: String, required: true,maxlength:50 },
    description: { type: String, required: false,maxlength:50 },
    quantity: { type: Number, required: false,maxlength:50 },
    image: { type: String, required: true,maxlength:500 },
    brand_logo: { type: String, maxlength:500 },
    is_active: { type: Boolean, default:true },
});
module.exports=mongoose.model("Product",schema);
