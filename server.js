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

var lastModified = (new Date()).toUTCString();

router.get('/', function(req, res) {

    var ua = req.headers['user-agent'].toLowerCase(),
        isSearchEngine = ua.indexOf('google') !== -1 || ua.indexOf('yandex') !== -1;

    res.setHeader('Last-Modified', lastModified);
    res.setHeader('X-Powered-By', 'https://github.com/sbmaxx/rozhdestvenskiy.ru.git');

    // do not use inlining for google because the robot can't see microdata properly
    res.send(bh.apply(generator(data, 'bem-vcard-enb/', !isSearchEngine)));

});

router.get('/dev/instagram', function(req, res) {
    console.log('CODE: ', req.param('code'));
    res.send('ok');
});

var winston = require('winston');
var logger = new winston.Logger({
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: __dirname + '/logs/custom_log',
            json: true,
            level: 'debug',
            name: 'file'
        })
    ]
});

// app.use(express.static(__dirname + '/public'));
// let's nginx serve our static
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

console.log(__dirname + '/logs/custom_log');

router.post('/browser', function(req, res) {
    //console.log(req.headers);
    //console.log(req.body);
    logger.info({
        headers: req.headers,
        info: req.body.info
    });
    res.send('ok');
});


app.use('/', router);

app.listen(8080);
