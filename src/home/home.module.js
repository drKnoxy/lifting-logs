angular.module('home', ['ngRoute'])
.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/home/home.html',
        controller: 'HomeController'
    });
})
.controller('HomeController', function($scope) {

});