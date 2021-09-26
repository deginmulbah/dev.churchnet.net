const Campaign = require("../../model/admin/fundraising.model");
const moment = require("moment");
const { validationResult } = require('express-validator');

// 
exports.add_fund = async (req, res) => {
     res.render('admin/dashboard/fundraise/add_fund', {
          pageTitle: "Add Fund",
          pageName: "add_fund",
     })
}
// 
exports.fund_campaign = async (req, res) => {
     try{ 
          // get campaigns
          const campaigns = await Campaign.find({}).sort({created_at:1});
          res.render('admin/dashboard/fundraise/fund_category', {
               pageTitle: "Fundraising Category",
               pageName: "fund_category",
               campaign:campaigns,
               moment:moment
          })
     } catch(error){ 
          res.json({error:"true", success:"false",msg:error})
     }
}
// 
exports.multiple_giving = async (req, res) => {
     res.render('admin/dashboard/givings/bulk_giving', {
          pageTitle: "Bulk Input",
          pageName: "bulk_giving",
     })
}
// 
exports.add_campaign = async (req , res) => { 
     try{ 
          const error = validationResult(req);
          if (!error.isEmpty()) {
               const field = error.array()[0].param
               const errmsg = error.array()[0].msg
               req.flash("error",field);
               res.redirect("/admin/fundraising/category");
          }
          const details = { 
               title: req.body.title,
               amount: req.body.amount,
               state: req.body.startdate,
               end: req.body.enddate,
               desc: req.body.desc
          };
          const save = await Campaign.create(details);
          if(save) {
               req.flash("success","Campaign created successfully");
               res.redirect("/admin/fundraising/category");
          }
     } catch (error){ 
          res.json({error:true, success:false, msg:error});
     }
}