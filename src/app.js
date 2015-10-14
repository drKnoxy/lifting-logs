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
