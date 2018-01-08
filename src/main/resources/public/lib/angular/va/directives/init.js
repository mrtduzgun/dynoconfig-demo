

(function(angular) {

	'use strict';

	angular
		.module('va.directives', [])
		.directive('leftmenu', VALeftMenu)
		.directive('formSpinner', VAFormSpinner)
		.directive('dateRangePicker', VADateRangePicker)
		.directive('onReadFile', VAFileRead)
		;

})(angular);