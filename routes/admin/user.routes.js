const express = require('express');
const router = express.Router();
const userController = require('../../controller/admin/user.controller')
const is_auth = require('../../middleware/is_auth');
const { body, check } = require('express-validator');
const User = require('../../model/admin/adminUser.model');
const account_control = require('../../middleware/account_control')
const { validation } = require('../../middleware/validation')

router.get("/", is_auth, userController.create_user_account)
router.post("/add_user",
    body("fname").custom((value) => {
        if (value === "") throw new Error("This field is require");
        return true
    }),
    body("mname").trim(),
    body("lname").custom((value) => {
        if (value === "") throw new Error("This field is require!");
        return true
    }),
    body("username").custom(async (value) => {
        if (value === "") return Promise.reject("Username is require")
        const user = await User.findOne({ username: value })
        if (user) return Promise.reject("Email already exist try another one")
        return true
    }),
    body("role").custom((value) => {
        if (value === "") throw new Error("This field is require!");
        return true
    }),
    body("pho").custom((value) => {
        if (value === "") throw new Error("This field is require!");
        return true
    }),
    is_auth, validation, userController.addUser);

router.get("/view_users", is_auth, userController.all_user);
router.get("/get_users", is_auth, userController.get_get_users);
router.get("/view_user_profile/:id", is_auth, userController.view_user_profile);
router.get("/suspend_account/:id", is_auth, account_control.account_status("suspended"));
router.get("/activate_account/:id", is_auth, account_control.account_status("active"));
router.get("/deactivate_account/:id", is_auth, account_control.account_status("inactive"));
router.get("/delete_user_account/:id", is_auth, userController.delete_user_account);
router.get("/edit_user_account/:id", is_auth, userController.edit_user_account);

router.post("/update_user_account", is_auth,
    body("fname").blacklist('\\[\\]').trim().isEmpty().withMessage("First name field can't be emapty"),
    body("mname").blacklist('\\[\\]').trim().isEmpty().withMessage("Middle name field can't be emapty"),
    body("lname").blacklist('\\[\\]').trim().isEmpty().withMessage("Last name field can't be emapty"),
    body("username").trim().isEmail().withMessage("Please enter a valid email address"),
    body("phone").trim().isEmpty().withMessage("Please enter a valid phone"),
    body("address").trim().isEmpty().withMessage("Please enter your address"),
    userController.update_user_account);
router.get("/user_header_info", is_auth, userController.user_header_info);

router.post("/reset_user_password",
    body('newpwd')
        .isLength({ min: 5 })
        .withMessage("password must be greater then 5 char")
        .trim(),
    body('confirmPwd')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.newpwd) {
                throw new Error('Passwords have to match.');
            }
            return true;
        }),
    is_auth, userController.reset_user_password);

module.exports = router