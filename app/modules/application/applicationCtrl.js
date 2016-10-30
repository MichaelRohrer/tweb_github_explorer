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

		function Application($scope, $http, $q) {

			//Called when the user post the form
			$scope.update = function(){

				//Fetch GitHub data and extract statistics
				fetchApiData($scope, $http, $q);
			}
		}
	
	//Fetch GitHub data and extract statistics
	function fetchApiData($scope, $http, $q){

		console.log("Fetching data...");

		//Prepare the url and options to fetch the data
		var token = "fbf89b6988d4aa95fdc31246f6c906235afeb762";
		var options = {
			headers: {'Authorization': 'token '+token}
		};
		var uri = "https://api.github.com/repos" + "/" + $scope.owner + "/" + $scope.repo + "/stats";

		//Async api requests
		var first  = $http.get(uri + "/contributors", options), //Get contributors list with additions, deletions, and commit counts.
			second = $http.get(uri + "/punch_card", options); //Get the number of commits per hour in each day


		$q.all([first, second]).then(function(result) {

			var tmp = [];
			angular.forEach(result, function(response) {
				tmp.push(response.data);
			});

			console.log("Data fetched!");
			$scope.success = true;
			return tmp;

		}, function (error) {

			console.log("Error 404 not found !")
			$scope.success = false;
			return $q.reject(error);

		}).then(function(tmpResult) {

			//Format the data to get the number of commit per contributor.
			formatContributorsList($scope, tmpResult[0]);
			//format the data to get the number of commits per day in a week.
			formatPunchCard($scope, tmpResult[1]);

		}).then(function () {

			//Post the given owner/repo to the server
			sendStatistics($http, $scope);

		});
	}


	//Post the given owner/repo to the server which will store those data in a db to make stats
	function sendStatistics($http, $scope){
		console.log("Sending statistics...")
		return $http.post("/stats", { owner: $scope.owner, repo: $scope.repo })
			.then(function () {
				console.log("Statistics sent!");
			});
	}

	//Format the data to get the number of commit per contributor.
	//Prepare the scope to display the data.
	function formatContributorsList($scope, contribList){

		var obj = angular.fromJson(contribList);

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

		console.log("Data formatted!");
	}

	//Format the data to get the number of commits per day in a week.
	//Prepare the scope to display the data.
	function formatPunchCard($scope, punchCard){

		//Prepare the scope to display the data.
		$scope.data1 = [0, 0, 0, 0, 0, 0, 0];
		$scope.labels1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		$scope.series1 = ["Series A"];

		//Format the data to get the number of commits per day in a week.
		var j = 0;
		for(var i = 0; i < 7; ++i){
			while(j < (i+1)*24){
				$scope.data1[i] += punchCard[j][2];
				j++;
			}
		}
	}
})();
