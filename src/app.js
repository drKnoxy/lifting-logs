(function() {

    angular
        .module('app', [
            // Third Party
            'angular-stamplay',
            'ui.router',

            // Local
            'app.routes',
            'UserService',
            'LiftsService',
            'home'
        ])
        .controller('AppController', AppController);

    function AppController() {
        var vm = this;
    }

})();

