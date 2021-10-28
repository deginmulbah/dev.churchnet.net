const dashboardsession = require('../../controller/admin/dashboardheader');
const Dailyactivites = require('../../model/admin/dailyActivities.model');
const UpcomingEvent = require("../../model/admin/upcomingEvent.model");
const moment = require("moment");
// Daily activities
exports.dailyactivites = async (req, res) => {
    try {
        const _id = req.session.user._id;
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        // get all activity
        const data = await Dailyactivites.find({}).sort({ created_at: 1 });
        res.render("admin/dashboard/churchCalander/dailyactivities", {
            pageTitle: "Weekly Activities",
            pageName: "dailyactivities",
            userSession: loggedinuser,
            systemInfo: systemInfo,
            activityinfo: data,
            moment: moment
        })
    } catch (error) {
        console.log(error)
    }
};
exports.upcomingEvent = async (req, res) => {
    try {
        const _id = req.session.user._id;
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        // get all events
        const events = await UpcomingEvent.find({}).sort({ "created_at": -1 });
        res.render("admin/dashboard/churchCalander/upcomingevent", {
            pageTitle: "Upcoming Event",
            pageName: "upcomingEvent",
            userSession: loggedinuser,
            systemInfo: systemInfo,
            event: events,
            moment: moment
        })
    } catch (error) {
        console.log(error);
    }
}
// add daily activity
exports.addActivity = async (req, res) => {
    try {
        // get array of activities
        const id = req.body.id;
        const names = req.body.name.filter(n => n); // remove empty value form array
        const starts = req.body.start;
        const ends = req.body.end;
        const activitiesObj = names.map((ele, i) => {  // create objects
            return {
                name: names[i],
                start: starts[i],
                end: ends[i]
            }
        });
        const activities = {
            day: req.body.day,
            activities: activitiesObj,
        };
        const saved = await Dailyactivites.create(activities);
        if (saved) {
            res.json({ success: "true", error: "false", msg: "Record saved successfully" });
        }
    } catch (error) {
        console.log(error)
    }
}
// add more record to day
exports.addMoreActivity = async (req, res) => {
    try {
        const id = req.body.id;
        const names = req.body.name;
        const starts = req.body.start;
        const ends = req.body.end;
        const activitiesObj = names.map((ele, i) => {
            return {
                name: names[i],
                start: starts[i],
                end: ends[i]
            }
        });
        const added = await Dailyactivites.updateOne({ _id: id }, { $push: { activities: activitiesObj } });
        if (added) {
            req.flash("success", "Activity Added");
            res.redirect("/admin/calander/daily_activities");
        }
    } catch (error) {
        console.log(error);
    }
}
// get activity 
exports.editactivity = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await Dailyactivites.findOne({ _id: id });
        if (data) res.json(data);
    } catch (error) {
        console.log(error)
    }
}
// delete daily activity
exports.removeActivity = async (req, res) => {
    try {
        const id = req.body.id;
        const removed = await Dailyactivites.deleteOne({ _id: id });
        if (removed) res.json({ success: "true", error: "false", msg: "Record Delete" })
    } catch (error) {
        console.log(error)
    }
};
// update activity
exports.updateActivity = async (req, res) => {
    try {
        const id = req.body.id;
        const names = req.body.name.filter(n => n);
        const starts = req.body.start;
        const ends = req.body.end;
        const activitiesObj = names.map((ele, i) => {  // create objects
            return {
                name: names[i],
                start: starts[i],
                end: ends[i]
            }
        });
        const activities = {
            day: req.body.day,
            activities: activitiesObj,
        };
        const updated = await Dailyactivites.updateOne({ _id: id }, activities);
        if (updated) {
            req.flash("success", "Changes Saved");
            res.redirect("/admin/calander/daily_activities");
        }
    } catch (error) {
        console.log(error)
    }
}
// add upcoming event 
exports.addEvents = async (req, res) => {
    try {
        const events = {
            title: req.body.title,
            startDate: req.body.startdate,
            endDate: req.body.enddate,
            eventdesc: req.body.eventdesc,
            reminder: req.body.reminder
        };
        const saved = await UpcomingEvent.create(events);
        if (saved) {
            res.json({ success: "true", error: "false", msg: "Record saved successfully" });
        }
    } catch (error) {
        console.log(error);
    }
}
// edit upcoming event
exports.editEvent = async (req, res) => {
    try {
        const _id = req.session.user._id;
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        // get all events
        const events = await UpcomingEvent.find({}).sort({ "created_at": -1 });
        // get event by id
        const id = req.params.id;
        const event = await UpcomingEvent.findOne({ _id: id });
        res.render("admin/dashboard/churchCalander/editevent", {
            pageTitle: "Edit Event",
            pageName: "editevent",
            userSession: loggedinuser,
            systemInfo: systemInfo,
            events: events,
            event: event,
            moment: moment
        })
    } catch (error) {
        console.log(error)
    }
}
exports.updateEvent = async (req, res) => {
    try {
        const id = req.body.id;
        const events = {
            title: req.body.title,
            startDate: req.body.startdate,
            endDate: req.body.enddate,
            eventdesc: req.body.eventdesc,
            reminder: req.body.reminder
        };
        const saved = await UpcomingEvent.updateOne({ _id: id }, events);
        if (saved) {
            res.redirect("/admin/calander/upcomingevent");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await UpcomingEvent.deleteOne({ _id: id });
        if (deleted) {
            res.redirect('/admin/calander/upcomingevent')
        }
    } catch (error) {
        console.log(error)
    }
}
exports.getEvents = async (req, res) => {
    try {
        const events = await UpcomingEvent.find({}, { _id: 0, reminder: 0, created_at: 0 }).sort({ created_at: 1 });
        if (events) {
            res.json(events)
        }
    } catch (error) {
        console.log(error)
    }
}