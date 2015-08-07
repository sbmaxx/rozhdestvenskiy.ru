all:: grunt

grunt:
	grunt

install:
	npm install
	-sudo ln -s $(CURDIR)/.nginx /etc/nginx/sites-available/rozhdestvenskiy.ru
	-git clone https://github.com/sbmaxx/bem-vcard-enb.git
	-make -C bem-vcard-enb install

forever:
	PORT=8080 forever start --uid rozhdestvenskiy -a server.js

.PHONY: grunt install forever
