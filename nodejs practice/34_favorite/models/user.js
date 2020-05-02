var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose'); // for storing username and password(hash formate)

var User = new Schema({
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    admin:{
        type:Boolean,
        default:false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);