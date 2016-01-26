angular.module('medicine.controllers', [])
    .controller('doctorEndIndexCtrl', ['helper','$scope', '$window', 'getCarouselList', 'currentUser', 'healthLecture', '$ionicPopup', '$timeout', '$ionicLoading', 'ionicLoadingConfig', 'reply', function (helper, $scope, $window, getCarouselList, currentUser, healthLecture, $ionicPopup, $timeout, $ionicLoading, ionicLoadingConfig, reply) {
        getCarouselList.query({type: 2, illType: 1}, function (data) {
            $scope.data = data
        })
        healthLecture.query(function (data) {
            $scope.healthLecture = data
        })
        $scope.goToActivity = function (artiacleid,linkurl) {
            if (linkurl) {
                $window.location.href = linkUrl
            } else {
                $window.location.href = '#/textcontent/' + artiacleid
            }
        }

        $scope.static = function () {
            $window.location.href = '#/fkshow'
        }
        $scope.fkmsg = function(){
            helper.fkmsg()
        }

        $scope.isLogin = currentUser.hasAuthToken()
        $scope.goMyDoctor = function () {
            if ($scope.isLogin) {
                $window.location.href = '#/mydoctor'
            } else {
                var popup = $ionicPopup.alert({
                    title: '提示',
                    template: '请先登陆'
                })
                $timeout(function () {
                    $window.location.href = '#/signup'
                }, 3000)
            }
        }
        reply.query({accessToken: currentUser.getAuthToken()}, function (data) {
            console.log(data)
            $scope.newChat = data.newChat
            $scope.newRemark = data.newRemark
        })
    }])
    .controller('doctorEndKnowledgeCtrl', ['$scope', 'healthLecture', function ($scope, healthLecture) {
        healthLecture.query(function (data) {
            $scope.data = data
            console.log(data)
        })
    }])

    .controller('doctorEndDiscoverCtrl', ['$stateParams', 'checkLogin', '$scope', 'discoveryList', '$window', '$ionicPopup', 'currentUser', '$timeout', function ($stateParams, checkLogin, $scope, discoveryList, $window, $ionicPopup, currentUser, $timeout) {
        $scope.ischeck = !!checkLogin.check()
        discoveryList.query({accessToken: currentUser.getAuthToken()}, function (data) {
            console.log(data)
            $scope.data = data
        })

        $scope.fk1 = function (id) {
            if (!$scope.ischeck) {
                var popup = $ionicPopup.alert({
                    'title': '提示',
                    'template': '你还是没有登陆'
                })
                $timeout(function () {
                    popup.close()
                    $window.location.href = '#/signup'
                }, 3000)
            } else {
                $window.location.href = '#/publishdiscover'
            }
        }

        $scope.fk = function (id) {
            if ($scope.ischeck) {
                $window.location.href = '#/discoverdetail/' + id
            } else {
                var popup = $ionicPopup.alert({
                    'title': '提示',
                    'template': '你还没有登陆'
                })
                $timeout(function () {
                    popup.close()
                    $window.location.href = '#/signup'
                }, 3000)
            }
        }
    }])
    .controller('doctorEndMineCtrl', ['$scope', 'checkLogin', '$window', '$ionicPopup', 'patientProfile', 'currentUser', function ($scope, checkLogin, $window, $ionicPopup, patientProfile, currentUser) {
        $scope.ischeck = !!checkLogin.check()
        patientProfile.query({accessToken: currentUser.getAuthToken()}, function (data) {
            $scope.data = data
            console.log(data)
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
        $scope.fk = function () {
            console.log($scope.ischeck)
            if ($scope.ischeck) {
                $window.location.href = '#/personal'
            } else {
                $window.location.href = '#/signup'
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
                    title: '提示',
                    template: '请输入个人正确的信息'
                })
                return
            }
            createUser.save({}, user, function (data) {
                if (data.error) {
                    $ionicPopup.alert({
                        'title' : '提示',
                        'template' : data.error
                    })
                }
                currentUser.setAuthToken(userdata.accessToken)
                var popup = $ionicPopup.alert({
                    title: '注册成功',
                    template: '即将进入首页'
                })
                $timeout(function () {
                    popup.close()
                    $window.location.href = '#/'
                }, 3000)
            })
        }
    }])
    .controller('doctorEndSignUpCtrl', ['$scope', 'signUp', '$window', '$ionicPopup', '$timeout', 'currentUser', function ($scope, signUp, $window, $ionicPopup, $timeout, currentUser) {
        $scope.signInMsg = {'username': '', 'password': ''}
        $scope.signIn = function () {
            signUp.save({}, $scope.signInMsg, function (data) {
                console.log(data)
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
            $scope.notallow = function () {
                if (data.mobile == '') {
                    $window.location.href = '#/changephone'
                }
                else {
                    $ionicPopup.alert({
                        'title': '提示',
                        'template': '电话号码注册后不能修改'
                    })
                }
            }
        })
    }])
    .controller('doctorEndPublishDiscoverCtrl', ['$http', '$scope', 'publishdiscover', 'currentUser', '$window', '$ionicPopup', '$ionicLoading', function ($http, $scope, publishdiscover, currentUser, $window, $ionicPopup, $ionicLoading) {
        $scope.accessToken = currentUser.getAuthToken()
        $scope.publish = {
            imageBase64s: '',
            content: '',
            accessToken: ''
        }
        $scope.publish = function (publishphoto) {
            console.log(publishphoto)
            if (publishphoto) {
                $scope.publish.imageBase64s = publishphoto[0].dataURL
            } else {

            }

            console.log(currentUser.getAuthToken())
            var formData = new FormData()
            formData.append('content', $scope.publish.content)
            for (var i = 0, len = publishphoto.length; i < len; i++) {
                formData.append('imageBase64s', publishphoto[i].dataURL)
            }
            formData.append('accessToken', currentUser.getAuthToken())

            $ionicLoading.show({
                template: '图片正在上传，请稍等'
            });
            $http.post('http://work.e-care365.com/hospital/patient/discovery/add', formData, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (data) {
                console.log(data)
                $ionicLoading.hide()
                if (data.status == 'suc') {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '发表发现成功'
                    })
                    $window.location.href = '#/tab/discover'
                }
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

        $scope.newMsg = {oldPwd: '', confirmPwd: '', accessToken: ''}
        $scope.resetPwd = function () {
            var newMsg = {
                oldPwd: $scope.newMsg.oldPwd,
                newPwd: $scope.newMsg.newPwd,
                confirmPwd: $scope.newMsg.confirmPwd,
                accessToken: currentUser.getAuthToken()
            }
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
    .controller('doctorEndDoctorDataCtrl', ['doctorList', 'unbindDoctor', '$scope', '$ionicActionSheet', '$timeout', 'doctorMsg', 'currentUser', '$stateParams', '$ionicPopup', function (doctorlist, unbindDoctor, $scope, $ionicActionSheet, $timeout, doctorMsg, currentUser, $stateParams, $ionicPopup) {
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
                    unbindDoctor.save({}, {
                        accessToken: currentUser.getAuthToken(),
                        doctorId: $scope.data.id
                    }, function (data) {
                        if (data.status == 'suc') {
                            var popup = $ionicPopup.alert({
                                'title' : '提示',
                                'template' : '解绑成功'
                            })
                            $timeout(function(){
                                popup.close()
                            },2000)
                        }
                    })
                }
            });
            $timeout(function () {
                hideSheet();
            }, 2000);

        };
    }])
    .controller('doctorEndDiscoverPostCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndEvaluationListCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndCollectionCtrl', ['deleteDiscover', 'deleteArticle', 'articleCollectList', '$scope', 'collectList', 'currentUser', '$stateParams', function (deleteDiscover, deleteArticle, articleCollectList, $scope, collectList, currentUser, $stateParams) {
        collectList.query({accessToken: currentUser.getAuthToken()}, function (data) {
            $scope.datadiscover = data
        })
        //articleCollect
        articleCollectList.query({accessToken: currentUser.getAuthToken()}, function (data) {
            $scope.articlediscover = data
        })
        $scope.deleteArticle = function (item) {
            var msg = {
                accessToken: currentUser.getAuthToken(),
                articleId: item
            }
            deleteArticle.save({}, msg, function () {
                articleCollectList.query({accessToken: currentUser.getAuthToken()}, function (data) {
                    $scope.articlediscover = data
                })
            })
        }
        $scope.deleteDiscover = function (item) {
            var msg = {
                accessToken: currentUser.getAuthToken(),
                discoveryId: item
            }
            console.log(msg)
            deleteDiscover.save({}, msg, function () {
                collectList.query({accessToken: currentUser.getAuthToken()}, function (data) {
                    $scope.datadiscover = data
                })
            })
        }
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
    .controller('zhishiDetailCtrl', ['articleCollect', '$scope', 'Detail', 'currentUser', '$window', '$stateParams', 'Remark', '$ionicPopup', '$timeout', function (articleCollect, $scope, Detail, currentUser, $window, $stateParams, Remark, $ionicPopup, $timeout) {

        $scope.saveIt = function () {
            var msg = {
                accessToken: currentUser.getAuthToken(),
                articleId: $stateParams.id
            }
            articleCollect.save({}, msg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: '收藏成功'
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                } else {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                }

            })
        }



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
                        $scope.markinfo.remak = ''
                        var popup = $ionicPopup.alert({
                            "title": '提示',
                            "template": '评论发布成功'
                        })
                        $timeout(function () {
                            popup.close()
                        }, 3000)
                        Detail.query({id: $stateParams.id}, function (data) {
                            $scope.zhishidetail = data
                        })
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
    .controller('manhuaDetailCtrl', ['articleCollect', '$scope', 'Detail', 'currentUser', '$window', '$stateParams', 'Remark', '$ionicPopup', '$timeout', function (articleCollect, $scope, Detail, currentUser, $window, $stateParams, Remark, $ionicPopup, $timeout) {
        $scope.saveIt = function () {
            var msg = {
                accessToken: currentUser.getAuthToken(),
                articleId: $stateParams.id
            }
            articleCollect.save({}, msg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: '收藏成功'
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                } else {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                }

            })
        }

        Detail.query({id: $stateParams.id}, function (data) {
            $scope.manhuadetail = data
            console.log(data)
        })

        $scope.goSite = function (link) {
            $window.location.href = link
        }
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
                        var popup = $ionicPopup.alert({
                            "title": '提示',
                            "template": '评论发布成功'
                        })
                        $scope.markinfo.remak = ''
                        $timeout(function () {
                            popup.close()
                        }, 3000)
                        Detail.query({id: $stateParams.id}, function (data) {
                            $scope.manhuadetail = data
                        })
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

    .controller('doctorEndTextContentCtrl', ['articleCollect', 'patientRemark', '$scope', 'Detail', 'currentUser', '$window', '$stateParams', 'Remark', '$ionicPopup', function (articleCollect, patientRemark, $scope, Detail, currentUser, $window, $stateParams, Remark, $ionicPopup) {
        Detail.query({id: $stateParams.id}, function (data) {
            $scope.data = data
            console.log(data)
        })
        $scope.saveIt = function () {
            var msg = {
                accessToken: currentUser.getAuthToken(),
                articleId: $stateParams.id
            }
            articleCollect.save({}, msg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: '收藏成功'
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                } else {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                }

            })
        }
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
                        $ionicPopup.alert({
                            'title' : '提示',
                            'template' : '评论成功'
                        })
                        Detail.query({id: $stateParams.id}, function (data) {
                            $scope.data = data
                            $scope.markinfo = ''
                        })
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
    .controller('changeCtrl', ['$http', '$scope', 'updateMsg', 'currentUser', '$ionicPopup', '$window', '$timeout', 'patientProfile', function ($http, $scope, updateMsg, currentUser, $ionicPopup, $window, $timeout, patientProfile) {
        $scope.patientData = {
            birthday: '',
            weight: '',
            name: '',
            phone: '',
            agender: '',
            imageBase64s: ''
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

        $scope.changeIcon = function (publishphoto) {
            var formData = new FormData()
            formData.append('imageBase64s', publishphoto[0].dataURL)
            formData.append('accessToken', currentUser.getAuthToken())

            $http.post('http://work.e-care365.com/hospital/patient/profile/update', formData, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (data) {
                console.log(data)
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '您的信息修改成功',
                        template: '3秒后自动返回上层'
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

        $scope.saveMsg = function (publishphoto) {
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
                        template: '3秒后自动返回上层'
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

    .controller('doctorEndDiscoverDetailCtrl', ['discoverCollect', '$scope', '$window', 'currentUser', 'discoveryDetail', 'discoverRemark', '$stateParams', '$ionicPopup', '$timeout', function (discoverCollect, $scope, $window, currentUser, discoveryDetail, discoverRemark, $stateParams, $ionicPopup, $timeout) {
        var msg = {
            accessToken: currentUser.getAuthToken(),
            discoveryId: $stateParams.id
        }
        $scope.discoverAdd = function () {
            discoverCollect.save({}, msg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: '收藏成功'
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                } else {
                    var popup = $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    })
                    $timeout(function () {
                        popup.close()
                    }, 3000)
                }
            })
        }


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
                    $scope.detailMsg = ''
                    discoveryDetail.query(params, function (data) {
                        $scope.data = data
                    })
                }

            })
        }
    }])
    .controller('forgotPwdCtrl', ['$scope', '$window', '$ionicPopup', 'forgotpwd', 'forgotReturn', 'currentUser', function ($scope, $window, $ionicPopup, forgotpwd, forgotReturn, currentUser) {
        $scope.forgot = {
            mobile: '',
            verifycode: '',
            newpwd: '',
            confirmPwd: '',
        };
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
        $scope.pwdCheck = function () {
            var msg = {
                mobile: $scope.forgot.mobile
            }
            console.log(msg)
            forgotpwd.query(msg, function (data) {
                if (data.error || $scope.forgot.mobile == 0 || $scope.forgot.mobileh < 11 || !reg.test($scope.forgot.mobile)) {
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
        $scope.pwdNext = function () {
            var msg = {
                mobile: $scope.forgot.mobile,
                verifycode: $scope.forgot.verifycode,
                newPwd: $scope.forgot.newpwd,
                confirmPwd: $scope.forgot.confirmPwd,
            }
            console.log(msg)
            forgotReturn.save({}, msg, function (data) {
                if (data.status == 'suc') {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '密码修改成功'
                    });
                    $window.history.back()
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    });

                }
            })
        }
    }])


    .controller('Messages', ['$scope', '$timeout', '$interval', '$ionicScrollDelegate', 'chart', 'currentUser', 'patientProfile', 'getChart', '$stateParams', '$window', function ($scope, $timeout, $interval, $ionicScrollDelegate, chart, currentUser, patientProfile, getChart, $stateParams, $window) {

        $scope.hideTime = true;
        var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
        var doctorId = $stateParams.id
        console.log('doctorid' + doctorId)
        patientProfile.query({accessToken: currentUser.getAuthToken()}, function (data) {

            $scope.myId = data.userId
            var patientId = data.userId
            console.log(patientId)
            $interval(
                function () {
                    getChart.query(
                        {accessToken: currentUser.getAuthToken(), fromUserId: patientId, toUserID: doctorId},
                        function (data) {
                            console.log(data)
                            $scope.toChar = data[0].toChat
                            $scope.messages.push({
                                userId: doctorId,
                                text: $scope.toChar
                            })
                        })
                },
                1000)
        })

        $scope.data = {};
        $scope.messages = [];

        $scope.sendMessage = function () {

            $scope.messages.push({
                userId: $scope.myId,
                text: $scope.data.message
            });

            var msg = {
                accessToken: currentUser.getAuthToken(),
                fromChat: $scope.data.message,
                fromUserId: $scope.myId,
                toUserID: doctorId
            }
            console.log(msg)
            chart.save({}, msg, function (data) {
                console.log(data)
            })

            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };

        $scope.inputUp = function () {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function () {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);

        };

        $scope.inputDown = function () {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        };

        $scope.closeKeyboard = function () {
            // cordova.plugins.Keyboard.close();
        };
    }]);


