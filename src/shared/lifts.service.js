(function() {
    angular
        .module('LiftsService', ['angular-stamplay'])
        .factory('Lifts', ['$q', '$stamplay', LiftsService]);

    function LiftsService($q, $stamplay) {

        return {
            all: all,
            get: get,
            create: create,
            destroy: destroy,
            getGroups: getGroups,
        };

        /////////////////////////////////////

        function getGroups() {
            var deferred = $q.defer();

            var collection = $stamplay.Cobject('liftgroups').Collection;

            collection.fetch()
                .then(function() {
                    deferred.resolve(collection);
                });

            return deferred.promise;
        }

        function all(groupId) {
            var def = $q.defer();

            var lifts = new Stamplay.Cobject('lifts').Collection;
            lifts.fetch()
                .then(function() {
                    def.resolve(lifts);
                });

            return def.promise;
        }

        function get(id) {
            var def = $q.defer();

            var lift = new Stamplay.Cobject('lifts').Model;
            lift.fetch(id)
                .then(function() {
                    def.resolve(lifts);
                });

            return def.promise;
        }

        function create(data) {
            var def = $q.defer();

            var lift = new Stamplay.Cobject('lifts').Model;
            lift.set('name', data.name);
            lift.set('for_weight', data.for_weight);
            lift.set('for_reps', data.for_reps);


            lift.save()
                .then(function() {
                    def.resolve(lifts);
                });

            return def.promise;
        }

        function destroy(id) {
            var def = $q.defer();

            var lift = new Stamplay.Cobject('lifts').Model;
            lift.fetch(id)
                .then(function() {
                    return lift.destroy();
                })
                .then(function(){
                    def.resolve({success: true});
                });

            return def.promise;
        }
    }

})();
