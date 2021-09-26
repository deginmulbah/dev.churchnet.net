const express = require('express');
const router = express.Router();
const is_auth = require('../../middleware/is_auth');
const member = require('../../controller/admin/member.controller');
const {body, check } = require('express-validator');
const { validation } = require('../../middleware/validation');
const upload = require('../../middleware/avater_upload');
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
    if(value === "") return Promise.reject("Cell Phone number is require");
    return true;
}),
check('primaryemail').custom((value) => {
    if(value === "") return Promise.reject("Personal email is require");
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
    if(value === "") return Promise.reject("Cell Phone number is require");
    return true;
}),
check('primaryemail').custom((value) => {
    if(value === "") return Promise.reject("Personal email is require");
    return true;
}),
check('address').custom((value) => {
    if(value === "") return Promise.reject("Home address is require");
    return true;
}),
validation,member.save_member);
// add member family 
router.post('/add_family', member.add_member_family);
// get members
router.get('/get_members' , member.get_members);
// search member by name , email and phone number
router.post('/search_member' , member.search_member);
// member search query
 router.get('/search_query' , member.search_qurey);
// member profile
router.get('/member_profile/:id' , member.member_profile);
// remove member from group
router.post("/add_member_group" , member.add_member_group);
// remove member from group
router.post("/remove_group" , member.remove_group);
// add member giving
router.post("/add_giving" ,
check('date').custom((value) => {
    let today = new Date();
    if(value === "") return Promise.reject("Date is require");
    return true;
}),
check('category').custom((value) => {
    if(value === "") return Promise.reject("Category is require");
    return true;
}),
check('amount').custom((value) => {
    if(value === "") return Promise.reject("Amount is require");
    if(value <= 0) return Promise.reject("Giving most be greater then $0");
    return true;
}),
validation,member.member_giving);
// update member giving
router.post("/update_giving" ,
check('category').custom((value) => {
    if(value === "") return Promise.reject("Category is require");
    return true;
}),
check('amount').custom((value) => {
    if(value === "") return Promise.reject("Amount is require");
    return true;
}),
check('date').custom((value) => {
    if(value === "") return Promise.reject("Date is require");
    return true;
}),
validation,member.member_giving);
// get member givings
router.post("/get_givings" , member.get_givings);
// get member giving
router.post("/get_giving" , member.get_giving);
// delete member giving
router.post("/delete_giving" , member.delete_giving);
// get totals
router.post("/get_total" , member.get_totals);
module.exports = router;