var User = {
  login: function(req, res) {
    res.render('users/login', {
      messages: res.locals.getMessages()
    });
  },

  signup: function(req, res) {
    res.render('users/signup', {
      messages: res.locals.getMessages()
    });
  }

};



module.exports = User;
