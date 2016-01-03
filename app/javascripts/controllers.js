angular.module('medicine.controllers', [])
    .controller('doctorEndIndexCtrl', ['$scope', '$window', 'getCarouselList', function ($scope, $window, getCarouselList) {
        getCarouselList.query(function (data) {
            $scope.carouselLists = data
            console.log($scope.carouselLists)
        })
        $scope.goToActivity = function (activity) {
            $window.location.href = activity
        }
    }])
    .controller('doctorEndKnowledgeCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndDiscoverCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndMineCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndConfirmIdCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndSignInCtrl', ['$scope', 'signIn',function ($scope, signIn) {
        //用户注册模块
        $scope.account = {phoneNum: '', verCode: '', password: ''}
        $scope.signIn = function () {
         /*  signIn.query(null,function (data) {
               console.log(data)
               if (data.error) {
                   console.log('error is happen')
               }else{
                   console.log($scope.phonenum)
               }
           }, function () {
               console.log('error')
           })*/
        }
    }])
    .controller('doctorEndSignUpCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndFeedbackCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndSettingCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndPersonalDataCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndWishWallCtrl',['$scope',function($scope){

    }])
    .controller('doctorEndBindDoctorCtrl',['$scope',function($scope){

    }])
    .controller('doctorEndNumberWayCtrl',['$scope',function($scope){

    }])
    .controller('doctorEndInstructionCtrl',['$scope',function($scope){

    }])
    .controller('doctorEndAppointmentCtrl',['$scope',function($scope){

    }])
    .controller('doctorEndBedsCtrl',['$scope',function($scope){

    }])
