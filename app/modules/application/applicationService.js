(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:applicationService
	 * @description
	 * # applicationService
	 * Service of the app
	 */

  	angular
		.module('application')
		.factory('ApplicationService', Application);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Application.$inject = ['$http'];

		function Application ($http) {

		}

})();
