'use strict';

(function() {
    angular
        .module('app', [
            // Third Party
            'angular-stamplay',
            'ui.router',

            // Local
            'app.admin',
            'app.authenticate',
            'app.group',
            'app.home',
            'app.lift',

            'UserService',
            'LiftsService',
        ]);

})();

(function(){
    angular
        .module('app')
        .controller('AppController', ['User', '$rootScope', AppController]);

    function AppController(User, $rootScope) {
        var vm = this;
        vm.logout = logout;

        $rootScope.currentUser = {};

        activate();

        /////////////////////////////////////

        function activate() {
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
        }

        function logout() {
            User.logout();
            $rootScope.currentUser = {};
        }
    }

})();

(function() {
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

    function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

        // pretty urls
        // $locationProvider.html5Mode(true);

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

(function() {
    angular
        .module('app.admin', [])
        .controller('AdminController', AdminController);

    function AdminController() {
        var vm = this;
    }

})();

(function() {
    angular
        .module('app.authenticate', [])
        .controller('AuthenticateController', ['User', '$rootScope', '$state', AuthenticateController]);

    function AuthenticateController(User, $rootScope, $state) {
        var vm = this;

        vm.signupData = {};
        vm.loginData = {};

        vm.signup = signup;
        vm.login = login;

        /////////////////////////////////////

        function signup() {
            User.signup(vm.signupData)
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
            User.login(vm.loginData)
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

(function() {
    angular
        .module('app.group', [])
        .controller('GroupController', GroupController);

    function GroupController() {
        var vm = this;
    }

})();

(function() {
    angular
        .module('app.home', [])
        .controller('HomeController', ['Lifts', HomeController]);

    function HomeController(Lifts) {
        var vm = this;

        vm.liftGroups = [];
        vm.selectedGroup = {};

        vm.newLiftForm = {};
        vm.newLift = {};
        vm.addLift = addLift;

        activate();

        /////////////////////////////////////

        function activate() {
            // Get the lift groups
            Lifts.getGroups()
                .then(function(data) {
                    vm.liftGroups = data.instance;
                    vm.selectedGroup = vm.liftGroups[0];
                });

            Lifts.all()
                .then(function(data) {
                    vm.lifts = data.instance;
                })
        }

        function addLift() {
            var data = {
                name: vm.newLift.name,
                for: vm.newLift.for,
                group: vm.selectedGroup.instance._id
            };
            console.log(data);

            Lifts.create(data)
                .then(function(data){
                    vm.newLift = {};
                    console.log('success', data);
                })
        }
    }

})();

(function() {
    angular
        .module('app.lift', [])
        .controller('LiftController', LiftController);

    function LiftController() {
        var vm = this;
    }

})();

(function() {
    angular
        .module('LiftsService', ['angular-stamplay'])
        .factory('Lifts', ['$q', '$stamplay', LiftsService]);

    function LiftsService($q, $stamplay) {

        return {
            all: all,
            get: get,
            create: create,
            destroy: destroy,
            getGroups: getGroups,
        };

        /////////////////////////////////////

        function getGroups() {
            var deferred = $q.defer();

            var collection = $stamplay.Cobject('liftgroups').Collection;

            collection.fetch()
                .then(function() {
                    deferred.resolve(collection);
                });

            return deferred.promise;
        }

        function all(groupId) {
            var def = $q.defer();

            var lifts = new Stamplay.Cobject('lifts').Collection;
            lifts.fetch()
                .then(function() {
                    def.resolve(lifts);
                });

            return def.promise;
        }

        function get(id) {
            var def = $q.defer();

            var lift = new Stamplay.Cobject('lifts').Model;
            lift.fetch(id)
                .then(function() {
                    def.resolve(lifts);
                });

            return def.promise;
        }

        function create(data) {
            var def = $q.defer();

            var lift = new Stamplay.Cobject('lifts').Model;
            lift.set('name', data.name);
            lift.set('for', data.for);
            lift.set('group', data.group);


            lift.save()
                .then(function() {
                    def.resolve(lifts);
                });

            return def.promise;
        }

        function destroy(id) {
            var def = $q.defer();

            var lift = new Stamplay.Cobject('lifts').Model;
            lift.fetch(id)
                .then(function() {
                    return lift.destroy();
                })
                .then(function(){
                    def.resolve({success: true});
                });

            return def.promise;
        }
    }

})();

(function() {

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

        /////////////////////////////////////

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
                    def.reject({
                        'error': 'Unable to login.'
                    });
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
