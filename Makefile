all:: install

install:
	-sudo ln -s $(CURDIR)/.nginx /etc/nginx/sites-available/rozhdestvenskiy.ru
	-git clone https://github.com/sbmaxx/bem-vcard-enb.git
	-cd bem-vcard-enb && npm install && npm run production

.PHONY: install
