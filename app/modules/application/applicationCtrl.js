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

			//Called when the user post the form
			$scope.update = function(){
				//Post the given owner/repo to the server which will store those data in a db to make stats about it
				//$http.post("/stats", { owner: $scope.owner, repo: $scope.repo });


				//Fetch GitHub data and extract statistics
				getApiContributorsList($http, $scope);
				getApiPunchCard($http, $scope);
			}
		}

	//Get contributors list with additions, deletions, and commit counts.
	//Then format the data to get the number of commit per contributor.
	//Prepare the scope to display the data.
	function getApiContributorsList($http, $scope) {

		//Prepare the url and options to fetch the data
		var token = "fbf89b6988d4aa95fdc31246f6c906235afeb762";
		var url = "https://api.github.com";
		var repos = "/repos";
		var stats = "/stats";
		var contributors = "/contributors";
		var options = {
			headers: {'Authorization': 'token '+token}
		};

		var fullUrl = url + repos + "/" + $scope.owner + "/" + $scope.repo + stats + contributors;

		//Get contributors list with additions, deletions, and commit counts
		$http.get(fullUrl, options).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.success = true;
			$scope.data = response.data;
			$http.post("/stats", { owner: $scope.owner, repo: $scope.repo });
			formatContributorsList($scope);

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			$scope.success = false;
			console.log("error");

		});
	}

	//Get the number of commits per hour in each day
	//Then format the data to get the number of commits per day in a week.
	//Prepare the scope to display the data.
	function getApiPunchCard($http, $scope){

		//Prepare the url and options to fetch the data
		var token = "fbf89b6988d4aa95fdc31246f6c906235afeb762";
		var url = "https://api.github.com";
		var repos = "/repos";
		var stats = "/stats";
		var contributors = "/punch_card";
		var options = {
			headers: {'Authorization': 'token '+token}
		};

		var fullurl = url + repos + "/" + $scope.owner + "/" + $scope.repo + stats + contributors;

		//Get the number of commits per hour in each day
		$http.get(fullurl, options)
			.then(function(response) {
				$scope.punchCard = response.data;
				formatPunchCard($scope);
			});
	}

	//Format the data to get the number of commits per day in a week.
	//Prepare the scope to display the data.
	function formatPunchCard($scope){

		//Prepare the scope to display the data.
		$scope.data1 = [0, 0, 0, 0, 0, 0, 0];
		$scope.labels1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		$scope.series1 = ["Series A"];

		//Format the data to get the number of commits per day in a week.
		var j = 0;
		for(var i = 0; i < 7; ++i){
			while(j < (i+1)*24){
				$scope.data1[i] += $scope.punchCard[j][2];
				j++;
			}
		}
	}

	//Format the data to get the number of commit per contributor.
	//Prepare the scope to display the data.
	function formatContributorsList($scope){

		var obj = angular.fromJson($scope.data);

		var data = [];
		var label = [];

		//Format the data to get the number of commit per contributor
		for(var i = 0; i < obj.length; ++i){
			label.push(obj[i].author.login);
			data.push(obj[i].total);
		}

		//Prepare the scope to display the data
		$scope.labels = label;
		$scope.data = data;
	}

})();
