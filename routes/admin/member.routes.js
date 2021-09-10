const express = require('express');
const router = express.Router();
const is_auth = require('../../middleware/is_auth');
const member = require('../../controller/admin/member.controller');
const { body } = require('express-validator');
const { validation } = require('../../middleware/validation');

// **********
  //      @member routers (get,post)
// *******************
router.get('/search', is_auth, member.member_search); // get member details page
router.get('/list', is_auth, member.member_list); // get member details page
router.get('/add', is_auth, member.member_add);

// add visitors for demo 
router.post('/visitor', is_auth, member.add_visitor);

router.post('/save_member', is_auth,
    body('first_name').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('last_name').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('place_of_birth').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('nationality').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('occupation').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('gender').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('mstatus').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('phone1').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('phone2').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('birthdate').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('address').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).trim(),
    body('email').custom(value = () => {
        if (value === "") return Promise.reject("This field is require")
        return true
    }).isEmail().trim(),
    validation, member.save_menber); // save member details
router.post('/search_member', is_auth, member.search_member); // search member by name , number etc...
router.post('/get_members_by_dept' , member.get_members_by_dept),
router.get('/search_member_info' , is_auth, member.search_member_info);
router.get('/get_members' , is_auth, member.get_members),
router.get('/view_details/:id', is_auth, member.get_member_by_id('member_profile')); // view single member details
router.get('/:id', is_auth, member.get_member_by_id('register_member')); // edit single member profile

router.post('/update_member_profile' ,is_auth,
body('first_name').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('last_name').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('place_of_birth').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('nationality').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('occupation').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('gender').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('mstatus').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('phone1').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('phone2').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('birthdate').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('address').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).trim(),
body('email').custom(value = () => {
    if (value === "") return Promise.reject("This field is require")
    return true
}).isEmail().toLowerCase().trim(),
validation, member.update_member_profile) // update member profile details 
module.exports = router