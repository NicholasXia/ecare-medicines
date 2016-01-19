angular.module('medicine.controllers', [])
    .controller('doctorEndIndexCtrl', ['$scope', '$window', 'getCarouselList', 'currentUser', 'healthLecture', function ($scope, $window, getCarouselList, currentUser, healthLecture) {
        getCarouselList.query({type: 1, category: 1}, function (data) {
            $scope.data = data
        })
        healthLecture.query(function (data) {
            console.log(data)
            $scope.healthLecture = data
            console.log($scope.healthLecture)
        })
        $scope.goToActivity = function (activity) {
            $window.location.href = activity
        }
        $scope.isLogin = currentUser.hasAuthToken()
    }])
    .controller('doctorEndKnowledgeCtrl', ['$scope', 'healthLecture', function ($scope, healthLecture) {
        healthLecture.query(function (data) {
            $scope.data = data
            /*
             $scope.healthLecture = data.heart_knowledge
             $scope.healthVedio = data.heart_vedio
             $scope.healthCartoon = data.cartoon
             */
        })
    }])

    .controller('doctorEndDiscoverCtrl', ['$scope', 'discoveryList', '$window', '$ionicPopup', 'currentUser', function ($scope, discoveryList, $window, $ionicPopup, currentUser) {

        var accesstoken = currentUser.getAuthToken()
        if (accesstoken) {
            discoveryList.query({accessToken: currentUser.getAuthToken()}, function (data) {
                console.log(data)
                $scope.data = data
            })
        } else {
            $ionicPopup.alert({
                title: '错误提示',
                template: '您还未登陆不能查看发现'
            });
            $window.location.href = '#/signup'
        }
    }])
    .controller('doctorEndMineCtrl', ['$scope', 'checkLogin', '$window', '$ionicPopup', 'patientProfile', 'currentUser', function ($scope, checkLogin, $window, $ionicPopup, patientProfile, currentUser) {
        $scope.ischeck = !!checkLogin.check()
        patientProfile.query({accessToken: currentUser.getAuthToken()}, function (data) {
            $scope.data = data
        })
        $scope.letugo = function () {
            if ($scope.ischeck) {
                $window.location.href = '#/collection'
            } else {
                $ionicPopup.alert({
                    title: '提示',
                    template: '您尚未登陆，请登陆后重试'
                })
            }
        }
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
    .controller('doctorEndFeedbackCtrl', ['$scope', 'currentUser', '$ionicPopup', '$window', '$timeout', 'addFeedback', function ($scope, currentUser, $ionicPopup, $window, $timeout, addFeedback) {
        $scope.feedMsg = {feedback: '', contact: ''}
        $scope.addFeedback = function () {
            var msg = {
                content: $scope.feedMsg.feedback,
                accessToken: currentUser.getAuthToken(),
                contact: $scope.feedMsg.contact
            }
            addFeedback.save({}, msg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '反馈提交成功',
                        template: '3秒后自动进入首页'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/'
                    }, 3000)
                }
                else {
                    $ionicPopup.alert({
                        title: '友情提示',
                        template: data.error
                    })
                }
            })
        }
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
    .controller('doctorEndPersonalDataCtrl', ['$scope', 'updateMsg', 'currentUser', '$ionicPopup', '$window', '$timeout', 'patientProfile', function ($scope, updateMsg, currentUser, $ionicPopup, $window, $timeout, patientProfile) {
        $scope.data = patientProfile.query({accessToken: currentUser.getAuthToken()}, function (data) {
            console.log(data)
        })
    }])
    .controller('doctorEndPublishDiscoverCtrl', ['$scope', 'publishdiscover', 'currentUser', function ($scope, publishdiscover, currentUser) {
        $scope.publish = {
            imageBase64s: '',
            content: '',
            accessToken: ''
        }
        $scope.publish = function (publishphoto) {
            console.log(publishphoto)
            $scope.publish.imageBase64s = publishphoto[0].dataURL

            var msg = {
                content: $scope.publish.content,
                imageBase64s: $scope.publish.imageBase64s,
                accessToken: currentUser.getAuthToken()
            }
            console.log(msg)
            publishdiscover.save({}, msg, function (data) {
            })
        }
    }])
    .controller('doctorEndWishWallCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndBindDoctorCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndNumberWayCtrl', ['$scope', 'bindDoctor', 'currentUser', '$ionicPopup', '$timeout', '$window', function ($scope, bindDoctor, currentUser, $ionicPopup, $timeout, $window) {
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
                        title: '提示',
                        template: data.status
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/'
                    }, 3000)
                }
            })
        }
    }])
    .controller('doctorAnnouncementsCtrl', ['$scope', 'doctorAnnouncements', 'currentUser', function ($scope, doctorAnnouncements, currentUser) {
        doctorAnnouncements.query({accessToken: currentUser.getAuthToken()}, function (data) {
            console.log(data)
            $scope.data = data
        })
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
    .controller('doctorEndDoctorDataCtrl', ['$scope', '$ionicActionSheet', '$timeout', 'doctorMsg', 'currentUser', '$stateParams', function ($scope, $ionicActionSheet, $timeout, doctorMsg, currentUser, $stateParams) {
        doctorMsg.query({accessToken: currentUser.getAuthToken(), id: $stateParams.id}, function (data) {
            $scope.data = data
            console.log(data)
        })
        $scope.show = function () {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: '是'}
                ],
                titleText: '是否解绑',
                cancelText: '否',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    return true;
                }
            });
            $timeout(function () {
                hideSheet();
            }, 10000);

        };
    }])
    .controller('doctorEndDiscoverDetailCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndDiscoverPostCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndEvaluationListCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndCollectionCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorListCtrl', ['$scope', 'doctorList', 'currentUser', function ($scope, doctorList, currentUser) {
        doctorList.query({accessToken: currentUser.getAuthToken()}, function (data) {
            console.log(data)
            $scope.data = data
        })
    }])


    //
    .controller('threeKillCtrl', ['$scope', 'threeKiller', function ($scope, threeKiller) {
        threeKiller.get({illType: 3}, function (data) {
            $scope.model = {
                knowledge: data.heart_knowledge,
                vedio: data.heart_vedio,
                cartoon: data.heart_cartoon
            }
            console.log($scope.model)
        })
    }])
    .controller('guanxinbingCtrl', ['$scope', 'threeKiller', function ($scope, threeKiller) {
        threeKiller.get({illType: 4}, function (data) {
            $scope.model = {
                knowledge: data.heart_knowledge,
                vedio: data.heart_vedio,
                cartoon: data.heart_cartoon
            }
            console.log($scope.model)
        })
    }])
    .controller('xinjigengseCtrl', ['$scope', 'threeKiller', function ($scope, threeKiller) {
        threeKiller.get({illType: 5}, function (data) {
            $scope.model = {
                knowledge: data.heart_knowledge,
                vedio: data.heart_vedio,
                cartoon: data.heart_cartoon
            }
            console.log($scope.model)
        })
    }])
    .controller('xinlishuaijieCtrl', ['$scope', 'threeKiller', function ($scope, threeKiller) {
        threeKiller.get({illType: 6}, function (data) {
            $scope.model = {
                knowledge: data.heart_knowledge,
                vedio: data.heart_vedio,
                cartoon: data.heart_cartoon
            }
            console.log($scope.model)
        })
    }])

//文章detail
    .controller('zhishiDetailCtrl', ['$scope', 'Detail', 'currentUser', '$window', '$stateParams', 'Remark', '$ionicPopup', function ($scope, Detail, currentUser, $window, $stateParams, Remark, $ionicPopup) {
        Detail.query({id: $stateParams.id}, function (data) {
            $scope.zhishidetail = data
            console.log(data)
        })

        var accesstoken = currentUser.getAuthToken()
        $scope.markinfo = {'remak': ''}
        $scope.remark = function () {

            var msg = {
                accessToken: accesstoken,
                articleId: $stateParams.id,
                remark: $scope.markinfo.remak
            }
            if (accesstoken) {
                Remark.save({}, msg, function (data) {
                    if (data.status == 'suc') {
                        $window.location.reload()
                    } else {
                        $window.location.href = '#/'
                    }
                })
            } else {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '您还未登陆不能进行评论'
                });
                $window.location.href = '#/signup'
            }

        }
    }])
    //


    .controller('doctorEndTextContentCtrl', ['$scope', 'getArticleById', '$stateParams', function ($scope, getArticleById, $stateParams) {
        getArticleById.query({id: $stateParams.id}, function (data) {
            console.log(data)
            $scope.data = data
        })
    }])
    .controller('changeCtrl', ['$scope', 'updateMsg', 'currentUser', '$ionicPopup', '$window', '$timeout', 'patientProfile', function ($scope, updateMsg, currentUser, $ionicPopup, $window, $timeout, patientProfile) {
        $scope.patientData = {
            birthday: '',
            weight: '',
            name: '',
            phone: '',
            agender: ''
        }

        var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
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
            monthList: monthList,
            templateType: 'popup',
            showTodayButton: 'false',
            modalHeaderColor: 'bar-positive',
            modalFooterColor: 'bar-positive',
            callback: function (val) {
                datePickerCallback(val);
                return
            },
            dateFormat: 'yyyy-MM-dd',
            closeOnSelect: false,
        };

        $scope.saveMsg = function () {
            var saveMsg = {
                accessToken: currentUser.getAuthToken(),
                name: $scope.patientData.name,
                birthday: $scope.patientData.birthday,
                mobile: $scope.patientData.phone,
                weight: $scope.patientData.weight,
                agender: $scope.patientData.agender
            }
            updateMsg.save({}, saveMsg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '您的信息修改成功',
                        template: '3秒后自动进入主页'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/personal'
                    }, 3000)
                }
                else {
                    $window.location.href = '#/'
                }
            })
        }
    }])

    .controller('doctorEndDiscoverDetailCtrl', ['$scope', '$window', 'currentUser', 'discoveryDetail', 'discoverRemark', '$stateParams', function ($scope, $window, currentUser, discoveryDetail, discoverRemark, $stateParams) {
        var accesstoken = currentUser.getAuthToken()
        var params = {id: $stateParams.id, accessToken: accesstoken}
        discoveryDetail.query(params, function (data) {
            $scope.data = data
            console.log(data)
        })
        $scope.detailMsg = {'acomment': ''}
        //评论
        $scope.aComment = function () {
            var paramsremark = {
                id: $stateParams.id,
                remark: $scope.detailMsg.acomment,
                accessToken: accesstoken
            }
            discoverRemark.save(paramsremark, function (info) {
                if (info.status == 'suc') {
                    $window.location.reload()
                }

            })


        }
    }])