const dashboardsession = require('../../controller/admin/dashboardheader')

exports.sendsms = async (req, res) => {
    const _id = req.session.user._id;
    const loggedinuser = await dashboardsession.signedInUser(_id);
    const systemInfo = await dashboardsession.getSysInfo();
    res.render('admin/dashboard/communication/sendsms', {
        pageTitle: "Send Sms",
        pageName: '',
        userSession: loggedinuser,
        systemInfo: systemInfo
    })
}