(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];

    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
        };

        return service;
    }
})();
