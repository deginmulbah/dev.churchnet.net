const Visitor = require("../../model/admin/visitor.model");
// ***  save visitors
exports.addVisitor = async (req , res) => {
	try{ 
		const visitor_details = { 
			name: req.body.name,
			email:req.body.email,
			phone:req.body.phone,
			note:req.body.note,
			gender:req.body.gender,
			address: req.body.address,
			visit_date: req.body.visit_date,
		}
		const saved = await Visitor.create(visitor_details);
		if(saved) res.json({success:"ture",status:"success", msg:"Visitor Added Successfully" , action:"add"})
	} catch (error) { 
		res.json({error:"true" , success:"false" , msg:error});
	}
}
//get all visitors
exports.getVisitors = async (req,res) => { 
 	try{ 
 		const data = await Visitor.find({});
 		if(data) res.json({data})
 	} catch (error){ 
 		res.json({error:"true" , success:"false" , msg:error})
 	}
}
// get visitors per month
exports.getVisitorsPermonth = async (req , res) => { 
	try{ 
		const m = parseInt(req.body.month);
		const data = await Visitor.aggregate([
			{$project:{
				visit_date:1,
				name:1,
				email:1,
				phone:1,
				address:1,
				gender:1,
				note:1,
				month:{$month:"$visit_date"}
			}},
			{$match:{month:m}},
		]);
	    if(data) res.json({data})
	} catch (err) { 
		res.json({error:"true" , success:"false" , msg:error})
	}
}