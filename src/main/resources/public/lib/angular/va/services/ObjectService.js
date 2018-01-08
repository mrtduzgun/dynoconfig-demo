
function ObjectService() {

	this.guid = function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	};

	this.getValues = function(obj) {
		var values = [];
		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				values.push(obj[k]);
			}
		}
		return values;
	};

	this.getByDotNotation = function (obj, objPath) {
		objPath = objPath.split(".");
		for (var i = 0; i < objPath.length && obj; i++)
			obj = obj[objPath[i]];
		return obj;
	};
}