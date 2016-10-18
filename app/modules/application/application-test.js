(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:applicationTest
	 * @description
	 * # applicationTest
	 * Test of the app
	 */

	describe('application test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('githubexplorer');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('ApplicationCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
