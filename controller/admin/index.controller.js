const Member = require("../../model/admin/member.model");
const Group = require("../../model/admin/group.model");
const Giving = require("../../model/admin/member_giving.model");
const dashboardsession = require('../../controller/admin/dashboardheader');
const Upcomingevent = require("../../model/admin/upcomingEvent.model");
//
exports.getDashboard = async (req, res) => {
     try {
          const _id = req.session.user._id;
          // members
          const totalmember = await Member.countDocuments();
          const totalfemale = await Member.countDocuments({ gender: "female" });
          const totalmale = await Member.countDocuments({ gender: "male" });
          const today = new Date().now;
          const event = await Upcomingevent.find({ startDate:today })
          const memberStats = {
               members: totalmember,
               female: totalfemale,
               male: totalmale
          };
          // get session info
          const loggedinuser = await dashboardsession.signedInUser(_id);
          const systemInfo = await dashboardsession.getSysInfo();
          // group
          const totalGroup = await Group.countDocuments();
          res.render('admin/dashboard/index', {
               pageTitle: "Dashboard",
               pageName: "index",
               memberStats: memberStats,
               group: totalGroup,
               userSession: loggedinuser,
               systemInfo: systemInfo,
               events: event
          })
     } catch (error) {
          console.log(error)
     }
}