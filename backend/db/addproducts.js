const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    product:String,file:String,company:String,desc:String,price:String
});
module.exports=mongoose.model('products',productSchema)