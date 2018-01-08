/**
 * @author Murat Duzgun
 * @license
 * @see
 * License: MIT
 */


function VALeftMenu($state) {

	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		templateUrl: 'lib/angular/va/directives/left-menu/tpl.html',
		scope: {
			items: '='
		},
		link: function(scope, $element, $attr, ctrl, transclude) {

			transclude(scope, function(clone) {
				angular.element($element[0].querySelector('.navbar-brand')).append(clone);
			});
			
			scope.toggleCollapse = function (itemIndex) {

				for (var i=0; i<scope.items.length; ++i) {
					if (i == itemIndex) {
						scope.items[i].open = !scope.items[i].open;
						scope.items[i].selected = true;
					} else {
						scope.items[i].open = scope.items[i].selected = false;
					}
				}

				return false;
			};

			scope.makeLink = function (itemIndex, parentItemIndex) {
				var navigatedSref;

				for (var i=0; i<scope.items.length; ++i) {

					if (!angular.isDefined(parentItemIndex)) {
						if (i == itemIndex) {
							navigatedSref = $state.href(scope.items[i].sref);
						}
					}
					else {
						if (scope.items[i].children) {
							for (var j=0; j<scope.items[i].children.length; ++j) {
								if(scope.items[i].children[j].selected && scope.items[i].children[j].sref) {
									navigatedSref = $state.href(scope.items[i].children[j].sref);
								}
							}
						}
					}
				}

				return navigatedSref;
			};

			scope.childrenSelected = function (parentIndex, itemIndex) {

				for (var i=0; i<scope.items.length; ++i) {

					if (scope.items[i].children) {
						for (var j=0; j<scope.items[i].children.length; ++j) {
							scope.items[i].children[j].selected = (i == parentIndex && j == itemIndex);
						}
					}
				}

				return false;
			};
		}
	};

}