(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:statisticsService
	 * @description
	 * # statisticsService
	 * Service of the app
	 */

  	angular
		.module('statistics')
		.factory('StatisticsService', Statistics);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Statistics.$inject = ['$http'];

		function Statistics ($http) {

		}

})();
