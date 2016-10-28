(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:statisticsCtrl
	* @description
	* # statisticsCtrl
	* Controller of the app
	*/

  	angular
		.module('statistics')
		.controller('StatisticsCtrl', Statistics);


		function Statistics($scope, $http) {

			var vm = this;

			//Fetch the stat of the five most visited repositories
			$http.get("/stats")
				.then(function(response) {
					//Put the data into the scope to display it.
					$scope.data2 = response.data.data;
					$scope.labels2 = response.data.labels;
				});
		}
})();