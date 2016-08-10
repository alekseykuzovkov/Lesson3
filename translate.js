var argv = require('minimist')(process.argv.slice(2));
var _ = require('underscore');
const request = require('request');
const colors = require('colors');

const apiKey = "trnsl.1.1.20160810T103342Z.edcb645beaf697e0.f7e4610b2eca756d11e2f745ed496deb1b718ac6";

if (_.has(argv, 'lang')) {
	var translateFormat = argv['lang'];
}
else {
	var translateFormat = 'en-ru';
	console.log("Чтобы указать формат перевода:");
	console.log("node translate.js --lang ru-en");
	console.log("node translate.js --lang ru");
}

console.log("Формат перевода: "+translateFormat);

const readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout 
});


var waitForRequest = function() {
	rl.question('Введите строку для перевода:', function(stringToTranslate) {
		request(
			'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+apiKey+"&text="+encodeURIComponent(stringToTranslate)+"&lang="+translateFormat,	
			function (error, response, data) {
			if (!error && response.statusCode == 200) {
				let json = JSON.parse(data);
				console.log(json["text"][0]);
				waitForRequest();
			}
		});
		
	});
}
waitForRequest();