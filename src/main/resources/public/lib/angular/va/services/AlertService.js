
/**
 * @author Murat Duzgun
 * @required toastr library
 * */

function AlertService() {

	var toastrOptions = {
		newestOnTop: true,
		preventDuplicates: true,
		timeOut: 1500
	};

	return {
		success: function(message, title, afterCallback) {
			return this.show('success', message, title, afterCallback);
		},
		error: function(message, title, afterCallback) {
			return this.show('fail', message, title, afterCallback);
		},
		show: function (type, message, title, afterCallback) {

			toastr.options = angular.extend({}, toastr.options, {
				onHidden: afterCallback
			}, toastrOptions);

			switch (type) {
				case 'success':
				{
                    toastr.success('Successfully completed..');
					break;
				}
				case 'fail':
				{
                    toastr.error(message);
				}
			}
		}
	};
}