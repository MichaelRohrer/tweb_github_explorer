(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:page3Service
	 * @description
	 * # page3Service
	 * Service of the app
	 */

  	angular
		.module('page3')
		.factory('Page3Service', Page3);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Page3.$inject = ['$http'];

		function Page3 ($http) {

		}

})();
