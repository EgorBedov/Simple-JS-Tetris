let http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
    let type = '',
        path = '';
    switch (req.url) {
        case '/bundle.js':
            path = 'dist/bundle.js';
            type = 'application/javascript';
            break;
        case '/main.css':
            path = 'dist/main.css';
            type = 'text/css';
            break;
        default:
            path = 'dist/index.html';
            type = 'text/html';
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
