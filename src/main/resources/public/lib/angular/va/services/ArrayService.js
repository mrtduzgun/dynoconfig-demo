
function ArrayService(validatorService) {

	return {
		isArray: function (obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		},

		pushIfIsNotExist: function (srcArr, item, comparator) {
			if (!this.contains(srcArr, item, comparator)) {
				srcArr.push(item);
			}

			return srcArr;
		},

		contains: function (srcArr, item, comparator) {

			for (var i = 0; i < srcArr.length; ++i) {
				if (validatorService.isFunction(comparator)) {
					if (comparator(srcArr[i], item))
						return true;
				} else if (srcArr[i] == item){
					return true;
				}
			}

			return false;
		},

		unique: function(arr) {
			var a = [];
			for (i = 0; i < arr.length; i++ ) {
				var current = arr[i];
				if (a.indexOf(current) < 0) a.push(current);
			}
			return a;
		},

		removeItems: function(srcArr, eliminatedArr) {
			var tmp = [];
			for (var i=0; i<srcArr.length; ++i) {
				if (eliminatedArr.indexOf(srcArr[i]) < 0) {
					tmp.push(srcArr[i]);
				}
			}
			return tmp;
		},

		findDuplicates: function(srcArr, targetArr) {
			var tmp = [];
			for (i=0; i<srcArr.length; ++i) {
				if (targetArr.indexOf(srcArr[i]) >= 0) {
					tmp.push(srcArr[i]);
				}
			}
			return tmp;
		},
		getObjectByKey: function(arr, key, value){
			for( var i=0; i<arr.length; i++ )
				if( arr[i][key] === value )
					return arr[i];
			return null;
		}
	};
}