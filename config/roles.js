const AccessControl = require('accesscontrol');

let grantsObject = {
    superadmin:{
        user:{
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        church_Info:{ 
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']  
        }
    },
}


const roles = new AccessControl(grantsObject);

module.exports = { roles }