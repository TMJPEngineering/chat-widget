'use strict';

var express = require('express'),
    env = require('node-env-file'),
    app = express();

var __env = env(__dirname + '/.env');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/resources/views'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/resources/views/index.html')
});

var server = require('http').createServer(app);

server.listen(__env.PORT, function () {
    console.log('Listen on port' + __env.PORT);
});
