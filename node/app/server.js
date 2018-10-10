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

