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

