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
