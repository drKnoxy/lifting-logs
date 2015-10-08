(function(){

	angular
		.module('LiftsService', ['angular-stamplay'])
		.factory('Lifts', LiftsService);

	function LiftsService($q, $stamplay) {
		var service = {
			getAll: getAll
		}

		function getAll() {
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