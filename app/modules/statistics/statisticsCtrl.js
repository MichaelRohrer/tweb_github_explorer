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
			/*jshint validthis: true */
			var vm = this;


			$http.get("/stats")
				.then(function(response) {
					//console.log(response);
					$scope.data2 = response.data.data;
					$scope.labels2 = response.data.labels;
					console.log($scope.data2);
					console.log($scope.labels2);

				});
		}

})();