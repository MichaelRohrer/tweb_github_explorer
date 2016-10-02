(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:page2Service
	 * @description
	 * # page2Service
	 * Service of the app
	 */

  	angular
		.module('page2')
		.factory('Page2Service', Page2);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Page2.$inject = ['$http'];

		function Page2 ($http) {

		}

})();
