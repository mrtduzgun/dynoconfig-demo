

/**
 * Angular directive for jquery-expander plugin
 *
 * @author Murat Duzgun
 * @license kswedberg/jquery-expander
 * @see https://github.com/kswedberg/jquery-expander
 * License: MIT
 */
function VATextExpander() {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			var defaults = {
				slicePoint: 10,
				expandText: '<i class="fa fa-arrow-circle-right"></i>',
				userCollapseText: '<i class="fa fa-arrow-circle-left"></i>',
				expandPrefix: '&hellip; ',
				moreClass: 'read-more',
				lessClass: 'read-less'
			};

			var options = angular.extend({}, defaults, scope.$eval(attrs.textExpander));

			angular.element(element).expander(options);
		}
	};

}