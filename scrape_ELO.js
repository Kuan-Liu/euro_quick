// scrape_ELO.js

var webPage = require('webpage'), system = require('system');
var page = webPage.create();

// the url for each country provided as an argument
country= system.args[1];

var fs = require('fs');
var path = 'elopage.html'

page.open(country, function (status) {
  var content = page.content;
  fs.write(path,content,'w')
  phantom.exit();
});

