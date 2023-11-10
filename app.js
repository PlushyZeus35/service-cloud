const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
require('./helpers/discord');
// INITIALIZATIONS
const app = express();

// SETTINGS
// Set static path to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
// TEMPLATE ENGINE

// MIDDLEWARES

// GLOBAL VARIABLES

// ROUTES
app.use(require('./routes'));
app.use(require('./routes/index'));


module.exports = app;