(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:page3Test
	 * @description
	 * # page3Test
	 * Test of the app
	 */

	describe('page3 test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('github-explorer');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('Page3Ctrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
