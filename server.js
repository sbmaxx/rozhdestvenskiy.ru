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

var generator = require('./bem-vcard-enb/pages/generator/generator.js'),
    bh = require('./bem-vcard-enb/pages/index/index.bh.js');

var lastModified = (new Date()).toUTCString();

router.get('/', function(req, res) {

    var data = {
        order: ['ru', 'en'],
        cards: {
            ru: {
                lang: 'ru',
                name: 'Роман Рождественский',
                position: 'Руководитель службы интерфейсов мультимедийных поисков',
                contact: {
                    country: 'Россия',
                    city: 'Москва',
                    zip: '119021',
                    address: 'ул. Льва Толстого, д. 16',
                    phone: '+7 (495) 739-70-00',
                    phoneAdd: '6598',
                    cellular: '+7 (965) 214-04-62',
                    site: 'yandex.ru'
                },
                extra: {
                    email: 'sbmaxx@yandex-team.ru',
                    skype: 'sbmaxx',
                    github: 'sbmaxx'
                }
            },
            en: {
                lang: 'en',
                name: 'Roman Rozhdestvenskiy',
                position: 'Head of multimedia search interfaces department',
                contact: {
                    country: 'Russia',
                    city: 'Moscow',
                    zip: '119021',
                    address: '16, Leo Tolstoy St.',
                    phone: '+7 (495) 739-70-00',
                    phoneAdd: '6598',
                    cellular: '+7 (965) 214-04-62',
                    site: 'yandex.com'
                },
                extra: {
                    email: 'sbmaxx@yandex-team.ru',
                    skype: 'sbmaxx',
                    github: 'sbmaxx'
                }
            }
        }
    };

    res.setHeader('Last-Modified', lastModified);
    res.send(bh.apply(generator(data, 'bem-vcard-enb/')));

});

app.use('/', router);

app.listen(8080);
