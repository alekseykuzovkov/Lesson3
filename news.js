const request = require('request');
const cheerio = require('cheerio');
const colors = require('colors');

request('https://geekbrains.ru/posts', function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);

		$('.post-item .post-item__title.h3.search_text').each(function(i, title) {
			console.log($(title).text().bold);
			console.log("https://geekbrains.ru/"+$(title).attr('href'));
			console.log("___________________");
		});
	}
});