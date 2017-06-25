'use strict'; 
define(['app'], function (app) {
    app.controller('buscaCtrl', function ($scope, $rootScope, $location) {
        $rootScope.loading = true;  
            $rootScope.ischecked = true;          
            $rootScope.questionaSessao('busca');            

            $rootScope.pesquisaResultado = function(val1, val2, val3, val4){

                client.emit('busca', { texto: val1, array: val2, distancia: val3, pag: val4, userlogado: $.jStorage.get("key") }, function(message, eventName){ 
                    console.log(message[0][0])
                    if(message[0][0] != null){
                        console.log(message)
                    }
                    else{
                        alert('vazio')
                    }            
                });
            };

            $rootScope.pesquisaResultado($.cookie('textInput'), $.cookie('arrayOptionInput'), $.cookie('distanceInput'), $.cookie('pag'));

        $rootScope.loading = false;
    });
});