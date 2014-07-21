var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

var env = process.env.NODE_ENV || 'development';

var router = express.Router();

var vcardPath = './bem-vcard-enb/';

var generator = require(vcardPath + 'pages/generator/generator.js'),
    bh = require(vcardPath + 'pages/index/index.bh.js'),
    data = require(vcardPath + 'data.js');

var lastModified = (new Date()).toUTCString();

router.get('/', function(req, res) {

    res.setHeader('Last-Modified', lastModified);
    res.setHeader('X-Powered-By', 'https://github.com/sbmaxx/rozhdestvenskiy.ru.git');
    res.send(bh.apply(generator(data, 'bem-vcard-enb/')));

});

app.use('/', router);
// app.use(express.static(__dirname + '/public'));
// let's nginx serve our static
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.listen(8080);
