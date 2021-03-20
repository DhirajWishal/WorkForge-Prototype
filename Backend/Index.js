// Load required libraries
var http = require('http');
var url = require('url');
var fs = require('fs');

// Setup directory information.
var directory = __dirname;
directory = directory.replace("Backend", "");

// Create the server.
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var preProcessedPath = decodeURIComponent(q.pathname);
    var filename = directory + preProcessedPath;

    fs.readFile(filename, function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }

        if (filename.endsWith(".js")) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
        }
        else if (filename.endsWith(".html")) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
        }

        res.write(data);
        return res.end();
    });
}).listen(8080);