var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

var env = process.env.NODE_ENV || 'development';

var router = express.Router();

var vcardPath = './bem-vcard-enb/';

router.get('/', function(req, res) {

    res.send(bh.apply(generator(data, 'bem-vcard-enb/', !isSearchEngine)));

});

var winston = require('winston');

// app.use(express.static(__dirname + '/public'));
// let's nginx serve our static
app.use(bodyParser());
app.use(methodOverride());

app.use('/', router);

app.listen(8080);
