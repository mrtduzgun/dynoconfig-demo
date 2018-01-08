/**
 * @author Murat Duzgun
 * @license
 * @see
 * License: MIT
 */
function VACuteSpinner($compile) {

	return {
		restrict: 'E',
		replace: true,
		template: '<div class="la-ball-atom la-dark la-2x" style="position: fixed;left: 44%; right: 44%;z-index: 99999; top:44%;display: none;"><div></div><div></div><div></div><div></div></div>',
		scope: {
			conf: '=',
			show: '='
		},
		link: function(scope, $element, $attr) {

			var parentElm = $element.parent();

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

			scope.overlayCssProp = {
				position: 'fixed',
				"z-index": 9999,
				background: '#000',
				opacity: '0.2',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				cursor: 'wait'
			};

			scope.showOverlay = false;

			parentElm.append($compile('<div ng-style="overlayCssProp" ng-show="showOverlay"></div>')(scope));
		}

	};
}