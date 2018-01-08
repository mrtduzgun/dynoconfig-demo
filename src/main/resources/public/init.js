(function(angular) {

	'use strict';

	angular
		.module('dynoconfigUI', [
			'ngSanitize', 'ngTouch', 'ngAnimate', 'ngCookies',
			'ui.router', 'ui.bootstrap', 'ui.select',
            'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.autoResize',
			'va',
			'modules.configuration'
		])
		.constant('appConstant', {
			defaultLang: 'en',
			env: 'dev', // dev, stage, prod
			debug: true,
			rootPath: '/manage',
			homeSref: 'twoColumn.configuration',
			getBaseApiUrl: function () {
				return this.rootPath + '/';
			}
		})
		.service('confirm', function ($uibModal) {
			return function (title, content, okClicked) {

				$uibModal.open({
					templateUrl: 'layout/view/tpl/confirm-modal.html',
					size: 'sm',
					controller: function ($scope, $uibModalInstance) {
						$scope.title = title;
						$scope.content = content;
						$scope.ok = function () {
							$scope.waiting = true;
							okClicked()
								.finally(function () {
									$scope.waiting = false;
									$uibModalInstance.close();
								})
							;
						};

						$scope.cancel = function () {
							$scope.waiting = false;
							$uibModalInstance.dismiss();
						};
					}
				});
			}
		})
		.service('apiRequest', function ($q, $state, httpService, authService, alertService, appConstant, $rootScope) {
			return function (method, path, urlParams, bodyParams, successCallback, errorCallback, finallyCallback) {

				httpService
					.request(method, path, urlParams, bodyParams)
					.then(function (res) {
						if (successCallback)
							successCallback(res);
					})
					.catch(function (res) {

						$rootScope.logger.debug('Request Status :', res.statusText);

						if (res.status !== 200) {
                            if (res.status === -1) {
                                alertService.error('Network down!');
                            } else
								alertService.error(res.data.message);

						} else if (errorCallback) {
							errorCallback(res);

						} else {
							alertService.error(res.data.message);
						}
					})
					.finally(function () {
						if (finallyCallback)
							finallyCallback();
					})
				;
			};
		})
		.config(function ($stateProvider, $urlRouterProvider, $compileProvider, $logProvider, uiSelectConfig,
						  appConstant) {

			$logProvider.debugEnabled(appConstant.debug);
			$compileProvider.debugInfoEnabled(appConstant.debug);

			LayoutStateMap($stateProvider, $urlRouterProvider, appConstant);

			uiSelectConfig.theme = 'bootstrap';
		})
		.run(function ($rootScope, $state, $stateParams, appConstant, i18nService, authService, $log) {

			$log.log('Debug Mode: ', appConstant.debug ? 'On' : 'Off');

			$rootScope.logger = $log;

			$rootScope.$on('$stateChangeStart', function(evt, to, params) {

				if (to.redirectTo) {
					evt.preventDefault();
					$state.go(to.redirectTo, params)
				}
			});

			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		})
	;

})(angular);