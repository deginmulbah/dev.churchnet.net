var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var dailyActivities = new Schema({ 
    day:{ 
        type: String,
        required:true,
        unique:true,
    },
    activities:[
        {
            name:{
                type:String,
                required:true,
            }, 
            start:{ 
                type: String,
            },
            end:{ 
                type:String,
            }
        },
    ],
    created_at:{ 
        type:Date,
        required:true,
        default:Date.now
    }
})
module.exports = mongoose.model('dailyActivities', dailyActivities);