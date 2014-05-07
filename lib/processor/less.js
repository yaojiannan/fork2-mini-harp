module.exports = makeLess;
var less = require('less');

function makeLess(root) {

	return function (request, response, next){
		root = root || process.cwd();
		var fs = require('fs');
		var path = require('path');
		
		var req_extname = path.extname(request.url);

		 if (req_extname == ".css") {
		 	var less_file_path = root + "/" + path.basename(request.url, '.css') + '.less';

		 fs.readFile(less_file_path, { encoding: 'utf8'},
		 	function(err, data) {
		 		if (err) {
		 			response.statusCode = 404;
		 			response.end();
		 		} else {
		 			less.render(data, function(err, css) {
                        response.writeHead(200, {
                            'Content-Length': css.length,
                            'Content-Type': 'text/css; charset=UTF-8'
                        });
                        response.end(css);
                    });
		 		}
		 	})	

		 } else {
		 	return next();
		 }
	};
}