const bidModel = require("../Models/bidInsert");
class UserController {
  
  static bidinsert = async (req, res) => {
    const { company_name, bid_time, bid_cost } = req.body;
    console.log(req.body);
    try {
      const bid = new bidModel({
        company_name: company_name,
        bid_time: bid_time,
        bid_cost: bid_cost,
      });
      await bid.save(); //save data in db
      res.status(201).json({ success: true, bid });
    } catch (error) {
      console.log(error);
    }
  };

  static biddisplay = async (req, res) => {
    try {
      const data = await bidModel.find().sort("bid_cost");
      //   console.log(data)
      res.status(201).json({ success: true, data });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;
