(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'logger'];

    /* @ngInject */
    function HomeController($q, logger) {
        var vm = this;
        vm.news = {
            title: 'logs',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.title = 'Home';

        activate();

        function activate() {
            // logger.info('Activated Home View');
        }

    }
})();
