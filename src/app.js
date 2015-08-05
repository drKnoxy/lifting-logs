angular.module('app',[
  // Angular Team
  'ngRoute',

  // Third Party
  'angular-stamplay',

  // Local
  'UserService',
  'home'
])
.config(function($locationProvider) {
  // $locationProvider.html5Mode(true);
})
.controller('appController', function($scope, User){
  User.getCurrent()
      .then(function(resp){
          console.log(resp);
      })
});