(function() {
    angular
        .module('app.home', [])
        .controller('HomeController', ['Lifts', HomeController]);

    function HomeController(Lifts) {
        var vm = this;

        vm.liftGroups = [];
        vm.selectedGroup = {};

        vm.newLiftForm = {};
        vm.newLift = {};
        vm.addLift = addLift;

        activate();

        /////////////////////////////////////

        function activate() {
            // Get the lift groups
            Lifts.getGroups()
                .then(function(data) {
                    vm.liftGroups = data.instance;
                    vm.selectedGroup = vm.liftGroups[0];
                });

            Lifts.all()
                .then(function(data) {
                    vm.lifts = data.instance;
                })
        }

        function addLift() {
            var data = {
                name: vm.newLift.name,
                for: vm.newLift.for,
                group: vm.selectedGroup.instance._id
            };
            console.log(data);

            Lifts.create(data)
                .then(function(data){
                    vm.newLift = {};
                    console.log('success', data);
                })
        }
    }

})();
