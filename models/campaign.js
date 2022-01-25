var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    product_id:{type: mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
    currency_id: {type: mongoose.Schema.Types.ObjectId,ref:"Currency",required:true},
    price: { type: Number, required: true,maxlength:50 },
    description: { type: String, required: true,maxlength:50 },
    status: { type: String, required: true,enum:["active","pause"] },
    territory_id:{type: mongoose.Schema.Types.ObjectId,ref:"Territory",required:true},
    language_id:{type: mongoose.Schema.Types.ObjectId,ref:"Language",required:true},
    paypal: { type: Boolean, required: true,maxlength:50 },
    ideal: { type: Boolean, required: true,maxlength:50 },
    google_pay: { type: Boolean, required: true,maxlength:50 },
    apple_pay: { type: Boolean, required: true,maxlength:50 },
    credit_card: { type: Boolean, required: true,maxlength:50 },
    free_shipping: { type: Boolean, required: true,maxlength:50 },
    free_terms: { type: String },
    thankyou: { type: String },
    privacy_link: { type: String },
    is_active: { type: Boolean, default:true },

});
module.exports=mongoose.model("Campaign",schema);
