var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var user = new Schema({
    email: {type: String, required: true, unique: true},  
    password: {type: String, required: true},
    dp: {type: String,default: '/dp/default.jpg'},   
    //created_at: { type: Date, default: Date.now }, //not reqired
    profile: {
        
            firstName: String,
            lastName:String,
            location: String,
            occupation:String,
            gender: String,
            intrest:String,       
            contact: String
           // dob: Date
          },
    category:Number,//to hire or work 
    //followers: [{type: Schema.Types.ObjectId, ref: 'User'}], //not required
    following: [mongoose.Schema.Types.ObjectId],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    notifications: [{type: Schema.Types.ObjectId, ref: 'Notification'}]
});

user.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', user);

