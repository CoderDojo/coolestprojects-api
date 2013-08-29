coolestProjectsApp.controller('MessageCtrl', function($scope, $location, $http, errorService, sessionService) {
    $scope.message = {
        message: "",
        session_hash: ""
    }

    $scope.messages = []

    socket.on('error', function(msg) {
        errorService.show(msg);
    });

    socket.on('message', function(msg) {
        console.log($scope.messages);
        console.log('Adding message to '+ $scope.messages.length);
        $scope.messages[$scope.messages.length] = msg;
    });

    $scope.send = function() {
        console.log('Message to be sent ');
        $scope.message.session_hash = sessionService.getSecurityHash();

        errorService.clear();
        $scope.success = "";

        socket.emit('message', 
        {
            "inferSrcUser": true,
            "source": "",
            "message": $scope.message
        });

        if (message) {
            $http.post(API_URL + 'message/add', $scope.message)
                .success(function(data, status, headers, config) {
                    $scope.success = "Message added";
                    $scope.message = "";
                })
                .error(function(data, status, headers, config) {
                    console.log(data.error.message);
                    errorService.show(data.error.message);
                });
        }
    };
});
