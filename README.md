## rozhdestvenskiy.ru
Personal home page build on with express.js, nginx and [bem-vcard-enb](https://github.com/sbmaxx/bem-vcard-enb).
Production deployed on http://rozhdestvenskiy.ru.

## Prerequisites
* node;
* grunt;
* git;
* nginx [optional].

## Installation
```bash
git clone https://github.com/sbmaxx/rozhdestvenskiy.ru.git
make install
```

If you use nginx, check config `.nginx` and symlink in `/etc/nginx/sites-available`.
You can run express app without nginx. In that case statics will be served with express instead of nginx.

## Production
Use nginx upstream proxy or change port in `server.js` to run on port `80`. Use `forever` for run.
