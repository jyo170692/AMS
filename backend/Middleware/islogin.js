const jwt = require('jsonwebtoken')


const islogin = async(req,res,next)=>
{
    try{
      // console.log('hello auth');
          const {token} = req.cookies
      // console.log(token)
          if(token)
         {
        
            res.redirect('/userdashboard')
    
         }
         next()
    }
    catch(error)
    {
       console.log(error)
    }
}
module.exports = islogin