var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade.js');
var makeLess = require('./lib/processor/less.js');
var path = require('path');

module.exports = function(dir){
  var app = connect();
  var jade = makeJade(dir);
  var less = makeLess(dir);

  app.use(function(request,response,next) {
  	if (request.url == "/") {
  		request.url = "/index.html";
  	}
  	next();
  })
  app.use(serveStatic(dir));

  app.use(function(request,response,next) {
  	extname = path.extname(request.url);
  	if (extname == '.less' || extname == '.jade') {
  		response.statusCode = 404;
  		response.end();
  	} else {
  		next();
  	}
  })
  
  app.use(jade);
  app.use(less);
  return app;
}
