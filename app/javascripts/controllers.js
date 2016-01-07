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
    .controller('doctorEndSignInCtrl', ['$scope', '$ionicPopup', 'getVerificationCode', 'createUser', '$timeout', '$window', 'currentUser', function ($scope, $ionicPopup, getVerificationCode, createUser, $timeout, $window, currentUser) {
        //用户注册模块
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
        $scope.account = {phoneNum: '', verCode: '', password: ''}
        $scope.getVerificationCode = function () {
            getVerificationCode.query({mobile: $scope.account.phoneNum}, function (data) {
                if (data.error || $scope.account.phoneNum.length == 0 || $scope.account.phoneNum.length < 11 || !reg.test($scope.account.phoneNum)) {
                    $ionicPopup.alert({
                        title: '错误提示',
                        template: '手机号输入有误，请重新输入'
                    });
                } else {
                    $ionicPopup.alert({
                        title: '成功提示',
                        template: '验证码已经发送，请稍后'
                    });
                }
            }, function () {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '未知错误，请稍后重试'
                });
            })
        }
        $scope.signIn = function () {
            var user = {
                registerType: 2,
                mobile: $scope.account.phoneNum,
                password: $scope.account.password,
                verifycode: $scope.account.verCode
            }
            if ($scope.account.verCode.length !== 4 || $scope.account.password.length == 0) {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '请输入个人正确的信息'
                })
                return
            }
            createUser.save({}, user, function (userdata) {
                var popup = $ionicPopup.alert({
                    title: '注册成功',
                    template: '进入登陆页'
                })
                $timeout(function () {
                    popup.close()
                    $window.location.href = '#/signup'
                }, 3000)
            })
        }
    }])
    .controller('doctorEndSignUpCtrl', ['$scope', 'signUp', '$window', '$ionicPopup', '$timeout', 'currentUser', function ($scope, signUp, $window, $ionicPopup, $timeout, currentUser) {
        $scope.signInMsg = {'username': '', 'password': ''}
        $scope.signIn = function () {
            signUp.save({}, $scope.signInMsg, function (data) {
                currentUser.setAuthToken(data.accessToken)
                if (data.error) {
                    $ionicPopup.alert({
                        title: '错误提示',
                        template: data.error
                    })
                    ;
                    return
                } else {
                    var popup = $ionicPopup.alert({
                        title: '登陆成功',
                        template: '3秒后自动进入主页'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/'
                    }, 3000)
                }
            })
        }
    }])
    .controller('doctorEndFeedbackCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndSettingCtrl', ['$scope', 'currentUser', '$window', '$ionicPopup', '$timeout', function ($scope, currentUser, $window, $ionicPopup, $timeout) {
        $scope.isLogin = currentUser.hasAuthToken()
        $scope.destroyU = function () {
            currentUser.destroy()
            var popup = $ionicPopup.alert({
                title: '您已经注销',
                template: '3秒后自动进入主页'
            })
            $timeout(function () {
                popup.close()
                $window.location.href = '#/'
            }, 3000)
        }
    }])
    .controller('doctorEndPersonalDataCtrl', ['$scope', 'updateMsg', 'currentUser', '$ionicPopup', '$window', '$timeout', function ($scope, updateMsg, currentUser, $ionicPopup, $window, $timeout) {
        $scope.patientData = {
            birthday: '',
            weight: '',
            name: '',
            phone: '',
            gender: ['男', '女']
        }
        var datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                $scope.patientData.birthday = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
            }
        };
        $scope.datepickerObject = {
            titleLabel: '请选择生日',
            todayLabel: '今日',
            closeLabel: '取消',
            setLabel: '选取',
            setButtonType: 'button-assertive',
            todayButtonType: 'button-assertive',
            closeButtonType: 'button-assertive',
            inputDate: new Date(),
            mondayFirst: true,
            templateType: 'popup',
            showTodayButton: 'true',
            modalHeaderColor: 'bar-positive',
            modalFooterColor: 'bar-positive',
            callback: function (val) {
                datePickerCallback(val);
                return
            },
            dateFormat: 'dd-MM-yyyy',
            closeOnSelect: false,
        };
        $scope.saveMsg = function () {
            var saveMsg = {
                accessToken: currentUser.getAuthToken(),
                name: $scope.patientData.name,
                birthday: $scope.patientData.birthday,
                mobile: $scope.patientData.phone,
                weight: $scope.patientData.weight
            }
            updateMsg.save({}, saveMsg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '您的信息修改成功',
                        template: '3秒后自动进入主页'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/'
                    }, 3000)
                }
                else {
                    $window.location.href = '#/'
                }
            })
        }
    }])
    .controller('doctorEndWishWallCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndBindDoctorCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndNumberWayCtrl', ['$scope', 'bindDoctor', 'currentUser', '$ionicPopup', function ($scope, bindDoctor, currentUser, $ionicPopup) {
        $scope.doctorMsg = {doctorIdentity: ''}
        $scope.bindDoc = function () {
            var bindMsg = {
                doctorIdentity: $scope.doctorMsg.doctorIdentity,
                accessToken: currentUser.getAuthToken()
            }
            bindDoctor.save({}, bindMsg, function (data) {
                console.log(data)
                if (data.error) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    })
                    ;
                    return
                } else {
                    var popup = $ionicPopup.alert({
                        title: '医生绑定成功',
                        template: '3秒后自动进入主页'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/'
                    }, 3000)
                }
            })
        }
    }])
    .controller('doctorEndInstructionCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndAppointmentCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndBedsCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndHealthEvaluationCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndMyDoctorCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndChangePwdCtrl', ['$scope', 'currentUser', 'resetPwd', '$ionicPopup', '$timeout', '$window', function ($scope, currentUser, resetPwd, $ionicPopup, $timeout, $window) {

        $scope.newMsg = {oldPwd: '', newPwd: '', accessToken: ''}
        $scope.resetPwd = function () {
            var newMsg = {
                oldPwd: $scope.newMsg.oldPwd,
                newPwd: $scope.newMsg.newPwd,
                accessToken: currentUser.getAuthToken()
            }
            console.log(newMsg)
            resetPwd.save({}, newMsg, function (data) {
                console.log(data)
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '密码修改成功',
                        template: '3秒后进入登陆界面'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/signup'
                    }, 3000)
                }
            })
        }
    }])
    .controller('doctorEndDoctorDataCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndDiscoverDetailCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndDiscoverPostCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndEvaluationListCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndScanWayCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndCollectionCtrl', ['$scope', function ($scope) {

    }])
