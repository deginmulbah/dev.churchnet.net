const sms = require("../../config/sms-config");
const Group = require("../../model/admin/group.model");
const Member = require("../../model/admin/member.model");
const Visitor = require("../../model/admin/visitor.model");
const mongoose = require('mongoose')

exports.sendGroupsms = async (req ,res) => { 
	try {
        const group_id = mongoose.Types.ObjectId(req.body.group);
		const receiver = req.body.receiver;
		const msgBody = req.body.msg;
		const numbers = [];
		// send member
		if(receiver === "allmember"){ 
			const membernumber = await Member.find({groups:group_id},{"contact.primarynumber":1,_id:0});
			membernumber.forEach((item , i) => { 
				const phonnumber = item.contact.primarynumber;
				numbers.push(phonnumber);
			})
			const send  = await sms.smsNotify(numbers ,msgBody);
			if(send.isAxiosError){ 
				res.json({status:"error" ,msg:"Unable to send sms due to poor connection!!"});
			} else {
				res.json({status:"success" ,msg:"Message Sent"});
			}
		} else if(receiver === "leaders") { 
			const leadersnumber = await Group.aggregate([
			  {$match: { _id:group_id }},
			  {
                $lookup:{
                    from:"members",
                    localField:"group_leaders",
                    foreignField:"_id",
                    as:"leaders"
            	}},
            	{ 
            		$unwind:"$leaders"
            	},
            	{
            		$project:{
            	  	_id:0,
                    "leaders.contact.primarynumber":1,
                	}
            	}
		   ]);
		   leadersnumber.forEach((item , i) => { 
				const phonnumber = item.leaders.contact.primarynumber;
				numbers.push(phonnumber);
			});
		   const send  = await sms.smsNotify(numbers ,msgBody);
		   if(send.isAxiosError){ 
				res.json({status:"error" ,msg:"Unable to send sms due to poor connection!!"});
			} else {
				res.json({status:"success" ,msg:"Message Sent"});
			}
		}
	} catch (error) { 
		console.log(error)
		res.json({error:"true" , success:"false" ,msg:error});
	}
}
// send visitor sms
exports.sendVisitorsms = async (req ,res) => { 
	try {
		const month = parseInt(req.body.receiver);
		const msgBody = req.body.msg;
		const numbers = []
		const visitor_number = await Visitor.aggregate([
			{$project:{
				phone:1,
				month:{$month:"$visit_date"}
			}},
			{$match:{month:month}},
		])
		visitor_number.forEach((ele , i) => { 
			const phonenumber = ele.phone;
			numbers.push(phonenumber);
		});
		const send  = await sms.smsNotify(numbers ,msgBody);
		if(send.isAxiosError){ 
			res.json({status:"error" ,msg:"Unable to send sms due to poor connection!!"});
		} else {
			res.json({status:"success" ,msg:"Message Sent"});
		}
	} catch (error) {
		console.log(error)
	}
}