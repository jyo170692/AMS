const BidModel = require('../Models/bidInsert')
const PriceModel=require('../Models/price');
const RegistrationModel = require('../Models/registration');
class AdminController
{
    
  //Admin Home Page
  static Home = async(req,res)=>
  {
    
    
    try 
    {
      const data = await BidModel.find().sort({_id:-1}) 
      res.render('Home',{data:data,message:req.flash('error')})
    }
     catch (error) 
    {
      console.log(error)
    }
  }

  //Admin Dashboard
  static Dashboard = async(req,res)=>
    {
      
      
      try 
      {
        const {name,role} = req.data
        // console.log(role)
        const data = await BidModel.find() 
        res.render('admin/dashboard',{role:role,data:data,t:name,message:req.flash('error')})
      }
       catch (error) 
      {
        console.log(error)
      }
    }
   
    //Bid Method
    static bid = async (req, res) => {
      const{role,name} = req.data
      try {
        res.render("admin/bid", {t:name,role:role, message: req.flash("error") });
      } catch (error) {
        console.log(error);
      }
    };

    //Bid Insert Method
    static Bidinsert = async (req, res) => {
      // console.log(req.body)
      const { item_name, start_time, end_time, start_price,} = req.body;
      try {
        const result = new BidModel({
          item_name: item_name,
          start_time: start_time,
          end_time: end_time,
          start_price: start_price,
        });
  
        await result.save(); //save data in db
        req.flash('success','Data Enter Successfully')
        res.redirect('/biddata/display')
      } catch (error) {
        console.log(error);
      }
    };
    
    //Bid Display Method
    static biddisplay = async (req, res) => {
      const{role,name} = req.data
      try 
      {
        const data = await BidModel.find().sort({_id:-1})
        const p = await PriceModel.find()
        
         if(p!=null)
         {
          const lastValue = await PriceModel.findOne().sort({_id: -1})
          // console.log(lastValue)
          if(lastValue!=null)
            {
              const winner = await RegistrationModel.findById(lastValue.user_id)
              // console.log(winner)
              res.render("admin/biddisplay", {winner:winner,lastValue:lastValue,data:data,t:name,role:role, message: req.flash("error") });
            }
         }
          else
          {
            let winner ="not any user interested";
            let lastValue ="not any user interested";
            res.render("admin/biddisplay", {winner:winner,lastValue:lastValue,data:data,t:name,role:role, message: req.flash("error") });
          }
      
        
      } catch (error) 
      {
        console.log(error);
      }
    };

    //Bid Edit Method
    static edit = async (req, res) => {
      const{role,name} = req.data
      const data = await BidModel.findById(req.params.id)
      // console.log(data)
      try {
        res.render("admin/bidedit", {d:data,t:name,role:role, message: req.flash("error") });
      } catch (error) {
        console.log(error);
      }
    };

    //Bid Update Method
    static update = async(req,res)=>
      {
        try
          {
              const { item_name, start_time, end_time, start_price,winner,status} = req.body;
              const update =await BidModel.findByIdAndUpdate(req.params.id,
              {
                  item_name: item_name,
                  start_time: start_time,
                  end_time: end_time,
                  start_price: start_price,
                  winner:winner,
                  status:status,
                  
              })
         
              req.flash('success','Update successfully')
              await update.save()
              res.redirect('/biddata/display') 
          } 
        catch (error) 
        {
          console.log(error)
        
        }
      }

      //Bid Delete Method
      static delete = async(req,res)=>
        {
            try 
            {
               await BidModel.findByIdAndDelete(req.params.id)
               req.flash('success','delete successfully')
                res.redirect('/biddata/display')
            } 
            catch (error) 
            {
                console.log(error)
            }
        }
    static close =async(req,res)=>
    {
   
      try
      {
          const { item_name, start_time, end_time, start_price,winner,status} = req.body;
          const update =await BidModel.findByIdAndUpdate(req.params.id,
          {
              item_name: item_name,
              start_time: start_time,
              end_time: end_time,
              start_price: start_price,
              status:status,
              winner:winner,
          })
     
          req.flash('success','Update successfully')
          await update.save()
          res.redirect('/biddata/display') 
      } 
    catch (error) 
    {
      console.log(error)
    
    }
    }
   
    
                
  
}

  

module.exports = AdminController
