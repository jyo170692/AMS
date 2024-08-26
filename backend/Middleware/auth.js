const jwt = require('jsonwebtoken')
const RegistrationModel = require('../Models/registration')


const auth = async(req,res,next)=>
{
    const { token } = req.cookies
    // console.log(token)
    try
    {
        if(token)                     
        {
            const verifytoken =  jwt.verify(token,"auc@1706")
            // console.log(verifytoken.ID)
            const data = await RegistrationModel.findOne({_id:verifytoken.ID})
              req.data =data
             next()

             
        }
        else
        {
           
            req.flash('success','unauth user')
           res.redirect('/login')
        }
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports = auth