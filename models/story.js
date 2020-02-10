var mongoose = require('mongoose');
const schema = mongoose.Schema;

var StorySchema = new schema({
  img: {
    data: Buffer,
    contentType: String,
    
  },
  date: {
    type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model("Stories", StorySchema);