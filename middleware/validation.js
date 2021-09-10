const { validationResult } = require('express-validator');

exports.validation = (req, res , next) => { 
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const field = error.array()[0].param
        const errmsg = error.array()[0].msg
        return res.json({ field: field, msginfo: errmsg })
    };
    next()
}