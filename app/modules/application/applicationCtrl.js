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

				//console.log($scope.owner, $scope.repo);

				//Post the given owner/repo to the server which will store those data in a db to make stats about it
				$http.post("/stats", { owner: $scope.owner, repo: $scope.repo });

				//Fetch GitHub data and extract statistics
				callRepoStatAPI($http, $scope);
				getApiPunchCard($http, $scope);
			}
		}

	//Get contributors list with additions, deletions, and commit counts.
	//Then format the data to get the number of commit per contributor.
	//Prepare the scope to display the data.
	function callRepoStatAPI($http, vm) {

		//Prepare the url and options to fetch the data
		var token = "fbf89b6988d4aa95fdc31246f6c906235afeb762";
		var url = "https://api.github.com";
		var repos = "/repos";
		var stats = "/stats";
		var contributors = "/contributors";
		var options = {
			headers: {'Authorization': 'token '+token}
		};

		var fullurl = url + repos + "/" + vm.owner + "/" + vm.repo + stats + contributors;

		//Get contributors list with additions, deletions, and commit counts
		$http.get(fullurl, options)
			.then(function(response) {
				vm.data = response.data;
				formatToDisplayableData(vm);
			});
	}

	//Get the number of commits per hour in each day
	//Then format the data to get the number of commits per day in a week.
	//Prepare the scope to display the data.
	function getApiPunchCard($http, vm){

		//Prepare the url and options to fetch the data
		var token = "fbf89b6988d4aa95fdc31246f6c906235afeb762";
		var url = "https://api.github.com";
		var repos = "/repos";
		var stats = "/stats";
		var contributors = "/punch_card";
		var options = {
			headers: {'Authorization': 'token '+token}
		};

		var fullurl = url + repos + "/" + vm.owner + "/" + vm.repo + stats + contributors;

		//Get the number of commits per hour in each day
		$http.get(fullurl, options)
			.then(function(response) {
				vm.punchCard = response.data;
				formatPunchCard(vm);
			});
	}

	//Format the data to get the number of commits per day in a week.
	//Prepare the scope to display the data.
	function formatPunchCard(vm){

		//Prepare the scope to display the data.
		vm.data1 = [0, 0, 0, 0, 0, 0, 0];
		vm.labels1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		vm.series1 = ["Series A"];

		//Format the data to get the number of commits per day in a week.
		var j = 0;
		for(var i = 0; i < 7; ++i){
			while(j < (i+1)*24){
				vm.data1[i] += vm.punchCard[j][2];
				j++;
			}
		}
	}

	//Format the data to get the number of commit per contributor.
	//Prepare the scope to display the data.
	function formatToDisplayableData(vm){

		var obj = angular.fromJson(vm.data);

		var data = [];
		var label = [];

		//Format the data to get the number of commit per contributor
		for(var i = 0; i < obj.length; ++i){
			label.push(obj[i].author.login);
			data.push(obj[i].total);
		}

		//Prepare the scope to display the data
		vm.labels = label;
		vm.data = data;
	}

})();
