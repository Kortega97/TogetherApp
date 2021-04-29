// set up ======================================================================
// get all the tools we need
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const configDB = require('./config/database.js');
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io").listen(server);
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = process.env.PORT || 2000;

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// required for passport
app.use(session({ secret: 'rcbootcamp2019a', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs'); // set up ejs for templating

// configuration ===============================================================
require('./app/routesSocketIO')(io);  // passing server information for socketio
require('./config/passport')(passport); // pass passport for configuration
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => require('./app/routes.js')(app, passport))
  .catch(err => console.error(err))  // connect to our database

// launch ======================================================================
server.listen(port, () => console.log('The server is running on http://localhost:' + port));
