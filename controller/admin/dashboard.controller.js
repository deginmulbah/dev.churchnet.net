// =========================
//   api form dashbaord data
// ==========================
const User = require('../../model/admin/adminUser.model');
const Church_setup = require('../../model/admin/generalSetup.model');
const Member = require("../../model/admin/member.model");
const Visitors = require("../../model/admin/visitor.model")
// 
exports.signedInUser = async (req, res) => {
     const _id = req.session.user._id;
     try {
          const info = await User.findById({ _id: _id }, { role: 1, fname: 1, mname: 1, lname: 1, avater: 1, _id: 0 });
          if (info) res.json(info);
     } catch (error) {
           res.json({error:"true" , success:"false" , msg:error});
     }
}
// get all sys settings
exports.getSysInfo = async (req , res) => { 
     try{ 
          const settings = await Church_setup.findOne(
               {is_inserted:true},
               {primary_account:0,secondary_account:0 ,_id:0,is_inserted:0});
          if(settings) res.json(settings);
     } catch (error){ 
          res.json({error:"true" , success:"false" , msg:error});
     }
}
exports.getVisitorsPermonth = async (req , res) => { 
     try{ 
         const data = await Visitors.aggregate([
            { $group: { _id:{ $dateToString: { format: "%m", date: "$visit_date"} }, count: { $sum: 1 } } },
            { $sort: { _id: 1} }
          ]);
         res.json(data);
     } catch (error) { 
         console.log(error )
     }
}