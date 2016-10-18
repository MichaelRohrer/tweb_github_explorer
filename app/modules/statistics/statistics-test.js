(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:statisticsTest
	 * @description
	 * # statisticsTest
	 * Test of the app
	 */

	describe('statistics test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('githubexplorer');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('StatisticsCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
