
/**
 * @author Murat Duzgun
 * */
function ValidatorService() {

	return {
		isBlank: function (val) {
			return this.isUndefinedOrNull(val) || val.trim().length === 0;
		},
		isValidUrl: function(val) {
			return /^([a-zA-Z0-9\+\-\.]*\:\/\/)?(([a-zA-Z0-9\-\._]+(\.[a-zA-Z0-9\-\._]+)+)|localhost)(\/?)([a-zA-Z0-9\%\$\-\_\.\+\!\*\'\(\)\,\~\#\;\/\?\:\@\&\=]*)?([\d\w%\$\-_\.\+!\*'\(\),~#;\/\?:@&=]*)$/.test(val);
		},
		isValidDomain: function (val) {
			return /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/.test(val);
		},
		isValidIP: function (val) {
			return /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/.test(val);
		},
		isValidCIDR: function (val) {
			return /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])(\/([0-9]|[12][0-9]|3[0-2]))$/.test(val);
		},
		isValidIPv4CIDR: function (val) {
			return /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])(\/([0-9]|[12][0-9]|3[0-2]))?$/.test(val);
		},
		isValidEmail: function (val) {
			return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/.test(val);
		},
		isValidVLAN: function (val) {
			return /^[A-Fa-f0-9]{3}$/.test(val);
		},
		isValidMPLS: function (val) {
			return /^[A-Fa-f0-9]{2}$/.test(val);
		},
		isFunction: function (functionToCheck) {
			var getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		},
		isString: function (obj) {
			return toString.call(obj) == '[object String]';
		},
		isUndefinedOrNull: function (val) {
			return angular.isUndefined(val) || val === null;
		}
	};
}