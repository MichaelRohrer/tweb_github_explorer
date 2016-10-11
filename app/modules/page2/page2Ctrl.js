(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:page2Ctrl
	* @description
	* # page2Ctrl
	* Controller of the app
	*/

  	angular
		.module('page2')
		.controller('Page2Ctrl', Page2);

		function Page2($scope, $http) {

            var vm = this;

			vm.owner = "MichaelRohrer";
			vm.repo = "tweb_github_explorer";

            callRepoStatAPI(vm, $http);
		}

		function callRepoStatAPI($scope, $http) {

			var url = "https://api.github.com";
			var repos = "/repos";
			//var owner = '/' + $scope.owner;
			//var repo = '/' + $scope.repo;

			var owner = '/' + "MichaelRohrer";
			var repo = '/' + "tweb_github_explorer";

			var stats = "/stats";
			var contributors = "/contributors";

			var fullurl = url + repos + owner + repo + stats + contributors;


			//Get contributors list with additions, deletions, and commit counts
			$http.get(fullurl)
				.then(function(response) {

					$scope.data = response.data;
                    formatToDisplayableData($scope);

				});
		}

		function formatToDisplayableData($scope){


		    var obj = angular.fromJson($scope.data);

            var data = [];
            var label = [];

            for(var i = 0; i < obj.length; ++i){
                label.push(obj[i].author.login);
                data.push(obj[i].total);
            }
            $scope.labels = label;
            $scope.data = data;
        }
})();
