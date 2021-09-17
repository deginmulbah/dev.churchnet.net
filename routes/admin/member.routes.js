const express = require('express');
const router = express.Router();
const is_auth = require('../../middleware/is_auth');
const member = require('../../controller/admin/member.controller');
const {body, check , checkSchema } = require('express-validator');
const { validation } = require('../../middleware/validation');
const upload = require('../../middleware/fileupload');
// ****************************
//      @member routes
// ****************************
router.get('/search', member.member_search);
router.get('/list',  member.member_list);
router.get('/add',  member.add_member);
// //**** save members
router.post('/save_member', upload.single('user_avater'),
check('fname').custom((value) => {
    if(value === "") return Promise.reject("First name is require");
    return true;
}),
check('lname').custom((value) => {
    if(value === "") return Promise.reject("Last name is require");
    return true;
}),
check('gender').custom((value) => {
    if(!value) return Promise.reject("Gender name is require");
    return true;
}),
check('dob').custom((value) => {
    if(value === "") return Promise.reject("Birthdate is require");
    return true;
}),
check('joindate').custom((value) => {
    if(value === "") return Promise.reject("Join date is require");
    return true;
}),
check('phone1').custom((value) => {
    if(value === "") return Promise.reject("Primary number is require");
    return true;
}),
check('primaryemail').custom((value) => {
    if(value === "") return Promise.reject("Primary email is require");
    return true;
}),
check('address').custom((value) => {
    if(value === "") return Promise.reject("Primary address is require");
    return true;
}),validation, member.save_member);
//**** update member profile
router.post('/update_member', is_auth, upload.single('user_avater'),
    check('fname').custom((value) => {
    if(value === "") return Promise.reject("First name is require");
    return true;
}),
check('lname').custom((value) => {
    if(value === "") return Promise.reject("Last name is require");
    return true;
}),
check('gender').custom((value) => {
    if(value === "") return Promise.reject("gender name is require");
    return true;
}),
check('dob').custom((value) => {
    if(value === "") return Promise.reject("Birthdate is require");
    return true;
}),
check('joindate').custom((value) => {
    if(value === "") return Promise.reject("Join date is require");
    return true;
}),
check('phone1').custom((value) => {
    if(value === "") return Promise.reject("Primary number is require");
    return true;
}),
check('primaryemail').custom((value) => {
    if(value === "") return Promise.reject("Primary email is require");
    return true;
}),
check('address').custom((value) => {
    if(value === "") return Promise.reject("Primary address is require");
    return true;
}),
validation,member.save_member);
// // get members
router.get('/get_members' , member.get_members);
// // search member by name , email and phone number
router.post('/search_member' , member.search_member);
// //member search query
 router.get('/search_query' , member.search_qurey);
// // member profile
router.get('/member_profile/:id' , member.member_profile);
module.exports = router;