

(function(angular) {

	'use strict';

	angular
		.module('va.services', [])
			.factory('arrayService', ['validatorService', function (validatorService) {
				return new ArrayService(validatorService);
			}])
			.factory('objectService', [function () {
				return new ObjectService();
			}])
			.factory('stringService', [function () {
				return new StringService();
			}])
			.factory('cacheService', ['$cookies', 'objectService', function ($cookies, objectService) {
				return new CacheService($cookies, objectService);
			}])
			.factory('validatorService', [function () {
				return new ValidatorService();
			}])
			.factory('utilityService', [function () {
				return new UtilityService();
			}])
			.factory('dateService', [function () {
				return new DateService();
			}])
			.factory('alertService', [function () {
				return new AlertService();
			}])
			.factory('dataExporter', [function () {
				return new DataExporter();
			}])
			.factory('authService', ['$q', 'httpService', 'cacheService', 'appConstant', function ($q, httpService, cacheService, appConstant) {
				return new AuthService($q, httpService, cacheService, appConstant);
			}])
			.factory('httpService', ['$http', '$q', '$state', 'appConstant', 'utilityService', function ($http, $q, $state, appConstant, utilityService) {
				return new HttpService($http, $q, $state, appConstant, utilityService);
			}])
			.service('smoothScrollTo', [function () {
				return function (targetId, topOffset, focusing) {
					var targetObj = $('#' + targetId);

					if (topOffset )
						topOffset += targetObj.offset().top;
					else
						topOffset = targetObj.offset().top;

					$("html, body").animate({scrollTop: topOffset}, {
						duration: 'slow',
							complete: function () {
							if (focusing)
								targetObj.fadeOut('fast', function () {
									targetObj.fadeIn(300);
								});
						}
					});
				}
			}])
		;

})(angular);