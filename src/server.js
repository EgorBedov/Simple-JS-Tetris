let http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
    switch (req.url) {
        case '/':
            path = 'dist/index.html';
            type = 'text/html';
            break;
        case '/bundle.js':
            path = 'dist/bundle.js';
            type = 'application/javascript';
            break;

    }
    fs.readFile(path, function (err, file) {
        if (err) {
            throw err;
        }
        res.writeHead(200, {'Content-Type': type});
        res.write(file);
        res.end();
    });
}).listen(8001);
