const mongoose =require('mongoose')

//schema
const Priceschema = new mongoose.Schema({
    user_id:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    price:
    {
       type:String,
       required:true
    },
    
   
    
    
},{timestamps:true})



const PriceModel= new mongoose.model('price',Priceschema)
module.exports = PriceModel