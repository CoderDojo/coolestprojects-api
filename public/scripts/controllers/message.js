coolestProjectsApp.controller('MessageCtrl', function($scope, $location, $http, errorService, sessionService) {
  $scope.message = { message: "", session_hash: "" };

  $scope.send = function() {
  	console.log('Message to be sent ')
  	$scope.message.session_hash = sessionService.getSecurityHash()

    errorService.clear();
    $scope.success = "";

    if(message) {
	    $http.post('message/add', $scope.message)
	      .success(function(data, status, headers, config) {
	         $scope.success = "Message added"
	         $scope.message = ""
	      })
	      .error(function(data, status, headers, config) {
	          console.log(data.error.message);
	          errorService.show(data.error.message);
	    });
	 }
  };
});
