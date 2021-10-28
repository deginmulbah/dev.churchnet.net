const User = require('../../model/admin/adminUser.model');
const Church_setup = require('../../model/admin/generalSetup.model');
// 
exports.signedInUser = async (user_id) => {
     try {
          const info = await User.findById({ _id: user_id }, { role: 1, fname: 1, mname: 1, lname: 1, avater: 1, _id: 0 });
          return info;
     } catch (error) {
          return error;
     }
}
// get all sys settings
exports.getSysInfo = async () => { 
     try{ 
          const settings = await Church_setup.findOne(
               {is_inserted:true},
               {primary_account:0,secondary_account:0 ,_id:0,is_inserted:0});
          return settings;
     } catch (error){ 
         return error;
     }
}