/**
 * @author Murat Duzgun
 * @license
 * @see
 * License: MIT
 */

function VAFileRead($parse) {

	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {

			element.bind('click', function () {
				this.value = null;
			});

			element.bind('change', function(e) {

				var onFileReadFn = $parse(attrs.onReadFile);
				var reader = new FileReader();

				reader.onload = function() {

					var fileContents = reader.result;
					// invoke parsed function on scope
					// special syntax for passing in data
					// to named parameters
					// in the parsed function
					// we are providing a value for the property 'contents'
					// in the scope we pass in to the function
					scope.$apply(function() {
						onFileReadFn(scope, {
							'fileContent' : fileContents.trim()
						});
					});
				};
				if (element[0] && element[0].files && element[0].files.length > 0)
					reader.readAsText(element[0].files[0]);
			});
		}
	}
}