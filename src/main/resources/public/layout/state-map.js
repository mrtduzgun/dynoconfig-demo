
function LayoutStateMap($stateProvider, $urlRouterProvider, appConstant) {

    $urlRouterProvider.otherwise('/404');

    return $stateProvider
        .state("twoColumn",
        {
            url: '',
            redirectTo: 'twoColumn.configuration.list',
            views: {
                "header": {
                    templateUrl: 'layout/view/header.html',
                    controller: HeaderCtrl
                },
                "leftSidebar": {
                    templateUrl: 'layout/view/left-sidebar.html',
                    controller: LeftSidebarCtrl
                },
                "footer": {
                    templateUrl: 'layout/view/footer.html'
                }
            }
        })
        .state("singleColumn",
        {
            url: '',
            abstract: true
        })
        .state("singleColumn.404",
        {
            url: '/404',
            views: {
                "singleLayout@": {
                    templateUrl: 'layout/view/404.html'
                }
            }
        });
}

