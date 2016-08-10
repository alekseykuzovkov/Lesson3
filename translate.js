const _ = require('underscore');
const request = require('request');
const colors = require('colors');

const apiKey = "trnsl.1.1.20160810T103342Z.edcb645beaf697e0.f7e4610b2eca756d11e2f745ed496deb1b718ac6";

const http = require("http");
const url = require('url');

function onRequest(req, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	//Автоматическое заполнение поля "строка для перевода"
	var translateInputFillValue = "";
	//Автоматическое заполнение поля "язык"
	var langInputFillValue = "";

	response.write("<html><head><meta charset='utf-8'/></head><body>");
	if (_.has(query, 'translate')) {
		translateInputFillValue = query['translate'];

		var lang = 'ru-en';
		if(_.has(query, 'lang')) {
			if (query['lang']!=="") lang = query['lang'];
		}
		langInputFillValue = lang;

		const uri = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='
					+apiKey
					+"&text="
					+encodeURIComponent(query['translate'])
					+"&lang="
					+lang;
		
		request(uri, function (error, tresp, data) {
			if (!error && response.statusCode == 200) {
				let json = JSON.parse(data);
				_.each(json["text"], function(translatedText) {
					response.write("<p>"+translatedText+"</p>");	
				})
				
				response.write("</body><html>");
				response.end();
			}
		});
	}
	response.write("<form method='get'>"
					+"<input type='text' name='translate' value='"+translateInputFillValue+"' placeholder='Строка для перевода'/>"
					+"<input type='text' name='lang' value='"+langInputFillValue+"' placeholder='ru-en'/>"
					+"<input type='submit'/></form>");
}
http.createServer(onRequest).listen(8888);
console.log("Server has started.");