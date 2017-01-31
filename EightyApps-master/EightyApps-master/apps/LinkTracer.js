/**************************************************************************
 * The processDocument returns a timestamp for when the URL was crawled,  *
 * the original URL that led to this URL being crawled, and the HTML.     *
 *************************************************************************/

var EightyApp = function() {
	this.processDocument = function(html, url, headers, status, jQuery) {
		var app = this;
		$ = jQuery;
		var $html = app.parseHtml(html, $);
		var object = {};

		// Get crawl date
		object.dateCrawled = app.formatDate(Date.now());

		// Get original URL
		var eightyvalue = app.get80Value(url);
		if (eightyvalue == null) eightyvalue = url;
		object.startingURL = eightyvalue;

		// Get HTML
		object.html = html;

		return JSON.stringify(object);
	}

	this.parseLinks = function(html, url, headers, status, jQuery) {
		var app = this;
		var $ = jQuery;
		var $html = app.parseHtml(html, $);
		var links = [];

		// gets all links in the html document
		$html.find('a').each(function(i, obj) {
			var link = app.makeLink(url, $(this).attr('href'));
			if (link != null) {
				var eightyvalue = app.get80Value(url);
				if (eightyvalue == null) eightyvalue = url;
				link = app.append80FlagToLink(eightyvalue, link);
				links.push(link);
			}
		});

		return links;
	}
}

try {
	// Testing
	module.exports = function(EightyAppBase) {
		EightyApp.prototype = new EightyAppBase();
		return new EightyApp();
	}
} catch(e) {
	// Production
	console.log("Eighty app exists.");
	EightyApp.prototype = new EightyAppBase();
}
