(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

  	angular
		.module('githubexplorer')
		.factory('MenuService', Menu);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Menu.$inject = ['$http'];

		function Menu ($http) {

			var menu = [
				
					{
						link: 'application',
							name: 'Application'
					},
			    
					{
						link: 'statistics',
							name: 'Statistics'
					},
			    
		  	];

			return {
				listMenu: function () {
					return menu;
				}
		  	}

		}

})();
