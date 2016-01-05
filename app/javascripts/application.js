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
                        controller: "doctorEndIndexCtrl"
                    }
                }
            })
            .state('tabs.knowledge', {
                url: "/knowledge",
                views: {
                    'knowledge-tab': {
                        templateUrl: "templates/knowledge.html",
                        controller: "doctorEndKnowledgeCtrl"
                    }
                }
            })
            .state('tabs.discover', {
                url: "/discover",
                views: {
                    'discover-tab': {
                        templateUrl: "templates/discover.html",
                        controller: "doctorEndDiscoverCtrl"
                    }
                }
            })
            .state('tabs.mine', {
                url: "/mine",
                views: {
                    'mine-tab': {
                        templateUrl: "templates/mine.html",
                        controller: "doctorEndMineCtrl"
                    }
                }
            })
            .state('confirm',{
                url: "/confirm",
                templateUrl: "templates/confirm_id.html",
                controller: "doctorEndConfirmIdCtrl"
            })
            .state('signin',{
                url: "/signin",
                templateUrl: "templates/sign_in.html",
                controller: "doctorEndSignInCtrl"
            })
            .state('signup',{
                url: "/signup",
                templateUrl: "templates/sign_up.html",
                controller: "doctorEndSignUpCtrl"
            })
            .state('feedback',{
                url: "/feedback",
                templateUrl: "templates/feedback.html",
                controller: "doctorEndFeedbackCtrl"
            })
            .state('setting',{
                url: "/setting",
                templateUrl: "templates/setting.html",
                controller: "doctorEndSettingCtrl"
            })
            .state('personal',{
                url: "/personal",
                templateUrl: "templates/personal_data.html",
                controller: "doctorEndPersonalDataCtrl"
            })
            .state('wishwall',{
                url: "/wishwall",
                templateUrl: "templates/wish_wall.html",
                controller: "doctorEndWishWallCtrl"
            })
            .state('binddoctor',{
                url: "/binddoctor",
                templateUrl: "templates/bind_doctor.html",
                controller: "doctorEndBindDoctorCtrl"
            })
            .state('numberway',{
                url: "/numberway",
                templateUrl: "templates/number_way.html",
                controller: "doctorEndNumberWayCtrl"
            })
            .state('instruction',{
                url: "/instruction",
                templateUrl: "templates/instruction.html",
                controller: "doctorEndInstructionCtrl"
            })
            .state('appointment',{
                url: "/appointment",
                templateUrl: "templates/appointment.html",
                controller: "doctorEndAppointmentCtrl"
            })
            .state('beds',{
                url: "/beds",
                templateUrl: "templates/beds.html",
                controller: "doctorEndBedsCtrl"
            })
            .state('healthEvaluation',{
                url: "/healthEvaluation",
                templateUrl: "templates/health_evaluation.html",
                controller: "doctorEndHealthEvaluationCtrl"
            })
        $urlRouterProvider.otherwise("/tab/home");
    })
