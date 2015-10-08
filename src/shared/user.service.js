(function(){

	angular
		.module('UserService', ['angular-stamplay'])
		.factory('User', ['$q', '$stamplay', UserService]);

	function UserService($q, $stamplay) {

		return {
			getCurrent: getCurrent,
			signup: signup,
			login: login,
			logout: logout
		};

		// get the current logged in user
		function getCurrent() {
			var deferred = $q.defer();

			// instantiate the user model from the sdk
			var userModel = $stamplay.User().Model;

			userModel.currentUser()
				.then(function() {
					deferred.resolve(userModel);
				});

			return deferred.promise;
		}

		function signup(data) {
			var def = $q.defer();

			var user = $stamplay.User().Model;
			user.signup(data)
				.then(function() {
					def.resolve(user);
				});

			return def.promise;
		}

		function login(data) {
			var def = $q.defer();

			var user = $stamplay.User().Model;
			user.login(data.email, data.password)
				.then(function() {
					def.resolve(user);
				}, function() {
					def.reject({'error': 'Unable to login.'});
				});

			return def.promise;
		}

		// logout function to clear the token from
		function logout() {

			var userModel = $stamplay.User().Model;
			userModel.logout();
		}

	}
})();