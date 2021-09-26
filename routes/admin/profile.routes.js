const express = require('express');
const router = express.Router();
const profileController = require('../../controller/admin/profile.controller');
const is_auth = require('../../middleware/is_auth');
const { body } = require('express-validator');

router.get("/profile_detail", is_auth, profileController.getProfile);
router.get("/edit_profile", is_auth, profileController.getEditprofile);
router.post("/update_profile",
    body("fname").trim(),
    body("mname").trim(),
    body("lname").trim(),
    body("address").trim(),
    body("bio").trim(),
    body("phone").trim(),
    body("username").isEmail().withMessage("Please input a valid email address"),
    is_auth, profileController.updateUserProfile);
    router.post("/update_profile_pic", is_auth, profileController.update_profile_pic);
//==============Reset admin Password ==================
router.post("/resetpwd",
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
    is_auth, profileController.restPassword);
    
module.exports = router