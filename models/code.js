const mongoose = require('mongoose');


var codeSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  Notes: {type: String},
  Language: {type: String, required: true},
  tags: [String]


});

const Code = mongoose.model('Code', codeSchema);


module.exports = Code;
