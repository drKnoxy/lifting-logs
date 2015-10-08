(function(){

	angular
		.module('LiftsService', ['angular-stamplay'])
		.factory('Lifts', ['$q', '$stamplay', LiftsService]);

	function LiftsService($q, $stamplay) {

		return {
			getGroups: getGroups
		};

		function getGroups() {
			var deferred = $q.defer();

			var collection = $stamplay.Cobject('liftgroups').Collection;

			collection.fetch()
				.then(function() {
					deferred.resolve( collection );
				});

			return deferred.promise;
		}

		return service;
	}
})();