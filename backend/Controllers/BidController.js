const BidModel = require("../Models/bidInsert");
const auth = require("../Middleware/auth");
const PriceModel = require("../Models/price");

class BidController {
  

  static UserDashboard = async (req, res) => {
    const { name,role} = req.data;

    console.log(role)
    const data = await BidModel.find() 
    try {
      res.render("UserDashboard", { role:role,data:data,t: name, message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static Price = async (req, res) => {
    const { name,role,_id} = req.data;
    // console.log(_id)
    
    try {
      const data = await BidModel.findById(req.params.id);
      const price = await PriceModel.find().sort({_id: -1 })
      const lastValue = await PriceModel.findOne().sort({_id: -1 })
      
      res.render("PriceEnter", {
        lastValue:lastValue,
        id:_id,
        p: price,
        role:role,
        d: data,
        t: name,
        message: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static PriceEnter = async (req, res) => {
    const { price, name ,user_id } = req.body;
    const id = req.params.id;

    const lastValue = await PriceModel.findOne({name:name}).sort({_id: -1 }).limit(1)
   if(lastValue!=null)
   {
    if(price<=lastValue.price)
      
    {
      req.flash("error", `Plz Enter value more to  ${lastValue.price}.`);
      res.redirect(`/price/${id}`);
    }
    else
    {
    if (price) {
      try {
        const p = new PriceModel({
          name: name,
          price: price,
          user_id:user_id,
        });
        await p.save(); // save data into database
        req.flash("success", "Done");
        res.redirect(`/price/${id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      req.flash("error", "All field are required.");
      res.redirect(`/price/${id}`);
    }
  }
 
  }
  else
  {
    if (price) {
      try {
        const p = new PriceModel({
          name: name,
          price: price,
          user_id:user_id,
        });
        await p.save(); // save data into database
        req.flash("success", "Done");
        res.redirect(`/price/${id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      req.flash("error", "All field are required.");
      res.redirect(`/price/${id}`);
    }
  }
  };
}

module.exports = BidController;

