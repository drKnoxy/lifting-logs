(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'dataservice', 'logger'];

    /* @ngInject */
    function HomeController($q, dataservice, logger) {
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
