(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:page1Ctrl
	* @description
	* # page1Ctrl
	* Controller of the app
	*/

  	angular
		.module('page1')
		.controller('Page1Ctrl', Page1);

		Page1.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Page1() {
			/*jshint validthis: true */
			var vm = this;

			vm.title = "Welcome to GitHub Explorer!";
		}

})();
