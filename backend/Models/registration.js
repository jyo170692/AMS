const mongoose =require('mongoose')

//schema
const Registrationschema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
    },
   
    phone:
    {
        type:String,
        required:true,
    },
    address:
    {
        type:String,
        required:true,
    },
    role:
    {
        type:String,
        default:'user'
    },
    password:
    {
        type:String,
        required:true,
    },
    confirm_password:
    {
        type:String,
        required:true,
    },
},{timestamps:true})



const RegistrationModel = new mongoose.model('res',Registrationschema)
module.exports = RegistrationModel