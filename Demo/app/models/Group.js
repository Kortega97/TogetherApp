// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const groupSchema = mongoose.Schema({
    name            : String, 
    msg             : String, 
    rules           : String, 
    key             : String,
    author          : String
});

// create the model for groups and expose it to our app
module.exports = mongoose.model('Group', groupSchema);
