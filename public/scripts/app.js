var storage = window.localStorage;
var API_URL = "http://localhost:3000/";
var socket = io.connect(API_URL);
var coolestProjectsApp = angular.module("coolestProjectsApp", ['ngCookies', 'ngSanitize']);

coolestProjectsApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    });

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });

    $routeProvider.when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
    });

    $routeProvider.when('/messages', {
        templateUrl: 'views/message.html',
        controller: 'MessageCtrl'
    });

    $routeProvider.when('/about', {
        templateUrl: 'views/about.html',
    });

    $routeProvider.when('/schedule', {
        templateUrl: 'views/schedule.html',
    });

    $routeProvider.when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderBoardCtrl'
    });

    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });

    $routeProvider.when('/vote', {
        templateUrl: 'views/vote.html',
        controller: 'VoteCtrl'
    });

    $routeProvider.when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
    });

    $routeProvider.when('/messageboard', {
        templateUrl: 'views/messageboard.html',
        controller: 'MessageBoardCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

coolestProjectsApp.run(function($rootScope, $location, authenticationService) {
    var routesThatDontRequireAuth = ['/login', '/about', '/register'];

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if ($.inArray($location.path(), routesThatDontRequireAuth, 0) < 0 && !authenticationService.isAuthenticated()) {
            $location.path('/login');
        }
    });
});

coolestProjectsApp.filter('reverse', function() {
  return function(items) {
    console.log(items)
    if(items && items.length > 0)
        return items.slice().reverse();
    }
  });
