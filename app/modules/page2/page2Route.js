'use strict';

/**
 * @ngdoc function
 * @name app.route:page2Route
 * @description
 * # page2Route
 * Route of the app
 */

angular.module('page2')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('page2', {
				url:'/page2',
				templateUrl: 'app/modules/page2/page2.html',
				controller: 'Page2Ctrl',
				controllerAs: 'vm'
			});


	}]);
