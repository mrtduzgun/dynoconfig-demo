
(function(angular) {
	'use strict';

	angular
		.module('modules.configuration', ['ui.router'])
		.service('getConfigurationRecords', function (httpService, apiRequest) {
			return function (successCallback, finallyCallback) {

				apiRequest(httpService.methods.GET, 'list/', null, null, function (res) {
					successCallback(res);

				}, null, finallyCallback);
			}
		})
        .service('getConfigurationRecordById', function (httpService, apiRequest) {
            return function (recordId, successCallback, finallyCallback) {

                apiRequest(httpService.methods.GET, '/' + recordId, null, null, function (res) {
                    successCallback(res);

                }, null, finallyCallback);
            }
        })
        .service('addConfigurationRecord', function (apiRequest, httpService) {
            return function (newRecord, successCallback, finallyCallback) {
                return apiRequest(httpService.methods.POST, 'add', null, newRecord, successCallback, null, finallyCallback);
            }
        })
        .service('updateConfigurationRecord', function (apiRequest, httpService) {
            return function (recordId, record, successCallback, finallyCallback) {
                return apiRequest(httpService.methods.POST, 'edit/' + recordId, null, record, successCallback, null, finallyCallback);
            }
        })
        .service('getAvailableConfigurationTypes', function () {
            return function () {
                return ['STRING', 'INTEGER', 'DOUBLE', 'BOOLEAN'];
            }
        })
		.config(function ($stateProvider) {
			TrainerStateMap($stateProvider);
		});

})(angular);