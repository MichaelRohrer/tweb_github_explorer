'use strict';

/**
 * @ngdoc function
 * @name app.route:page1Route
 * @description
 * # page1Route
 * Route of the app
 */

angular.module('page1')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('page1', {
				url:'/page1',
				templateUrl: 'app/modules/page1/page1.html',
				controller: 'Page1Ctrl',
				controllerAs: 'vm'
			});


	}]);
