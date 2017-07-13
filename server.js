'use strict';

var express = require('express'),
    env = require('node-env-file'),
    app = express(),
    server = require('http').createServer(app);

var __env = env(__dirname + '/.env');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/resources/views'));

app.listen(__env.NODE_PORT, function () {
    console.log('Listen localhost:' + __env.NODE_PORT);
});
