(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('User', UserService);

    UserService.$inject = ['$q', 'exception', 'logger', '$stamplay'];

    /* @ngInject */
    function UserService($q, exception, logger, $stamplay) {
        var service = {
            getCurrent: getCurrent,
            logout: logout
        };

        function getCurrent() {
            var deferred = $q.defer();

            // instantiate the user model from the sdk
            var userModel = $stamplay.User().Model;

            userModel.currentUser()
            .then(function() {
                deferred.resolve(userModel);
            })
            .catch(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function logout() {

            // instantiate the user model from the sdk
            var userModel = $stamplay.User().Model;

            userModel.logout();
        }

        return service;
    }
})();
