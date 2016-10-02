(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:page1Service
	 * @description
	 * # page1Service
	 * Service of the app
	 */

  	angular
		.module('page1')
		.factory('Page1Service', Page1);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Page1.$inject = ['$http'];

		function Page1 ($http) {

		}

})();
