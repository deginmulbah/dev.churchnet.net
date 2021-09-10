
exports.getDashboard = (req, res) => {
     res.render('admin/dashboard/index', {
          pageTitle: "Dashboard",
          pageName: "index",
          userInfo: {
               username: req.session.user.username,
               role: req.session.user.role,
               fname: req.session.user.fname,
               lname: req.session.user.lname,
               avater: req.session.user.avater
          }
     })
}