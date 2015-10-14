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
