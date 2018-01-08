
function ConfigurationRecordListingCtrl($scope, $q, getConfigurationRecords) {

	$scope.gridOptions = {
		columnDefs: [			
			{ name:'name', display: 'Name', width:'20%'},
			{ name:'type', displayName: 'Type', width:'12%', enableFiltering: false},
			{ name:'value', displayName: 'Value', width:'30%', enableFiltering: false},
			{ name:'appName', displayName: 'Application Name', width:'20%', enableFiltering: false},
			{ name:'active', displayName: 'Is Active', width:'8%', cellClass: 'ui-grid-center', enableFiltering: false},
			{ name:'action', displayName: 'Action', width:'10%', enableFiltering: false,
				cellTemplate: '<div class="ui-grid-cell-contents">' +
						'<a class="btn btn-xs btn-default mr-xs" href="#/configuration/edit/{{row.entity.id}}">' +
							'<i class="fa fa-edit fa-fw"></i> <span class="visible-lg-inline-block">Edit</span></a>'
			}

		],
		enableColumnResizing: true,
        enableFiltering: true,
		enableSorting: false,
        enableColumnMenus: false
	};

	$scope.getRows = function () {
		$scope.dataWaiting = true;
        getConfigurationRecords(
			function (res) {
				$scope.logger.debug(res.data);
				$scope.gridOptions.data = res.data;
			},
			function () {
				$scope.dataWaiting = false;
			}
		);
	};

    $scope.getRows();
}
