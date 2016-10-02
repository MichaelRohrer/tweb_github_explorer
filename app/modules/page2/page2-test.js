(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:page2Test
	 * @description
	 * # page2Test
	 * Test of the app
	 */

	describe('page2 test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('github-explorer');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('Page2Ctrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
