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

    if (req.param('action') === 'update-datauri') {
        execute('cd /var/www/vhosts/rozhdestvenskiy.ru/public/experiments/datauri/ && git pull --rebase', function(error, stdout, stderr) {
            res.send([
                'error: ' + error,
                'stdout: ' + stdout,
                'stderr: ' + stderr
            ].join('\n<br>'));
        });
    } else {
        res.setHeader('Last-Modified', lastModified);
        res.setHeader('X-Powered-By', 'https://github.com/sbmaxx/rozhdestvenskiy.ru.git');
        res.send(bh.apply(generator(data, 'bem-vcard-enb/')));
    }
});


// temp
var exec = require('child_process').exec;
function execute(command, callback) {
    exec(command, function(error, stdout, stderr) {
        callback(error, stdout, stderr);
    });
};

app.use('/', router);
// app.use(express.static(__dirname + '/public'));
// let's nginx serve our static
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.listen(8080);
