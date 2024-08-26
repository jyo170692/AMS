const RegistrationModel = require("../Models/registration");
const bcrypt = require("bcrypt");
const auth = require('../Middleware/auth')
const jwt = require("jsonwebtoken");
class RegistrationController
 {
  static registration = async(req,res)=>
    {
      let name; 
        try 
         {
           res.render('registration',{t:name,message:req.flash('error')})
         } 
         catch (error) 
         {
            
            console.log(error)
        }
    }
    
  //Registration Method
  static insert = async (req, res) => 
    {
        const { name, email, password, confirm_password, phone, address } = req.body;

        //Check All fields fill
              if (name && email && password && confirm_password && phone && address) 
                {
                  //Verify Enter email does'nt exit 
                    const checkEmail = await RegistrationModel.findOne({ email: email });
                      if (checkEmail) 
                        {
                          req.flash('error','Email already exit')
                          res.redirect('/registration')
                        }
                      else 
                        {
                          //check password and confirm password are match
                           if (password == confirm_password) 
                            {
                               try 
                                 {
                                   const hashpassword = await bcrypt.hash(password, 10);  //bcrypt password
                                   const hashconfirm_password = await bcrypt.hash(confirm_password, 10);
                                       const user = new RegistrationModel({
                                       name: name,
                                       email: email,
                                       password: hashpassword,
                                       confirm_password: hashconfirm_password,
                                       phone: phone,
                                       address:address
                                     });
                                       await user.save();         // save data into database
                                       req.flash('success','Registration successfully! Plz Login Here')
                                       res.redirect('/login')
                                       
                                   }                            
                                 catch (error) 
                                 {
                                    console.log(error);
                                 }
                             } 
                             else 
                             {
                              req.flash('error','Password and Confirm_passsword not match.')
                              res.redirect('/registration')
                             }
                         }
                 } 
                 else 
                 {
                    req.flash('error','All field are required.')
                    res.redirect('/registration')
                 }
  };

  static login = async(req,res)=>
    {
      let name; 
      // console.log(name)
        try 
         {
           res.render('login',{t:name,message:req.flash('error')})
         } 
         catch (error) 
         {
            
            console.log(error)
        }
    }

  //Login verify Method
    static loginVerify=async(req,res)=>
    {
        try 
        {
            // console.log(req.body)
            const {email,password}=req.body
       
            // console.log(user)
    if(email && password)
        {
            const user = await RegistrationModel.findOne({email:email})
            console.log(user)
                  if(user != null)
                      {
                        const ismatch = await bcrypt.compare(password,user.password)
                         if(ismatch)
                         {
                            //generate token
                            const token = jwt.sign({ ID: user._id }, 'auc@1706');
                            // console.log(token)
                            res.cookie('token',token)
                            if(user.role=="user")
                            {
                             res.redirect('/userdashboard')
                            }
                            else
                            {
                              res.redirect('/biddata/display')
                            }
                         }
                         else
                          {
                            req.flash('success','Email and password not valid')
                            res.redirect('/login')
                          }
                        
                       
                            
                      }
            
        
                 else
                 {
                    req.flash('success','User not Registor')
                    res.redirect('/login')
                 }
        }
        else
        {
                req.flash('success','All Fileds are required')
                res.redirect('/login')
        }
}
        
        catch (error)
        {
            console.log(error)
        }
    }

  //logout method
  static logout =async(req,res)=>
    {
        try 
        {
            res.clearCookie('token')
            res.redirect('/')
        } 
        catch (error) 
        {
            console.log(error)
        }
    }
}

module.exports = RegistrationController;
