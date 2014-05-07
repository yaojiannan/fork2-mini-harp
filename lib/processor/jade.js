module.exports = makeJade;

function makeJade(root) {

	return function (request, response, next){
		root = root || process.cwd();
		var jade = require('jade');
		var fs = require('fs');
		var path = require('path');
		
		var req_extname = path.extname(request.url);

		 if (req_extname == ".html") {
		 	var jade_file_path = root + "/" + path.basename(request.url, '.html') + '.jade';

		 fs.readFile(jade_file_path, { encoding: 'utf8'},
		 	function(err, data) {
		 		if (err) {
		 			response.statusCode = 404;
		 			response.end();
		 		} else {
		 			jade.render(data, function(err, html) {
                        if (err) throw err;
                        response.writeHead(200, {
                            'Content-Length': html.length,
                            'Content-Type': 'text/html; charset=UTF-8'
                        });
                        response.end(html);
                    });
		 		}
		 	})

		 } else {
		 	return next();
		 }
	};
}