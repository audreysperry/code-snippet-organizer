const Code = require('../models/code');
const User = require('../models/user');

var CodeController = {
  list: function(req, res) {
    userId = req.user.id;
    console.log(userId);

    Code.find({
      userId: userId
    }).then(function(snippets, userId) {
      res.render('code/list', {
        code: snippets,
        id: userId
      })
    });
  },


  form: function(req, res) {
    let userId = req.user.id;
    User.findOne({
      _id: userId
    }).then(function(user) {
      res.render('code/form', user);
      return;
    });


  },

  updateForm: function(req, res) {
    let codeId = req.params.id;

    Code.findById(codeId).then(function(code) {
      res.render('code/updateForm', code);
    });
  },

  add: function(req, res) {
    var userId = req.body.id;
    console.log(userId);
    var title = req.body.title;
    var body = req.body.body;
    var notes = req.body.notes;
    var language = req.body.language;
    var tagsString = req.body.tag;
    var tagsArray = tagsString.split(',');

    var newCode = new Code({
      userId: userId,
      title: title,
      body: body,
      notes: notes,
      language: language,
      tags: tagsArray
    });
    newCode.save(function(err, code) {
      res.redirect('/code');
    });
  },

  delete: function(req, res) {
    let codeId = req.params.id;
    console.log(codeId);

    Code.deleteOne({
      "_id": codeId
    }).then(function() {
      res.redirect('/code');

    })
  },

  update: function(req, res) {
    let codeId = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let notes = req.body.notes;
    let tagsString = req.body.tag;
    let tagsArray = tagsString.split(',');
    let language = req.body.language;

    Code.findByIdAndUpdate(codeId, {
      $set: {
        title: title,
        body: body,
        notes: notes,
        langauge: language,
        tags: tagsArray
      }
    }).then(function() {
      res.redirect('/code/');
    });
  },


  view: function(req, res) {
    let userId = req.body.id;
    let search = req.body.search;
    languageSearch = false;

    if (search.includes("Language: ")) {
      languageSearch = true;
      search = search.slice(10);
    } else {
      search = search.slice(5);
    }

    if (languageSearch) {
      Code.find({
        $and: [{
            userId: userId
          },
          {
            language: search
          }
        ]
      }).then(function(code) {
        res.render('code/codeFilter', {snippets: code});
      })
    } else {
      Code.find({
        $and: [{
            userId: userId
          },
          {
            tags: {
              $in: [search]
            }
          }
        ]
      }).then(function(code) {
        res.render('code/codeFilter', {snippets: code});
      })
    }
  }

};
module.exports = CodeController;
