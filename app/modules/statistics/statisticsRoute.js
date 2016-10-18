'use strict';

/**
 * @ngdoc function
 * @name app.route:statisticsRoute
 * @description
 * # statisticsRoute
 * Route of the app
 */

angular.module('statistics')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('statistics', {
				url:'/statistics',
				templateUrl: 'app/modules/statistics/statistics.html',
				controller: 'StatisticsCtrl',
				controllerAs: 'vm'
			});


	}]);
