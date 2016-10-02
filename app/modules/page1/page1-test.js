(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:page1Test
	 * @description
	 * # page1Test
	 * Test of the app
	 */

	describe('page1 test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('github-explorer');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('Page1Ctrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
