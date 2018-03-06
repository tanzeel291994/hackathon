var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var user = new Schema({
    email: {type: String, required: true, unique: true},  
    password: {type: String, required: true},
    dp: {type: String,default: '/dp/default.jpg'},   
    created_at: { type: Date, default: Date.now },
   
    profile: {
        
            firstName: String,
            lastName:String,
             location: String,
            occupation:String,
            gender: String,
            intrest:String,       
            contact: String,
           // dob: Date
          },
Category: [{type: Schema.Types.ObjectId, ref: 'user'}],//to hire or work 
followers: [{type: Schema.Types.ObjectId, ref: 'user'}],
following: [mongoose.Schema.Types.ObjectId],
posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
notification: [{type: Schema.Types.ObjectId, ref: 'Notification'}],


  
});

user.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('user', user);

