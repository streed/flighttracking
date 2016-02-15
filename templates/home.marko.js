function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __head_marko = __loadTemplate(require.resolve("./head.marko"), require),
      escapeXml = __helpers.x,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content><meta name="author" content><title>My Flights</title>');
    __helpers.i(out, __head_marko, {});

    out.w('<link href="jumbotron-narrow.css" rel="stylesheet"><!--[if lt IE 9]>\n      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>\n      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>\n    <![endif]--></head><body><div class="container"><div class="header clearfix"><h3 class="text-muted">My Flights</h3></div><div class="jumbotron"><h1>Total Miles</h1><h2>' +
      escapeXml(data.totalMiles) +
      '</h2></div><div class="row marketing"><div class="col-lg-12">');

    forEach(data.flights, function(flight) {
      out.w('<div class="panel panel-default"><div class="panel-body">Flight from <b>' +
        escapeXml(flight.from) +
        '</b> to <b>' +
        escapeXml(flight.to) +
        '</b> for a total distance of <b>' +
        escapeXml(flight.distance) +
        '</b> miles on ' +
        escapeXml(flight.date) +
        '!</div></div>');
    });

    out.w('</div></div><footer class="footer"><p>&copy; 2016 Sean Reed</p></footer></div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);