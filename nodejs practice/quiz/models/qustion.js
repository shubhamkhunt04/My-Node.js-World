const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const optionSchema = new Schema({
   /* qustion: {
        type: String,
        min: 1,
        max: 2,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'   
    },  */
    option:{
        type: String,
        required: true,
        max:4
    }
}, {
    timestamps: true
});


const qustionSchema = new Schema({
    qustion : {
        type: String,
        required: true,
        min:1,
        unique: true
    },
    options: [{
        type: String,
        required: true,
        max:4
    }],
    answer:{
        type:String,
        required:true
    }

}, {
    timestamps: true
});

var Qustion = mongoose.model('Qustion', qustionSchema);

module.exports = Qustion;