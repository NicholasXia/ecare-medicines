angular.module('medicine.controllers', [])
    .controller('doctorEndIndexCtrl', ['$scope', '$window', 'getCarouselList', 'currentUser', 'healthLecture', '$ionicPopup', '$timeout', function ($scope, $window, getCarouselList, currentUser, healthLecture, $ionicPopup, $timeout) {
        getCarouselList.query({type: 1, category: 1}, function (data) {
            $scope.data = data
            console.log(data)
        })
        healthLecture.query(function (data) {
            $scope.healthLecture = data
        })
        $scope.goToActivity = function (activity) {
            $window.location.href = activity
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
                    title: '错误提示',
                    template: '请输入个人正确的信息'
                })
                return
            }
            createUser.save({}, user, function (userdata) {
                console.log(userdata)
                currentUser.setAuthToken(userdata.accessToken)
                var popup = $ionicPopup.alert({
                    title: '注册成功',
                    template: '进入登陆页'
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
        })
    }])
    .controller('doctorEndPublishDiscoverCtrl', ['$http', '$scope', 'publishdiscover', 'currentUser', '$window', function ($http, $scope, publishdiscover, currentUser, $window) {
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

            $http.post('http://work.e-care365.com/hospital/patient/discovery/add', formData, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (data) {
                console.log(data)
                if (data.status == 'suc') {
                    $window.location.href = '#/tab/discover'
                }
            })


            /* publishdiscover.save({}, msg, function (data) {
             console.log(data)
             if (data.status == 'suc') {
             $window.location.href = '#/tab/discover'
             }
             })*/
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
    .controller('doctorEndDoctorDataCtrl', ['doctorList', 'unbindDoctor', '$scope', '$ionicActionSheet', '$timeout', 'doctorMsg', 'currentUser', '$stateParams', function (doctorlist, unbindDoctor, $scope, $ionicActionSheet, $timeout, doctorMsg, currentUser, $stateParams) {
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
                        console.log(data)
                    })
                }
            });
            $timeout(function () {
                hideSheet();
            }, 10000);

        };
    }])
    .controller('doctorEndDiscoverPostCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndEvaluationListCtrl', ['$scope', function ($scope) {

    }])
    .controller('doctorEndCollectionCtrl', ['deleteDiscover', 'deleteArticle', 'articleCollectList', '$scope', 'collectList', 'currentUser', '$stateParams', function (deleteDiscover, deleteArticle, articleCollectList, $scope, collectList, currentUser, $stateParams) {
        collectList.query({accessToken: currentUser.getAuthToken()}, function (data) {
            console.log('---------discover-----------')
            console.log(data)
            $scope.datadiscover = data
        })
        //articleCollect
        articleCollectList.query({accessToken: currentUser.getAuthToken()}, function (data) {
            console.log('---------article------------')
            console.log(data)
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
    .controller('manhuaDetailCtrl', ['$scope', 'Detail', 'currentUser', '$window', '$stateParams', 'Remark', '$ionicPopup', function ($scope, Detail, currentUser, $window, $stateParams, Remark, $ionicPopup) {
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
        console.log(msg)
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
                    $window.location.reload()
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



///////////////////////////////
//    .config(function($stateProvider, $urlRouterProvider) {
//        $stateProvider
//            .state('UserMessages', {
//                url: '/UserMessages',
//                templateUrl: 'templates/UserMessages.html',
//                controller: 'UserMessagesCtrl'
//            });
//
//        $urlRouterProvider.otherwise('/UserMessages');
//    })

    .controller('UserMessagesCtrl', ['$scope', '$rootScope', '$state',
        '$stateParams', 'MockService', '$ionicActionSheet',
        '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval',
        function($scope, $rootScope, $state, $stateParams, MockService,
                 $ionicActionSheet,
                 $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {

            // mock acquiring data via $stateParams
            $scope.toUser = {
                _id: '534b8e5aaa5e7afc1b23e69b',
                pic: 'http://ionicframework.com/img/docs/venkman.jpg',
                username: 'Venkman'
            }

            // this could be on $rootScope rather than in $stateParams
            $scope.user = {
                _id: '534b8fb2aa5e7afc1b23e69c',
                pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
                username: 'Marty'
            };

            $scope.input = {
                message: localStorage['userMessage-' + $scope.toUser._id] || ''
            };

            var messageCheckTimer;

            var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
            var footerBar; // gets set in $ionicView.enter
            var scroller;
            var txtInput; // ^^^

            $scope.$on('$ionicView.enter', function() {
                console.log('UserMessages $ionicView.enter');

                getMessages();

                $timeout(function() {
                    footerBar = document.body.querySelector('#userMessagesView .bar-footer');
                    scroller = document.body.querySelector('#userMessagesView .scroll-content');
                    txtInput = angular.element(footerBar.querySelector('textarea'));
                }, 0);

                messageCheckTimer = $interval(function() {
                    // here you could check for new messages if your app doesn't use push notifications or user disabled them
                }, 20000);
            });

            $scope.$on('$ionicView.leave', function() {
                console.log('leaving UserMessages view, destroying interval');
                // Make sure that the interval is destroyed
                if (angular.isDefined(messageCheckTimer)) {
                    $interval.cancel(messageCheckTimer);
                    messageCheckTimer = undefined;
                }
            });

            $scope.$on('$ionicView.beforeLeave', function() {
                if (!$scope.input.message || $scope.input.message === '') {
                    localStorage.removeItem('userMessage-' + $scope.toUser._id);
                }
            });

            function getMessages() {
                // the service is mock but you would probably pass the toUser's GUID here
                MockService.getUserMessages({
                    toUserId: $scope.toUser._id
                }).then(function(data) {
                    $scope.doneLoading = true;
                    $scope.messages = data.messages;

                    $timeout(function() {
                        viewScroll.scrollBottom();
                    }, 0);
                });
            }

            $scope.$watch('input.message', function(newValue, oldValue) {
                console.log('input.message $watch, newValue ' + newValue);
                if (!newValue) newValue = '';
                localStorage['userMessage-' + $scope.toUser._id] = newValue;
            });

            $scope.sendMessage = function(sendMessageForm) {
                console.log('abcdefghijklmn')
                var message = {
                    toId: $scope.toUser._id,
                    text: $scope.input.message
                };

                // if you do a web service call this will be needed as well as before the viewScroll calls
                // you can't see the effect of this in the browser it needs to be used on a real device
                // for some reason the one time blur event is not firing in the browser but does on devices
                keepKeyboardOpen();

                //MockService.sendMessage(message).then(function(data) {
                $scope.input.message = '';

                message._id = new Date().getTime(); // :~)
                message.date = new Date();
                message.username = $scope.user.username;
                message.userId = $scope.user._id;
                message.pic = $scope.user.picture;

                $scope.messages.push(message);

                $timeout(function() {
                    keepKeyboardOpen();
                    viewScroll.scrollBottom(true);
                }, 0);

                $timeout(function() {
                    $scope.messages.push(MockService.getMockMessage());
                    keepKeyboardOpen();
                    viewScroll.scrollBottom(true);
                }, 2000);

                //});
            };

            // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
            function keepKeyboardOpen() {
                console.log('keepKeyboardOpen');
                txtInput.one('blur', function() {
                    console.log('textarea blur, focus back on it');
                    txtInput[0].focus();
                });
            }

            $scope.onMessageHold = function(e, itemIndex, message) {
                console.log('onMessageHold');
                console.log('message: ' + JSON.stringify(message, null, 2));
                $ionicActionSheet.show({
                    buttons: [{
                        text: 'Copy Text'
                    }, {
                        text: 'Delete Message'
                    }],
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0: // Copy Text
                                //cordova.plugins.clipboard.copy(message.text);

                                break;
                            case 1: // Delete
                                // no server side secrets here :~)
                                $scope.messages.splice(itemIndex, 1);
                                $timeout(function() {
                                    viewScroll.resize();
                                }, 0);

                                break;
                        }

                        return true;
                    }
                });
            };

            // this prob seems weird here but I have reasons for this in my app, secret!
            $scope.viewProfile = function(msg) {
                if (msg.userId === $scope.user._id) {
                    // go to your profile
                } else {
                    // go to other users profile
                }
            };

            // I emit this event from the monospaced.elastic directive, read line 480
            $scope.$on('taResize', function(e, ta) {
                console.log('taResize');
                if (!ta) return;

                var taHeight = ta[0].offsetHeight;
                console.log('taHeight: ' + taHeight);

                if (!footerBar) return;

                var newFooterHeight = taHeight + 10;
                newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                footerBar.style.height = newFooterHeight + 'px';
                scroller.style.bottom = newFooterHeight + 'px';
            });

        }])





function onProfilePicError(ele) {
    this.ele.src = ''; // set a fallback
}

function getMockMessages() {
    return {"messages":[{"_id":"535d625f898df4e80e2a125e","text":"Ionic has changed the game for hybrid app development.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-04-27T20:02:39.082Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"535f13ffee3b2a68112b9fc0","text":"I like Ionic better than ice cream!","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-04-29T02:52:47.706Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"546a5843fd4c5d581efa263a","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-17T20:19:15.289Z","read":true,"readDate":"2014-12-01T06:27:38.328Z"},{"_id":"54764399ab43d1d4113abfd1","text":"Am I dreaming?","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-26T21:18:17.591Z","read":true,"readDate":"2014-12-01T06:27:38.337Z"},{"_id":"547643aeab43d1d4113abfd2","text":"Is this magic?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-26T21:18:38.549Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"547815dbab43d1d4113abfef","text":"Gee wiz, this is something special.","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:27:40.001Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781c69ab43d1d4113abff0","text":"I think I like Ionic more than I like ice cream!","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T06:55:37.350Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Yea, it's pretty sweet","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"5478df86ab43d1d4113abff4","text":"Wow, this is really something huh?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T20:48:06.572Z","read":true,"readDate":"2014-12-01T06:27:38.339Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Create amazing apps - ionicframework.com","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-29T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"}],"unread":0};
}

// configure moment relative time
//moment.locale('en', {
//    relativeTime: {
//        future: "in %s",
//        past: "%s ago",
//        s: "%d sec",
//        m: "a minute",
//        mm: "%d minutes",
//        h: "an hour",
//        hh: "%d hours",
//        d: "a day",
//        dd: "%d days",
//        M: "a month",
//        MM: "%d months",
//        y: "a year",
//        yy: "%d years"
//    }
//});

/*
 * angular-elastic v2.4.2
 * (c) 2014 Monospaced http://monospaced.com
 * License: MIT
 */

angular.module('monospaced.elastic', [])

    .constant('msdElasticConfig', {
        append: ''
    })

    .directive('msdElastic', [
        '$timeout', '$window', 'msdElasticConfig',
        function($timeout, $window, config) {
            'use strict';

            return {
                require: 'ngModel',
                restrict: 'A, C',
                link: function(scope, element, attrs, ngModel) {

                    // cache a reference to the DOM element
                    var ta = element[0],
                        $ta = element;

                    // ensure the element is a textarea, and browser is capable
                    if (ta.nodeName !== 'TEXTAREA' || !$window.getComputedStyle) {
                        return;
                    }

                    // set these properties before measuring dimensions
                    $ta.css({
                        'overflow': 'hidden',
                        'overflow-y': 'hidden',
                        'word-wrap': 'break-word'
                    });

                    // force text reflow
                    var text = ta.value;
                    ta.value = '';
                    ta.value = text;

                    var append = attrs.msdElastic ? attrs.msdElastic.replace(/\\n/g, '\n') : config.append,
                        $win = angular.element($window),
                        mirrorInitStyle = 'position: absolute; top: -999px; right: auto; bottom: auto;' +
                            'left: 0; overflow: hidden; -webkit-box-sizing: content-box;' +
                            '-moz-box-sizing: content-box; box-sizing: content-box;' +
                            'min-height: 0 !important; height: 0 !important; padding: 0;' +
                            'word-wrap: break-word; border: 0;',
                        $mirror = angular.element('<textarea tabindex="-1" ' +
                            'style="' + mirrorInitStyle + '"/>').data('elastic', true),
                        mirror = $mirror[0],
                        taStyle = getComputedStyle(ta),
                        resize = taStyle.getPropertyValue('resize'),
                        borderBox = taStyle.getPropertyValue('box-sizing') === 'border-box' ||
                            taStyle.getPropertyValue('-moz-box-sizing') === 'border-box' ||
                            taStyle.getPropertyValue('-webkit-box-sizing') === 'border-box',
                        boxOuter = !borderBox ? {width: 0, height: 0} : {
                            width:  parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-right'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-left'), 10) +
                            parseInt(taStyle.getPropertyValue('border-left-width'), 10),
                            height: parseInt(taStyle.getPropertyValue('border-top-width'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-top'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-bottom'), 10) +
                            parseInt(taStyle.getPropertyValue('border-bottom-width'), 10)
                        },
                        minHeightValue = parseInt(taStyle.getPropertyValue('min-height'), 10),
                        heightValue = parseInt(taStyle.getPropertyValue('height'), 10),
                        minHeight = Math.max(minHeightValue, heightValue) - boxOuter.height,
                        maxHeight = parseInt(taStyle.getPropertyValue('max-height'), 10),
                        mirrored,
                        active,
                        copyStyle = ['font-family',
                            'font-size',
                            'font-weight',
                            'font-style',
                            'letter-spacing',
                            'line-height',
                            'text-transform',
                            'word-spacing',
                            'text-indent'];

                    // exit if elastic already applied (or is the mirror element)
                    if ($ta.data('elastic')) {
                        return;
                    }

                    // Opera returns max-height of -1 if not set
                    maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

                    // append mirror to the DOM
                    if (mirror.parentNode !== document.body) {
                        angular.element(document.body).append(mirror);
                    }

                    // set resize and apply elastic
                    $ta.css({
                        'resize': (resize === 'none' || resize === 'vertical') ? 'none' : 'horizontal'
                    }).data('elastic', true);

                    /*
                     * methods
                     */

                    function initMirror() {
                        var mirrorStyle = mirrorInitStyle;

                        mirrored = ta;
                        // copy the essential styles from the textarea to the mirror
                        taStyle = getComputedStyle(ta);
                        angular.forEach(copyStyle, function(val) {
                            mirrorStyle += val + ':' + taStyle.getPropertyValue(val) + ';';
                        });
                        mirror.setAttribute('style', mirrorStyle);
                    }

                    function adjust() {
                        var taHeight,
                            taComputedStyleWidth,
                            mirrorHeight,
                            width,
                            overflow;

                        if (mirrored !== ta) {
                            initMirror();
                        }

                        // active flag prevents actions in function from calling adjust again
                        if (!active) {
                            active = true;

                            mirror.value = ta.value + append; // optional whitespace to improve animation
                            mirror.style.overflowY = ta.style.overflowY;

                            taHeight = ta.style.height === '' ? 'auto' : parseInt(ta.style.height, 10);

                            taComputedStyleWidth = getComputedStyle(ta).getPropertyValue('width');

                            // ensure getComputedStyle has returned a readable 'used value' pixel width
                            if (taComputedStyleWidth.substr(taComputedStyleWidth.length - 2, 2) === 'px') {
                                // update mirror width in case the textarea width has changed
                                width = parseInt(taComputedStyleWidth, 10) - boxOuter.width;
                                mirror.style.width = width + 'px';
                            }

                            mirrorHeight = mirror.scrollHeight;

                            if (mirrorHeight > maxHeight) {
                                mirrorHeight = maxHeight;
                                overflow = 'scroll';
                            } else if (mirrorHeight < minHeight) {
                                mirrorHeight = minHeight;
                            }
                            mirrorHeight += boxOuter.height;
                            ta.style.overflowY = overflow || 'hidden';

                            if (taHeight !== mirrorHeight) {
                                ta.style.height = mirrorHeight + 'px';
                                scope.$emit('elastic:resize', $ta);
                            }

                            scope.$emit('taResize', $ta); // listen to this in the UserMessagesCtrl

                            // small delay to prevent an infinite loop
                            $timeout(function() {
                                active = false;
                            }, 1);

                        }
                    }

                    function forceAdjust() {
                        active = false;
                        adjust();
                    }

                    /*
                     * initialise
                     */

                    // listen
                    if ('onpropertychange' in ta && 'oninput' in ta) {
                        // IE9
                        ta['oninput'] = ta.onkeyup = adjust;
                    } else {
                        ta['oninput'] = adjust;
                    }

                    $win.bind('resize', forceAdjust);

                    scope.$watch(function() {
                        return ngModel.$modelValue;
                    }, function(newValue) {
                        forceAdjust();
                    });

                    scope.$on('elastic:adjust', function() {
                        initMirror();
                        forceAdjust();
                    });

                    $timeout(adjust);

                    /*
                     * destroy
                     */

                    scope.$on('$destroy', function() {
                        $mirror.remove();
                        $win.unbind('resize', forceAdjust);
                    });
                }
            };
        }
    ])


///////////////////////////////////
