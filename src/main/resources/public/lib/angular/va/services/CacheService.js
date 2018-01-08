
/**
 * @required ngCookies module
 * */
function CacheService($cookies) {

	var $lifetime = null; // seconds ("null" means that lives permanent)

	function hasLocalStorage() {
		var test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}

	function CacheObject(data) {

		var $createdDate = new Date();
		var $data = data;

		return {
			getData: function () {
				return $data;
			},
			toJson: function () {
				return JSON.stringify({
					createdDate: $createdDate,
					data: $data
				});
			},
			parseJson: function(json) {
				if (json) {
					var d = JSON.parse(json);
					$createdDate = d.createdDate;
					$data = d.data;
				}
			},
			isExpired: function () {
				return new Date().getTime() <= $createdDate.getTime() - $lifetime;
			}
		};
	}

	return {
		setLifetime: function (lifetime) {
			$lifetime = lifetime;
		},
		save: function(key, data) {
			if (hasLocalStorage()) {
				localStorage.setItem(key, new CacheObject(data).toJson());
			} else {
				$cookies.putObject(key, new CacheObject(data).toJson());
			}
		},
		delete: function(key) {
			if (hasLocalStorage()) {
				localStorage.removeItem(key);
			} else {
				$cookies.remove(key);
			}
		},
		get: function(key) {
			if (hasLocalStorage()) {
				var a = new CacheObject();
				a.parseJson(localStorage.getItem(key));
				return a.getData();
			} else {
				var a = new CacheObject();
				a.parseJson($cookies.getObject(key));
				return a.getData();
			}
		},
		isExist: function(key) {

			function checkExpiration(obj) {
				if (obj != null) {
					if (obj.isExpired()) {
						CacheService.delete(key);
						return false;
					}
					return true;
				}
				return false;
			}

			return checkExpiration(new CacheService().get());
		}
	};
}