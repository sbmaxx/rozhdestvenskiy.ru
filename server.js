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

if ('development' == env) {
}

var router = express.Router();

var bemjson = require('./bem-vcard-enb/pages/index/index.bemjson.js'),
    bh = require('./bem-vcard-enb/pages/index/index.bh.js');

var lastModified = (new Date()).toUTCString();

router.get('/', function(req, res) {
    res.setHeader('Last-Modified', lastModified);
    res.send(bh.apply(Object.create(bemjson)));
});

app.use('/', router);

app.listen(8080);
