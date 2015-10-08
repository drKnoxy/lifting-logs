(function() {
    angular
        .module('app.auth', [])
        .controller('AuthController', ['User', '$rootScope', '$state', AuthController]);

    function AuthController(User, $rootScope, $state) {
        var auth = this;

        auth.signupData = {};
        auth.loginData = {};

        auth.signup = signup;
        auth.login = login;

        function signup() {
            User.signup(auth.signupData)
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
            User.login(auth.loginData)
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

