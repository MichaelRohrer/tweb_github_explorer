(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:applicationCtrl
	* @description
	* # applicationCtrl
	* Controller of the app
	*/

  	angular
		.module('application')
		.controller('ApplicationCtrl', Application);

		function Application($scope, $http) {

			$scope.update = function(){

				console.log($scope.owner, $scope.repo);
				callRepoStatAPI($http, $scope);
				getApiPunchCard($http, $scope);

			}
		}


	function callRepoStatAPI($http, vm) {

		var url = "https://api.github.com";
		var repos = "/repos";
		var stats = "/stats";
		var contributors = "/contributors";

		var fullurl = url + repos + "/" + vm.owner + "/" + vm.repo + stats + contributors;

		//Get contributors list with additions, deletions, and commit counts
		$http.get(fullurl)
			.then(function(response) {
				vm.data = response.data;
				formatToDisplayableData(vm);
			});
	}

	function getApiPunchCard($http, vm){

		var url = "https://api.github.com";
		var repos = "/repos";
		var stats = "/stats";
		var contributors = "/punch_card";

		var fullurl = url + repos + "/" + vm.owner + "/" + vm.repo + stats + contributors;

		//Get contributors list with additions, deletions, and commit counts
		$http.get(fullurl)
			.then(function(response) {

				vm.punchCard = response.data;
				formatPunchCard(vm);
			});
	}

	function formatPunchCard(vm){

		vm.data1 = [0, 0, 0, 0, 0, 0, 0];
		vm.labels1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		vm.series1 = ["Series A"];

		var j = 0;
		for(var i = 0; i < 7; ++i){
			while(j < (i+1)*24){
				vm.data1[i] += vm.punchCard[j][2];
				j++;
			}
		}
	}

	function formatToDisplayableData(vm){

		var obj = angular.fromJson(vm.data);

		var data = [];
		var label = [];

		for(var i = 0; i < obj.length; ++i){
			label.push(obj[i].author.login);
			data.push(obj[i].total);
		}
		vm.labels = label;
		vm.data = data;
	}

})();
