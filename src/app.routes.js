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
            .state('auth', {
                url: '/auth',
                templateUrl: '/auth/auth.html',
                controller: 'AuthController as auth'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: '/admin/admin.html',
                controller: 'AdminController as admin'
            });
    }
})();

