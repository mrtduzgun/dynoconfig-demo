
function TrainerStateMap($stateProvider) {

    return $stateProvider
        .state("twoColumn.configuration",
        {
            url: '/configuration',
            abstract: true
        })
        .state("twoColumn.configuration.list",
        {
            url: '/list',
            views: {
                "bodyContent@": {
                    templateUrl: 'modules/configuration/view/index.html',
                    controller: ConfigurationRecordListingCtrl
                }
            }
        })
        .state("twoColumn.configuration.add",
        {
            url: '/add',
            views: {
                "bodyContent@": {
                    templateUrl: 'modules/configuration/view/add.html',
                    controller: ConfigurationRecordAddCtrl
                }
            }
        })
        .state("twoColumn.configuration.edit",
        {
            url: '/edit/{recordId:[^/]*}',
            views: {
                "bodyContent@": {
                    templateUrl: 'modules/configuration/view/edit.html',
                    controller: ConfigurationRecordEditCtrl
                }
            }
        })
        ;
}

