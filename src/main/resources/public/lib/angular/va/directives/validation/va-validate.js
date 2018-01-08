/**
 * @author Murat Duzgun
 * @license
 * @see
 * License: MIT
 */

(function(angular) {

	'use strict';

	angular
		.module('va.validate', [])
		.directive('vaValidate', function () {

			return {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, $element, $attr, ctrl) {
					jQuery($element).tooltip();
				}

			};
		});

})(angular);