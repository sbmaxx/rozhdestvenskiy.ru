var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';

var router = express.Router();

var vcardPath = './bem-vcard-enb/';

var generator = require(vcardPath + 'pages/generator/generator.js'),
    bh = require(vcardPath + 'pages/index/index.bh.js'),
    data = require(vcardPath + 'data.js');

var lastModified = (new Date()).toUTCString();

router.get('/', function(req, res) {

    res.setHeader('Last-Modified', lastModified);
    res.send(bh.apply(generator(data, 'bem-vcard-enb/')));

});

app.use('/', router);

app.listen(8080);
