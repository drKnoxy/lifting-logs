(function() {
    angular
        .module('app.home', [])
        .controller('HomeController', ['Lifts', HomeController]);

    function HomeController(Lifts) {
        var vm = this;

        vm.liftGroups = [];
        vm.selectedGroup = {};

        activate();

        /////////////////////////////////////

        function activate() {
            // Get the lift groups
            Lifts.getGroups()
                .then(function(data) {
                    vm.liftGroups = data.instance;
                    vm.selectedGroup = vm.liftGroups[0];
                });
        }
    }

})();
