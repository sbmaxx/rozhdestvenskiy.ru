// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(methodOverride());                  // simulate DELETE and PUT

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
   // configure stuff here
}

var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
    next();
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('hello');
});

var bemjson = require('./bem-vcard-enb/pages/index/index.bemjson.js'),
    bh = require('./bem-vcard-enb/pages/index/index.bh.js');

router.get('/bem', function(req, res) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.send(bh.apply(Object.create(bemjson)));
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    res.send('im the about page!');
});

// apply the routes to our application
app.use('/', router);

app.listen(8080);
console.log('Magic happens on port 8080');          // shoutout to the user
