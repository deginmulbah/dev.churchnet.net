const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const upcomingEvent = new Schema({
    title:{
        type:String,
        require:true,
        unique: true
    },
    startDate:{ 
        type: Date,
        require:true,
    },
    endDate:{ 
        type: Date,
        require:true,
    },
    eventdesc:{ 
        type:String,
    },
    reminder:{ 
        type:Boolean,
        required:true,
        default:false,
    },
    created_at:{
        type:Date,
        require: true,
        default:Date.now,
    }
})
module.exports = mongoose.model('upcomingEvent', upcomingEvent);