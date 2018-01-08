/**
 * @author Murat Duzgun
 * @license
 * @see
 * License: MIT
 */

function VAFormSpinner($compile) {

	return {
		restrict: 'E',
		replace: true,
		template: '<div class="md-form-overlay"><div class="md-form-spinner"><i class="fa fa-refresh fa-spin fa-4x"></i> </div></div>',
		scope: {
			show: '='
		},
		link: function(scope, $element, $attr) {

			scope.$watch('show', function (newVal) {
				if (newVal) {
					$element.fadeIn();
					scope.showOverlay = true;
				}
				else {
					scope.showOverlay = false;
					$element.fadeOut();
				}
			});

			scope.showOverlay = false;

			$element.append($compile('<div ng-show="showOverlay"></div>')(scope));
		}
	}
}