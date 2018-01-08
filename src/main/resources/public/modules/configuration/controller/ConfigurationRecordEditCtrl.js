
function ConfigurationRecordEditCtrl($scope, $stateParams, validatorService, alertService, updateConfigurationRecord,
									 getAvailableConfigurationTypes, getConfigurationRecordById) {

    $scope.updatedConfiguration = {
        active: true
    };
    $scope.availableTypes = getAvailableConfigurationTypes();

    $scope.$watch('updatedConfiguration.type', function (newVal, oldValue) {
        console.log(newVal);

        if (oldValue) {
            if (newVal === 'BOOLEAN')
                $scope.updatedConfiguration.value = '1';
            else
                $scope.updatedConfiguration.value = null;
        }
    });

    getConfigurationRecordById($stateParams.recordId,
        function (res) {
            $scope.logger.debug("Record loaded..", res);
            angular.merge($scope.updatedConfiguration, res.data);
        },
        function () {
            $scope.dataWaiting = false;
        });

    $scope.editConfigurationRecord = function () {

        if (validatorService.isBlank($scope.updatedConfiguration.name) ||
            validatorService.isBlank($scope.updatedConfiguration.appName) ||
            validatorService.isBlank($scope.updatedConfiguration.value)) {

            alertService.error("All fields are required!");
            return false;
        }

        $scope.dataWaiting = true;
        updateConfigurationRecord($stateParams.recordId, $scope.updatedConfiguration,
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
