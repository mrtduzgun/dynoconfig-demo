
/**
 * @class HttpService
 * */
function HttpService($http, $q, $state, appConstant, utilityService) {

	/**
	 * @readonly
	 * @enum {string}
	 * */
	this.methods = {
		GET: 'GET',
		POST: 'POST',
		DELETE: 'DELETE',
		UPDATE: 'PUT'
	};

	/**
	 * @param {HttpService.methods} method
	 * @param {string} path
	 * @param {Object} [urlParams]
	 * @param {Object} [bodyParams]
	 * @returns {Promise}
	 * */
	this.basicAuthRestRequest = function (method, path, urlParams, bodyParams, userUnique, userPasswd) {

		var defer = $q.defer();

		// =========== authentication control ============

		var headers = {
			Authorization: 'Basic ' + utilityService.base64().encode(userUnique + ':' + userPasswd)
		};

		_request(method, path, urlParams, bodyParams, headers)
			.then(function (res) {
				if ([200, 201].indexOf(res.status) >= 0)
					defer.resolve(res.data);
			})
			.catch(function (res) {
				defer.reject(res);
			});

		return defer.promise;
	};

	/**
	 * @param {HttpService.methods} method
	 * @param {string} path
	 * @param {Object} [urlParams]
	 * @param {Object} [bodyParams]
	 * @returns {Promise}
	 * */
	this.request = function (method, path, urlParams, bodyParams) {

		var defer = $q.defer();

		_request(method, path, urlParams, bodyParams)
			.then(function (res) {
				if (res.status == 200) {
					defer.resolve(res.data);
				}
			})
			.catch(function (error) {
				defer.reject(error);
			});

		return defer.promise;
	};

	this.get = function (url, options) {

		var defer = $q.defer();

		$http
			.get(url, options)
			.then(function (res) {
				if (res.status == 200) {
					defer.resolve(res.data);
				}
			})
			.catch(function (error) {
				defer.reject(error);
			})
		;

		return defer.promise;
	};

	function _request(method, path, urlParams, bodyParams, headers) {

		var defaults = {
			method: new HttpService().methods.GET,
			withCredentials: false,
			cache: false,
			headers: headers || {}
		};

		return $http($.extend(true, {}, defaults, {
			method: method,
			url: appConstant.getBaseApiUrl() + path,
			params: urlParams,
			data: bodyParams
		}));
	}
}