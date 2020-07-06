let http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
    path = 'static/index.html';
    type = 'text/html';
    fs.readFile(path, function (err, file) {
        if (err) {
            throw err;
        }
        res.writeHead(200, {'Content-Type': type});
        res.write(file);
        res.end();
    });
}).listen(8001);
