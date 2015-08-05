(function () {
    'use strict';

    angular
        .module('app.core', [
            // Google team
            'ngAnimate',
            'ngSanitize',

            // Base things
            'blocks.exception',
            'blocks.logger',
            'blocks.router',

            // 3rd party
            'ui.router',
            'ngplus',
            'angular-stamplay'
        ]);
})();
