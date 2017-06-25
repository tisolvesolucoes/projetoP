'use strict'; 

define(['app'], function (app) {
    app.controller('perfilCtrl', function ($scope, $rootScope) {
        
        $rootScope.loading = true;
            $rootScope.ischecked = true;
            
            let url_Parameter = window.location.pathname;
            let url = url_Parameter.substring(url_Parameter.lastIndexOf('/')+1);
                            
            $rootScope.questionaSessao('perfil');
            //ENVIA PARÊMETRO DA PÁGINA ATUAL PARA O HEADER
       
            client.on('perfil', function(message){
                try 
                {
                    $('#containerPerfil').html('<span style="color: white; font-size: 20px;">'+message[0][0].Nome+'</span>');

                    client.emit('visitante', {userLogado: $.jStorage.get("key"), userVisitado: message[0][0].Username} ,function(){});
                }
                catch (error) 
                {
                    
                }                
            });
            client.emit('perfil', {userName:url}, function(message, key){}); 

        $rootScope.loading = false;
    });
}); 
