
function ConfigurationRecordAddCtrl($scope, alertService, validatorService, addConfigurationRecord, getAvailableConfigurationTypes) {

	$scope.newConfiguration = {
		active: true
	};
	$scope.availableTypes = getAvailableConfigurationTypes();

	$scope.$watch('newConfiguration.type', function (newVal) {
	   if (newVal === 'BOOLEAN')
           $scope.newConfiguration.value = '1';
	   else
           $scope.newConfiguration.value = null;
    });

	$scope.addConfigurationRecord = function () {

	    if (validatorService.isBlank($scope.newConfiguration.name) ||
            validatorService.isBlank($scope.newConfiguration.appName) ||
            validatorService.isBlank($scope.newConfiguration.value)) {

	        alertService.error("All fields are required!");
	        return false;
        }

        $scope.dataWaiting = true;
        addConfigurationRecord($scope.newConfiguration,
            function (res) {
                $scope.logger.debug(res);
                alertService.success();
            },
            function () {
                $scope.dataWaiting = false;
            }
        );
    }
}
