
function StringService() {

	return {
		replaceAll: function (val, delimiter) {
			return val ? val.replace(/ /g, delimiter) : null;
		},
		
		removeProtocolFromUrl: function (url) {
			return url.replace(/.*?:\/\//g, "");
		}
	};
}