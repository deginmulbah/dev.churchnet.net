const Group = require('../../model/admin/group.model');
const Member = require('../../model/admin/member.model');
const mongoose = require('mongoose')
// *** add group page
exports.add_group = async (req, res) => {
    res.render('admin/dashboard/group/add_group', {
        pageTitle: "Add Group",
        pageName: 'add_dept'
    })
};
exports.group_list = async (req , res) => {
   res.render('admin/dashboard/group/groups_list', {
        pageTitle: "List Group",
        pageName: 'list_group'
    })
}
//** save group
exports.save_group = async (req, res) => {
    try{ 
       const group_details = { 
        group_name: req.body.groupname,
        group_desc: req.body.groupdesc,
        group_leaders: req.body.groupleaders,
        meeting_days: req.body.meetingdays,
        meeting_time: req.body.meetingtime,
       }
       const saved = await Group.create(group_details);
       if(saved){ 
        return res.json({info:{status: 'success', msg: 'Group added successfully'}});
       }
    } catch(error) { 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// *** get group
exports.get_groups = async (req,res) => { 
    try{ 
        const data  = await Group.aggregate([
            // {$match: {members:{}}}, // match member id
             {$lookup:{ 
                    from:"members",
                    localField:"group_leaders",
                    foreignField: '_id',
                    as: 'leaders'
                }},
             {$project:{ 
                    group_name:1,
                    'leaders._id':1,
                    'leaders.firstname':1,
                    'leaders.middlename':1,
                    'leaders.lastname':1,
            }}
        ]);
        if (data) {
            return res.status(200).json({ data })
        }
    } catch(error) { 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
};
//group details (members,leaders)
exports.get_group_details = async (req , res) => { 
    try{
        const group_id = mongoose.Types.ObjectId(req.params.id);
        const group_member = await Member.aggregate([  // get group members
            {$match: { groups:group_id }},
            {
                $lookup:{
                    from:"groups",
                    localField:"groups",
                    foreignField:"_id",
                    as:"group"
                }
            },
            {$unwind:"$group"},
            {
                $project:{ 
                    firstname:1,
                    middlename:1,
                    lastname:1,
                    gender:1,
                    initial:1,
                    "contact.primaryemail":1,
                    "contact.primarynumber":1,
                }
            }
        ]);
        // get group info
        const group_detail = await Group.aggregate([
            {$match: { _id:group_id }},
            {
                $lookup:{
                    from:"members",
                    localField:"group_leaders",
                    foreignField:"_id",
                    as:"leaders"
                }
            },
            {
                $project:{
                    group_name:1,
                    group_desc:1,
                    meeting_days:1,
                    meeting_time:1,
                    created_at:1,
                    "leaders.id":1,
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
            info:group_info  // group infomation
        })
    } catch (error) { 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
