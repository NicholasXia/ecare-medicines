angular.module('medicine', ['ionic', 'medicine.controllers', 'medicine.services', 'medicine.filters', 'angular-carousel'])

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom')
        $ionicConfigProvider.navBar.alignTitle('center')
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tabs.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "templates/home.html",
                    }
                }
            })
            .state('tabs.knowledge', {
                url: "/knowledge",
                views: {
                    'knowledge-tab': {
                        templateUrl: "templates/knowledge.html"
                    }
                }
            })
            .state('tabs.discover', {
                url: "/discover",
                views: {
                    'discover-tab': {
                        templateUrl: "templates/discover.html"
                    }
                }
            })
            .state('tabs.mine', {
                url: "/mine",
                views: {
                    'mine-tab': {
                        templateUrl: "templates/mine.html"
                    }
                }
            })
            .state('confirm',{
                url: "/confirm",
                templateUrl: "templates/confirm_id.html"
            })
            .state('signin',{
                url: "/signin",
                templateUrl: "templates/sign_in.html"
            })
            .state('signup',{
                url: "/signup",
                templateUrl: "templates/sign_up.html"
            })
            .state('feedback',{
                url: "/feedback",
                templateUrl: "templates/feedback.html"
            })
            .state('setting',{
                url: "/setting",
                templateUrl: "templates/setting.html"
            })
            .state('personal',{
                url: "/personal",
                templateUrl: "templates/personal_data.html"
            })
        $urlRouterProvider.otherwise("/tab/home");
    })
