//var Schema = mongoose.Schema;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var random = require('mongoose-simple-random');
var mongoosePaginate = require('mongoose-paginate'); 


var postSchema = new Schema({
  text: String,
  title: String,
  likes: [mongoose.Schema.Types.ObjectId],
  intrested: [mongoose.Schema.Types.ObjectId],
  type: {
    type: Number,
    default: 1 //1,2,3  genral,to hire, to work 
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date,default: Date.now}
})

postSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', postSchema)

