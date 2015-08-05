angular.module('app',[
    // Angular Team
    'ngRoute',

    // Third Party
    'angular-stamplay',

    // Local
    'home'
])
.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})
.controller('appController', function($scope){

});