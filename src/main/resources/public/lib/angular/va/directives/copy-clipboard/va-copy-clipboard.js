
/**
 * Angular directive for ZeroClipboard plugin
 *
 * @author Murat Duzgun
 * @license zeroclipboard/zeroclipboard
 * @see https://github.com/zeroclipboard/zeroclipboard
 * License: MIT
 */
function VACopyClipboard() {

	return {
		restrict: 'A',
		link: function(scope, $element, $attr) {

			var defaults = {
			};

			var options = angular.extend({}, defaults, scope.$eval($attr.copyClipboard));

			ZeroClipboard.config(options);

			var client = new ZeroClipboard($($element));

			client.on("copy", function (e) {
				console.log(options.text);
				client.setText(options.text);
			});

			client.on("aftercopy", function(e) {
				console.log(options.afterCopyText);
				//$("#global-zeroclipboard-html-bridge").attr("title", "Copied!").tooltip("fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("fixTitle");
			});
		}
	};

}