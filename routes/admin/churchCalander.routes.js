const express = require("express");
const router = express.Router();
const calander = require("../../controller/admin/churchCalander.controller");
const { check } = require('express-validator');
const { validation } = require("../../middleware/validation");
const Dailyactivites = require("../../model/admin/dailyActivities.model");
const UpcomingEvent = require("../../model/admin/upcomingEvent.model");

router.get("/daily_activities", calander.dailyactivites);
router.get("/upcomingevent" , calander.upcomingEvent);
router.post("/add_activities",
    check('day').custom(async (value) => {
        if (!value) return Promise.reject("Please select a day");
        const day = await Dailyactivites.findOne({ day: value });
        if (day) return Promise.reject("Activities already exist");
        return true;
    }), validation ,calander.addActivity);
router.post("/add_more_activity", calander.addMoreActivity);
router.post("/edit_activity", calander.editactivity);
router.post("/update_activities", calander.updateActivity);
router.post("/remove_activity", calander.removeActivity);
router.post("/addEvent",
    check('title').custom(async (value) => {
        if (value === "") return Promise.reject("Title is required");
        const title = await UpcomingEvent.findOne({title: value });
        if (title) return Promise.reject("Title already exist");
        return true;
    }),
    check('startdate').custom(async (value) => {
        if (value === "") return Promise.reject("Start Date is required");
    }),
    check('enddate').custom(async (value) => {
        if (value === "") return Promise.reject("End Date is required");
    }),
 validation , calander.addEvents);
router.get("/editevent/:id" , calander.editEvent);
router.post("/update_event" ,
    check('title').custom(async (value) => {
        if (value === "") return Promise.reject("Title is required");
        return true;
    }),
validation , calander.updateEvent);
router.get("/delete_event/:id" , calander.deleteEvent);
router.get("/get_event" , calander.getEvents);
module.exports = router;