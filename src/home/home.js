(function(){
	angular
		.module('app.home', [])
		.controller('HomeController', ['Lifts', HomeController]);

	function HomeController(Lifts) {
		var home = this;

		home.liftGroups = [];
		home.selectedGroup = {};

		Lifts.getGroups()
			.then(function(data) {
				home.liftGroups = data.instance;
				home.selectedGroup = home.liftGroups[0];
			});


	}
})();
