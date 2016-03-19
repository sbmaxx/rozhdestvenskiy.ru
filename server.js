var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

var env = process.env.NODE_ENV || 'development';

var router = express.Router();

var vcardPath = './bem-vcard-enb/';

var generator = require(vcardPath + 'bemjson.js'),
    bh = require(vcardPath + 'pages/index/index.bh.js'),
    data = require(vcardPath + 'data.js');

router.get('/', function(req, res) {

    var ua = req.headers['user-agent'].toLowerCase(),
        isSearchEngine = ua.indexOf('google') !== -1 || ua.indexOf('yandex') !== -1;

    res.setHeader('Last-Modified', lastModified);
    res.setHeader('X-Powered-By', 'https://github.com/sbmaxx/rozhdestvenskiy.ru.git');

    // do not use inlining for google because the robot can't see microdata properly
    res.send(bh.apply(generator(data, 'bem-vcard-enb/', !isSearchEngine)));

});

var winston = require('winston');

// app.use(express.static(__dirname + '/public'));
// let's nginx serve our static
app.use(bodyParser());
app.use(methodOverride());

app.use('/', router);

app.listen(8080);
