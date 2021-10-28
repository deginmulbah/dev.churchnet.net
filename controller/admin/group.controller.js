const Group = require('../../model/admin/group.model');
const Member = require('../../model/admin/member.model');
const mongoose = require('mongoose');
const dashboardsession = require('../../controller/admin/dashboardheader');

// *** add group page
exports.addGroup = async (req, res) => {
    try{ 
        const _id = req.session.user._id;
        // get session info
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        res.render('admin/dashboard/group/add_group', {
            pageTitle: "Add Group",
            pageName: 'add_dept',
            userSession: loggedinuser,
            systemInfo: systemInfo
        })
    } catch (error) { 
        res.json({error:"true" , success:"false",msg:error})
    }
};
exports.groupList = async (req , res) => {
    try{ 
        const _id = req.session.user._id;
        // get session info
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        res.render('admin/dashboard/group/groups_list', {
            pageTitle: "List Group",
            pageName: 'list_group',
            userSession: loggedinuser,
            systemInfo: systemInfo
        })
    } catch (error) { 
        res.json({error:"true" , success:"false",msg:error})
    }
}
//** save/update group
exports.saveGroup = async (req, res) => {
    const group_id = req.body.group_id;
    try{  
       const group_details = { 
        group_name: req.body.groupname,
        group_desc: req.body.groupdesc,
        meeting_days: req.body.meetingdays,
        meeting_time: req.body.meetingtime}
       // update group
       if(group_id){
           if (group_details.meeting_days) { // add  meeting date
               const saved = await Group.updateOne(
                 {_id:group_id},
                 {$push:{meeting_days:group_details.meeting_days}}
                )
            };
           const {meeting_days,...newDetails} = group_details;
           const saved = await Group.updateOne({_id:group_id},newDetails);

           if(saved){ 
            req.flash("success" ,"Group Details Updated");
             res.redirect(`/admin/group/group_details/${group_id}`);
           }
       } else { 
           const saved = await Group.create(group_details);
           if(saved) return res.json({info:{status: 'success', msg: 'Group added successfully'}});
       }
    } catch(error) { 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// *** get group
exports.getGroups = async (req,res) => { 
    try{ 
        const data = await Group.find({},{_id:1,group_name:1,created_at:1});
        if (data) return res.status(200).json({data});
    } catch(error) { 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
};
// group details (members,leaders) 
exports.getGroupDetails = async (req , res) => {  
    try{
         const _id = req.session.user._id;
        // get session info
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        const group_id = mongoose.Types.ObjectId(req.params.id);
        // get group members
        const group_member = await Member.find({groups:group_id});
        // get group info
        const group_detail = await Group.aggregate([
            {$match: { _id:group_id }},
            {
                $lookup:{
                    from:"members",
                    localField:"group_leaders",
                    foreignField:"_id",
                    as:"leaders"
            }},
            {
                $project:{
                    _id:1,
                    group_name:1,
                    group_desc:1,
                    meeting_days:1,
                    meeting_time:1,
                    created_at:1,
                    "leaders._id":1,
                    "leaders.firstname":1,
                    "leaders.middlename":1,
                    "leaders.lastname":1,
                }
            }
        ]);
        let group_info;
        group_detail.forEach(element => {
            group_info = element
        });
        res.render('admin/dashboard/group/group_details', {
            pageTitle: "Group Details",
            pageName: 'group_details',
            members:group_member, // group members
            info:group_info , // group infomation
            userSession: loggedinuser,
            systemInfo: systemInfo,
        })
    } catch (error) { 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
};
// 
exports.getGroupMember = async (req,res) => { 
    try{
        const group_id = mongoose.Types.ObjectId(req.body.group_id);
        const data = await Member.find({groups:group_id});
        if(data) res.status(200).json({data});
    } catch (error) { 
        res.status(500).json({error:"true", success:"false", msg:error})
    }
}
// Remove group leader
exports.removeGroupLeader = async (req, res) => { 
    try{
        const leader_id = req.body.id;
        const group_id = req.body.group; 
        const removed = await Group.updateOne(
            {_id:group_id},
            {$pull:{group_leaders:leader_id}}
        );
         if(removed) res.status(200).json({success:"true" , error:"false", msg:"Group leader removed"})
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// add group leaders
exports.addGroupLeaders = async (req, res) => { 
    try{
        const leaders = req.body.leaders;
        const group_id = req.body.group_id; 
        const removed = await Group.updateOne(
            {_id:group_id},
            {$push:{group_leaders:leaders}}
        );
         if(removed) res.redirect(`/admin/group/group_details/${group_id}`)
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// Remove group meeting day
exports.removeGroupMeetingDay = async (req, res) => { 
    try{
        const meeting_day = req.body.day;
        const group_id = req.body.group; 
        const removed = await Group.updateOne(
            {_id:group_id},
            {$pull:{meeting_days:meeting_day}}
        );
        if(removed) res.status(200).json({success:"true",error:"false",msg:"Meeting day removed"})
    } catch (error){ 
        res.status(500).json({success:"false",error:"ture",msg:error});
    }
}
// add group members
exports.addGroupMember = async (req, res) => { 
    try{ 
        const group = req.body.group_id;
        const group_members = req.body.members;
        // map array of ids to mongodb objectId
        const new_member = [];
        group_members.map((ele,i) => { 
            new_member.push(mongoose.Types.ObjectId(ele))
        });
        const updated = await Member.updateMany(
            {_id:{$in:new_member}},
            {$push:{groups:group}});
       if(updated){
            req.flash("success",`${updated.nModified} Members added`);
            res.redirect(`/admin/group/group_details/${group}`);
       }
    } catch(error){ 
        res.json({error:"true" , success:"false", msg:error});
    }
}
// search group
exports.search_qurey = async (req, res) => {
    try {
        const regExp = new RegExp(req.query.q,'i')
        const data = await Group.find({ 
            group_name: regExp }, { group_name:1});
        if (data) {
            return res.status(200).json({data})
        }
    } catch (error) {
     res.status(500).json({success:"false",error:"ture",msg:error});
    }
}
// delete group
exports.deleteGroup = async (req , res ) => { 
    try {
        const id = req.params.id;
        const deleted = await Group.deleteOne({_id:id});
        if (deleted) {
            const removed = await Member.updateMany(
                {$pull:{groups:id}}
            );
            if(removed){ 
                res.redirect("/admin/group/list")
            }
        }
    } catch (error) {
        console.log(error)
    }
}
// remove member from group
exports.remove_group_member = async (req, res) => { 
    try{
        const member_id = req.body.id;
        const group_id = req.body.group; 
        const removed = await Member.update(
            {_id:member_id},
            {$pull:{groups:group_id}}
        );
        if(removed) res.status(200).json({success:"true" , error:"false", msg:"Group member Remove"})
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}