coolestProjectsApp.factory('errorService', ['$rootScope', '$sanitize',
    function($rootScope, $sanitize) {
        return {
            show: function(message) {
                console.log(message);
                $rootScope.error = "<strong>Not cool! </strong> " + $sanitize(message);
            },
            clear: function() {
                $rootScope.error = '';
            }
        };
    }
]);
