const Code = require('../models/code');


var CodeController = {
    list: function(req, res) {
      Code.find().then(function(snippets) {
        res.render('code/list', {
          code: snippets
        })
      });
    },


  form: function(req, res) {
    res.render('code/form');


  },

  add: function(req, res) {

    var title = req.body.title;
    var body = req.body.title;
    var notes = req.body.notes;
    var language = req.body.language;
    var tags = [req.body.tag];

    var newCode = new Code ({title: title, body: body, notes: notes, lanuage: language, tags: tags});
    newTodo.save(function(){
      res.redirect('/code/list');
    })


  }

};
module.exports = CodeController;
