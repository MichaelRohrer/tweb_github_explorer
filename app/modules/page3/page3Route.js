'use strict';

/**
 * @ngdoc function
 * @name app.route:page3Route
 * @description
 * # page3Route
 * Route of the app
 */

angular.module('page3')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('page3', {
				url:'/page3',
				templateUrl: 'app/modules/page3/page3.html',
				controller: 'Page3Ctrl',
				controllerAs: 'vm'
			});


	}]);
