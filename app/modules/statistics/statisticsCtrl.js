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

		Statistics.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Statistics() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
