const { roles } = require('../config/roles');

exports.grantAccess = (action, resource) =>{
    return async (req,res,next) =>{
        try{
            const permission = roles.can(req.session.user.role)[action](resource);
            if(!permission.granted){
                return res.status(403).send("access denial");
            }
            res.locals.permission = permission;
            next()
        } catch(error){
            next(error)
        }
    }
}