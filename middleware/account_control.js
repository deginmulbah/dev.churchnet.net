const User = require('../model/admin/adminUser.model');
exports.account_status = (status) => {
    return async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await User.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        status: status
                    }
                }
            );
            if (user) {
                req.flash('success', `${user.fname} account has been ${status}`);
                res.redirect('/admin/user/view_users')
                next()
            }
            req.flash('error', 'error');
            res.redirect('/admin/user/view_users')
            next()
        } catch (error) {
            console.log(error)
        }
    }
}