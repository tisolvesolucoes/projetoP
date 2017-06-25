"use strict";

import * as express from "express";
import * as request from "request";
import * as http from "http";
import * as socketio from "socket.io"; 

//Dependecia de conexão
let conn = require('./connect');

let app = express();
app.use(express.static('./'));
let server = http.createServer(app).listen(3002);
let io = socketio.listen(server);

io.sockets.on('connect', function (socket) {

    socket.on('chat', function (to, from, callback) {
        conn.app_pertube.query('CALL chat("' + to + '","' + from + '")', function (err, result, _fields){
            callback(result[0], result[1])                
        });    
    });  

    socket.on('enviaChat', function (data, _callback) {  
        this.to         = data.to;
        this.message         = data.message;
        this.from         = data.from;
        console.log(this.message, this.to, this.from);   
        
        conn.app_pertube.query('CALL INSERTCHAT("'+this.message+'", "'+this.to+'", "'+this.from+'")', function (err, result1, _fields){ 
            try {
                console.log('segundo: ', result1);
                io.emit('recebeChat', result1);
            } 
            catch (error) {
                console.log(error);
            }              
        });           
    }); 

    socket.on('forceDisconnect', function(){
        socket.disconnect();
    });  
});