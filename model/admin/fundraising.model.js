var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fundcampaign = new Schema({ 
	title:{ 
		type:String,
		required:true,
		unique:true,
	},
	amount:{ 
		type:String,
		required:true,
	},
	start:{ 
		type:Date,
	},
	end:{ 
		type:Date,
	},
	desc:{ 
		type:String,
	},
	created_at:{ 
		type:Date,
		required:true,
		default:Date.now
	}
}) 
module.exports = mongoose.model('fundcampaign', fundcampaign);