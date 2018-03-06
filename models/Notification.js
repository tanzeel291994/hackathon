var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notification = new Schema({
  //  n_Id: {type: number, required: true},
    n_Title: {type: String, required: true},
    n_Description: {type: String, required: true},
    isActive: {type: Boolean, default:false},
    del:{type:Boolean,default:false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date,default: Date.now}
});


module.exports = mongoose.model('Notification', Notification);