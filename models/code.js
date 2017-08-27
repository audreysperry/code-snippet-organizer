const mongoose = require('mongoose');


var codeSchema = new mongoose.Schema({
  title: {type: String},
  body: {type: String},
  notes: {type: String},
  language: {type: String},
  tags: [String],
  userId: String


});

const Code = mongoose.model('Code', codeSchema);


module.exports = Code;
