const Member = require("../../model/admin/member.model");
const Group = require("../../model/admin/group.model");
const Giving = require("../../model/admin/member_giving.model")
exports.getDashboard = async (req, res) => {
     // members
     const totalmember = await Member.countDocuments();
     const totalfemale = await Member.countDocuments({gender:"female"});
     const totalmale = await Member.countDocuments({gender:"male"});
     const memberStats = { 
               members:totalmember,
               female:totalfemale,
               male:totalmale
          };
     // group
     const totalGroup = await Group.countDocuments();
     res.render('admin/dashboard/index', {
          pageTitle: "Dashboard",
          pageName: "index",
          memberStats:memberStats,
          group:totalGroup
     })
}