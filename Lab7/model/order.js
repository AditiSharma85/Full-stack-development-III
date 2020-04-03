const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
item:String,
customer_name:{
    type:String,
    require:true
},
active:{
    type:Boolean,
    default:true
}
});
const Order=mongoose.model('Order',orderSchema,'Orders');
module.exports= Order;


