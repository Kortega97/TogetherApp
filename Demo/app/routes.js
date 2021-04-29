module.exports = function(app, passport) {
  // importing Mongoose Schemas - object model
  const User   = require('./models/User.js')
  const Group  = require('./models/Group.js')

  // importing helper functions
  const helper = require('../config/helpers.js')

  // normal routes ===============================================================
  // show the home page (will also have our login links)
  app.get('/', function(_, res) {
      res.render('login.ejs')
  })

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, (req, res) => {
    const { user, author } = helper.getUserAndAuthor(req)
    Group.find({ author })
      .then(groups => res.render('profile.ejs', { user, groups }))
      .catch(error => console.error(error))
  })

  app.get('/search', isLoggedIn, (req, res) => {
    const { user, key } = helper.getUserAndKey(req)
    Group.find({ key })
      .then(groups => res.render('profile.ejs', { user, groups }))
      .catch(error => console.error(error))
  })

  app.put('/editGroup', isLoggedIn, (req, res) => {
    const { name, msg, rules, key, oldName, author } = helper.getOldNameAndGroupInfo(req)
    Group.findOneAndUpdate({ oldName, author },{$set:{ name, msg, rules, key }})
      .then(() => res.sendStatus(200))
      .catch(error => console.error(error))
  })

  app.get('/message/:group', isLoggedIn, (req, res) => {
    const { user } = helper.getUser(req)
    Group.find({ name: req.params.group })
      .then(groups => res.render('chat.ejs', { user, groups }))
      .catch(error => console.error(error))
  })

  // LOGOUT ==============================
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  // message board routes ===============================================================
  app.post('/groups', (req, res) => {
    const { name, msg, rules, key,author } = helper.getGroupInfo(req)
    Group.insertMany({ name, msg, rules, key, author})

      .then(() => res.redirect('/profile'))
      .catch(err => console.error(err))
  })

  
  app.delete('/groups/:author', (req, res) => {
    console.log(req.body)
    const { name, msg, rules, key,} = helper.getGroupInfo(req)
    Group.findOneAndDelete(req.body)
    .then(() => res.send())
    .catch(error => res.send(500, error))
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================
  // locally --------------------------------
  // LOGIN ===============================

  // show the login form
  app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================

  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    const { user } = helper.getUser(req)
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(() => res.redirect('/profile'));
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}