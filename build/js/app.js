(function() {

    angular
        .module('app', [
            // Third Party
            'angular-stamplay',
            'ui.router',

            // Local
            'app.routes',
            'app.admin',
            'app.authenticate',
            'app.group',
            'app.home',
            'app.lift',

            'UserService',
            'LiftsService',
        ])
        .controller('AppController', ['User', '$rootScope', AppController]);

    function AppController(User, $rootScope) {
        var vm = this;
        vm.logout = logout;

        $rootScope.currentUser = {};

        User.getCurrent()
            .then(function(data) {
                if (data.get('_id')) {
                    $rootScope.currentUser = {
                        id: data.get('_id'),
                        name: data.get('displayName'),
                        image: data.get('profileImg')
                    };
                } else {
                    $rootScope.currentUser = {};
                }
            });

        function logout() {
            User.logout();
            $rootScope.currentUser = {};
        }
    }

})();


(function() {
    angular
        .module('app.routes', [])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

    function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

        // pretty urls
        $locationProvider.html5Mode(true);

        // defualt to homepage
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/home/home.html',
                controller: 'HomeController as home'
            })
            .state('lift', {
                url: '/lift/{name}',
                templateUrl: '/lift/lift.html',
                controller: 'LiftController as lift'
            })
            .state('group', {
                url: '/group/{name}',
                templateUrl: '/group/group.html',
                controller: 'GroupController as group'
            })
            .state('authenticate', {
                url: '/authenticate',
                templateUrl: '/authenticate/authenticate.html',
                controller: 'AuthenticateController as authenticate'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: '/admin/admin.html',
                controller: 'AdminController as admin'
            });
    }
})();


(function(){
	angular
		.module('app.admin', [])
		.controller('AdminController', AdminController);

	function AdminController() {
		var admin = this;
	}
})();

(function() {
    angular
        .module('app.authenticate', [])
        .controller('AuthenticateController', ['User', '$rootScope', '$state', AuthenticateController]);

    function AuthenticateController(User, $rootScope, $state) {
        var authenticate = this;

        authenticate.signupData = {};
        authenticate.loginData = {};

        authenticate.signup = signup;
        authenticate.login = login;

        function signup() {
            User.signup(authenticate.signupData)
                .then(function(data) {
                    if (data.get('_id')) {
                        $rootScope.currentUser.id = data.get('_id');
                        $rootScope.currentUser.name = data.get('displayName');
                        $rootScope.currentUser.image = data.get('profileImg');

                        // redirect the user
                        $state.go('home');
                    }
                });
        }

        /**
         * Use the User factory to log a user in
         * Bind the user's information to $rootScope
         */
        function login() {
            User.login(authenticate.loginData)
                .then(function(data) {
                    if (data.get('_id')) {
                        $rootScope.currentUser.id = data.get('_id');
                        $rootScope.currentUser.name = data.get('displayName');
                        $rootScope.currentUser.image = data.get('profileImg');

                        // redirect the user
                        $state.go('home');
                    }
                });
        }
    }
})();


(function(){
	angular
		.module('app.group', [])
		.controller('GroupController', GroupController);

	function GroupController() {
		var group = this;
	}
})();

(function(){
	angular
		.module('app.home', [])
		.controller('HomeController', ['Lifts', HomeController]);

	function HomeController(Lifts) {
		var home = this;

		home.liftGroups = [];
		home.selectedGroup = {};

		Lifts.getGroups()
			.then(function(data) {
				home.liftGroups = data.instance;
				home.selectedGroup = home.liftGroups[0];
			});


	}
})();

(function(){
	angular
		.module('app.lift', [])
		.controller('LiftController', LiftController);

	function LiftController() {
		var lift = this;
	}
})();

(function(){

	angular
		.module('LiftsService', ['angular-stamplay'])
		.factory('Lifts', ['$q', '$stamplay', LiftsService]);

	function LiftsService($q, $stamplay) {

		return {
			getGroups: getGroups
		};

		function getGroups() {
			var deferred = $q.defer();

			var collection = $stamplay.Cobject('liftgroups').Collection;

			collection.fetch()
				.then(function() {
					deferred.resolve( collection );
				});

			return deferred.promise;
		}

		return service;
	}
})();
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