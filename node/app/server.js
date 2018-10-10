const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

let cache = {};

const send404 = (response) => {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

const senfFile = (response, filePath, fileContents) => {
    response.writeHead(
        200,
        {"content-type": mime.lookup(path.basename(filePath))}
    );
    response.end();
}

const serveStatic = (response, cache, absPath) => {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, (exists) => {
            if (exists) {
                fs.readFile(absPath, (err, data) => {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}
