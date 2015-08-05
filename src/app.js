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
	var app = this;

	app.user = {};

	User.getCurrent()
		.then(function(data){
			console.log(data.get('_id'));
			if (data.get('_id')) {
				app.user.isLoggedIn = true;
				app.user.id = data.get('_id');
				app.user.name = data.get('displayName');
				app.user.img = data.get('profileImg');
			} else {
				app.user.isLoggedIn = false;
			}
		})
});