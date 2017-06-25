"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var conn = require('./connect');
var app = express();
app.use(express.static('./'));
var server = http.createServer(app).listen(3002);
var io = socketio.listen(server);
io.sockets.on('connect', function (socket) {
    socket.on('chat', function (to, from, callback) {
        conn.app_pertube.query('CALL chat("' + to + '","' + from + '")', function (err, result, _fields) {
            callback(result[0], result[1]);
        });
    });
    socket.on('enviaChat', function (data, _callback) {
        this.to = data.to;
        this.message = data.message;
        this.from = data.from;
        console.log(this.message, this.to, this.from);
        conn.app_pertube.query('CALL INSERTCHAT("' + this.message + '", "' + this.to + '", "' + this.from + '")', function (err, result1, _fields) {
            try {
                console.log('segundo: ', result1);
                io.emit('recebeChat', result1);
            }
            catch (error) {
                console.log(error);
            }
        });
    });
    socket.on('forceDisconnect', function () {
        socket.disconnect();
    });
});
//# sourceMappingURL=chat.js.map