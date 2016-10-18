'use strict';

/**
 * @ngdoc function
 * @name app.route:applicationRoute
 * @description
 * # applicationRoute
 * Route of the app
 */

angular.module('application')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('application', {
				url:'/application',
				templateUrl: 'app/modules/application/application.html',
				controller: 'ApplicationCtrl',
				controllerAs: 'vm'
			});


	}]);
