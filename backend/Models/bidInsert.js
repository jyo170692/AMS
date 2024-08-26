const mongoose =require('mongoose')

//schema
const Bidschema = new mongoose.Schema({
    item_name:
    {
        type:String,
        required:true
    },
    start_time:
    {
        type:String,
        required:true
    },
    end_time:    
    {
        type:String,
        required:true
    },
    start_price:
    {
       type:String,
       required:true
    },
    status:
    {
        type:String,
        default:"pending"
    },
    winner:
    {
        type:String,
        default:"Not announce"
    }
    // time:
    // {
    //     default:new Date()
    // }
   
    
    
},{timestamps:true})



const BidModel= new mongoose.model('bid',Bidschema)
module.exports = BidModel