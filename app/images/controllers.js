angular.module('medicine.controllers', [])
  .controller('doctorHomeCtrl', ['$timeout', '$scope', '$window', 'getCarouselList', 'currentUser', "$ionicPopup", "bindinfo", "mineInfo", '$ionicLoading', 'ionicLoadingConfig', 'getCountAsk', function($timeout, $scope, $window, getCarouselList, currentUser, $ionicPopup, bindinfo, mineInfo, $ionicLoading, ionicLoadingConfig, getCountAsk) {

    var accesstoken = currentUser.getAuthToken()
    getCarouselList.query({
      type: 1,
      illType: 1
    }, function(data) {
      $scope.data = data
      $scope.doctorno = accesstoken
      console.log(data)
    })

    getCarouselList.query({
      type: 1,
      illType: 2
    }, function(data) {
      $scope.medicallist = data
    })
    getCountAsk.query({
      accessToken: accesstoken
    }, function(data) {
      $scope.askCount = data.askCount
    })
    console.log(currentUser);
    $scope.doctorCode = currentUser.getDoctorCode()
    $scope.goToActivity = function(activity) {
      $window.location.href = activity
    }
    $scope.isLogin = currentUser.hasAuthToken()


    mineInfo.query({
      accessToken: accesstoken
    }, function(data) {
      var msg = {
        id: data.id,
      }
      bindinfo.query(msg, function(count) {
        $scope.count = count
      })
    })
    $scope.goToActivity = function(artiacleid, linkUrl) {
      if (linkUrl) {
        $window.location.href = linkUrl
      } else {
        $window.location.href = '#/medical_detail/' + artiacleid
      }
    }
    $scope.gotLogin = function() {
      if (!$scope.isLogin) {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: '您还未登陆'
        });
        $timeout(function() {
          popup.close()
        }, 2000)
        $window.location.href = '#/sign_in'
      } else {
        $window.location.href = '#/analysis'
      }
    }

    $scope.goXinxueg = function() {
      if (!$scope.isLogin) {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: '您还未登陆'
        });
        $timeout(function() {
          popup.close()
        }, 2000)
        $window.location.href = '#/sign_in'
      } else {
        $window.location.href = '#/xinxueg'
      }
    }

  }])

//医生注册
.controller('doctorSignUpCtrl', ['$scope', '$ionicPopup', 'getVerificationCode', 'createUser', '$timeout', '$window', 'currentUser', '$interval', function($scope, $ionicPopup, getVerificationCode, createUser, $timeout, $window, currentUser, $interval) {
  //用户注册模块
  var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
  $scope.account = {
    phoneNum: '',
    verCode: '',
    password: ''
  }
  $scope.hasSend = false; //没有发送
  $scope.second = 60; //默认60s
  $scope.getCode = function() {
    getVerificationCode.query({
      mobile: $scope.account.phoneNum
    }, function(data) {
      if (data.error || $scope.account.phoneNum.length == 0 || $scope.account.phoneNum.length < 11 || !reg.test($scope.account.phoneNum)) {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: data.error
        });
        $timeout(function() {
          popup.close()
        }, 2000)
      } else {
        var popup = $ionicPopup.alert({
          title: '成功提示',
          template: '验证码已经发送，请稍后'
        });
        $timeout(function() {
          popup.close()
        }, 2000)
        $scope.hasSend = true; //已发送
        var timer = $interval(function() {
          var _self = this;
          if ($scope.second == 0) {
            console.log('clear timer');
            $interval.cancel(timer);
            $scope.hasSend = false;
          }
          $scope.second = $scope.second - 1;
        }, 1000);

      }
    })
  }


  $scope.signUp = function() {
    var user = {
      registerType: 1,
      mobile: $scope.account.phoneNum,
      password: $scope.account.password,
      verifycode: $scope.account.verCode
    }
    if ($scope.account.verCode.length !== 4 || $scope.account.password.length == 0) {
      var popup = $ionicPopup.alert({
        title: '提示',
        template: '请输入个人正确的信息'
      })
      $timeout(function() {
        popup.close()
      }, 2000)
      return
    }
    console.log(user)
    createUser.save({}, user, function(data) {

      if (data.status == 'suc') {
        currentUser.setAuthToken(data.accessToken)
        var popup = $ionicPopup.alert({
          title: '注册成功',
          template: '赶快去完善下个人信息吧！'
        })
        $timeout(function() {
          popup.close()
          $window.location.href = '#/mine_info'
        }, 2000)
      } else {
        var popup = $ionicPopup.alert({
          'title': '提示',
          'template': data.error
        })
        $timeout(function() {
          popup.close()
          $window.location.href = '#/mine_info'
        }, 2000)
      }


      if (data.error) {

      } else {


      }
    })
  }
}])

.controller('doctorSignUpCtrlFlow', ['$scope', '$ionicPopup', 'getVerificationCode', 'createUser', '$timeout', '$window', 'currentUser', '$interval', function($scope, $ionicPopup, getVerificationCode, createUser, $timeout, $window, currentUser, $interval) {
    //用户注册模块
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
    $scope.account = {
      phoneNum: '',
      verCode: '',
      password: ''
    }
    $scope.hasSend = false; //没有发送
    $scope.second = 60; //默认60s
    $scope.getCode = function() {
      getVerificationCode.query({
        mobile: $scope.account.phoneNum
      }, function(data) {
        if (data.error || $scope.account.phoneNum.length == 0 || $scope.account.phoneNum.length < 11 || !reg.test($scope.account.phoneNum)) {
          var popup = $ionicPopup.alert({
            title: '提示',
            template: data.error
          });
          $timeout(function() {
            popup.close()
          }, 3000)
        } else {
          var popup = $ionicPopup.alert({
            title: '成功提示',
            template: '验证码已经发送，请稍后'
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          $scope.hasSend = true; //已发送
          var timer = $interval(function() {
            var _self = this;
            if ($scope.second == 0) {
              console.log('clear timer');
              $interval.cancel(timer);
              $scope.hasSend = false;
            }
            $scope.second = $scope.second - 1;
          }, 1000);

        }
      })
    }


    $scope.signUp = function() {
      var user = {
        registerType: 1,
        mobile: $scope.account.phoneNum,
        password: $scope.account.password,
        verifycode: $scope.account.verCode
      }
      if ($scope.account.verCode.length !== 4) {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '验证码位数错误'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        return
      }
      if ($scope.account.password.length == 0) {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '请填写密码'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        return
      }
      console.log(user)
      createUser.save({}, user, function(data) {

        if (data.status == 'suc') {
          currentUser.setAuthToken(data.accessToken)
          var popup = $ionicPopup.alert({
            title: '账号注册成功',
            template: '赶快去完善下个人信息吧！'
          })
          $timeout(function() {
            popup.close()
          }, 3000)
          $window.location.href = '#/mine_info'
        } else {
          var popup = $ionicPopup.alert({
            'title': '提示',
            'template': data.error
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        }
      })
    }
  }])
  //医生登陆
  .controller('doctorSignInCtrl', ['huanxin', '$scope', 'signUp', '$window', '$ionicPopup', '$timeout', 'currentUser', function(huanxin, $scope, signUp, $window, $ionicPopup, $timeout, currentUser) {

    $scope.signInMsg = {
      'username': '',
      'password': '',
      type: 1
    }; //医生登陆

    $scope.signIn = function() {
      signUp.save({}, $scope.signInMsg, function(data) {
        currentUser.setAuthToken(data.accessToken);
        currentUser.setUser($scope.signInMsg.username, $scope.signInMsg.password);
        if (data.status == "suc") {
          //登陆成功 注入环信
          huanxin.registerUser({
            username: $scope.signInMsg.username,
            password: $scope.signInMsg.password,
            success: function(result) {
              console.log('环信注册成功');
              huanxin.connect($scope.signInMsg.username, $scope.signInMsg.password, function() {
                console.log('IM连接成功');
              });
            },
            error: function(e) {
              console.log(e);
              console.log('环信注册失败');
              huanxin.connect($scope.signInMsg.username, $scope.signInMsg.password, function() {
                console.log('IM连接成功');
              });
            }
          });

          currentUser.setDoctorCode(data.user.doctorNo);
          var popup = $ionicPopup.alert({
            title: '登陆成功',
            template: '即将自动进入主页'
          })
          $timeout(function() {
            popup.close()
            $window.location.href = '#/'
          }, 3000)

        } else {
          var popup = $ionicPopup.alert({
            title: '错误提示',
            template: data.error
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          return
        }
      })
    }
  }])
  .controller('doctorEndSettingCtrl', ['$scope', 'currentUser', '$window', '$ionicPopup', '$timeout', function($scope, currentUser, $window, $ionicPopup, $timeout) {
    $scope.isLogin = currentUser.hasAuthToken()
    $scope.goLogin = function() {
      $scope.isLogin = currentUser.hasAuthToken()
      if (!$scope.isLogin) {
        $window.location.href = '#/sigin_in'
      }
    }
    $scope.destroyU = function() {
      currentUser.destroy()
      var popup = $ionicPopup.alert({
        title: '您已经注销',
        template: '即将自动返回'
      })
      $timeout(function() {
        popup.close()
        $window.history.back();
      }, 3000)
    }
  }])

.controller('doctorEndMineCtrl', ['$timeout', '$scope', 'mineInfo', 'currentUser', 'checkLogin', '$window', '$ionicPopup', function($timeout, $scope, mineInfo, currentUser, checkLogin, $window, $ionicPopup) {
    console.log('doctorEndMineCtrl');
    $scope.ischeck = !!checkLogin.check()

    var accesstoken = currentUser.getAuthToken()

    $scope.accesstoken = accesstoken
    console.log(accesstoken);
    if (accesstoken) {
      mineInfo.query({
        accessToken: accesstoken
      }, function(data) {
        if (data.error) {
            var popup = $ionicPopup.alert({
              title: '错误',
              template: data.error
            })
            $timeout(function () {
                popup.close()
           }, 3000)
          $window.location.href = '#/sign_in'
          return;
        }

        $scope.infodata = data

        console.log(data)
      })
    }



    $scope.letugo = function() {
      if (accesstoken) {
        $window.location.href = '#/mine_info'
      } else {
        $window.location.href = '#/sign_in'
      }
    }
    $scope.myCollection = function() {
      if (accesstoken) {
        $window.location.href = '#/mycollection'
      } else {
        $window.location.href = '#/sign_in'
      }
    }
    $scope.myQrCode = function() {
      if (accesstoken) {
        $window.location.href = '#/myqrcode'
      } else {
        $window.location.href = '#/sign_in'
      }
    }
    $scope.gofeedBack = function() {
      if (accesstoken) {
        $window.location.href = '#/feedback'
      } else {
        $window.location.href = '#/sign_in'
      }
    }

  }])
  .controller('changeCtrl', ['$scope', 'updateMsg', 'currentUser', '$ionicPopup', '$window', '$timeout', 'patientProfile', 'districtGet', 'getYy', 'mineInfo', function($scope, updateMsg, currentUser, $ionicPopup, $window, $timeout, patientProfile, districtGet, getYy, mineInfo) {


    $scope.patientData = {
      birthday: '',
      weight: '',
      name: '',
      agender: '',
      zc: '',
      yy: '',
      ks: '',
      jszc: ''
    }

    var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    var datePickerCallback = function(val) {
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
      callback: function(val) {
        datePickerCallback(val);
        return
      },
      dateFormat: 'yyyy-MM-dd',
      closeOnSelect: false,
    };
    //省市县
    var select = {
      accessToken: currentUser.getAuthToken(),
      type: 1

    }
    districtGet.query(select, function(data) {
      $scope.shenglist = data
    })


    console.log($scope.selectsheng);
    $scope.showSelectSheng = function(select) {
      var shi = {
        accessToken: currentUser.getAuthToken(),
        orgId: select,
        type: 2
      }
      districtGet.query(shi, function(data) {
        $scope.shilist = data
      })
      $scope.selectxian = 0;
      $scope.xianlist = null;
      $scope.shengId = select
      $scope.yylist = null;

    }
    $scope.showSelectShi = function(select) {
      console.log(select)
      var xian = {
        accessToken: currentUser.getAuthToken(),
        orgId: select,
        type: 3
      }
      districtGet.query(xian, function(data) {
        $scope.xianlist = data
          //console.log(data)
      })
      $scope.shiId = select


    }
    $scope.showSelectyy = function(select) {
      console.log(select)
      var info = {
        accessToken: currentUser.getAuthToken(),
        provinceId: $scope.shengId,
        cityId: $scope.shiId,
        countyId: select
      }
      getYy.query(info, function(data) {
        console.log(data)
        $scope.yylist = data
      })
      $scope.xianId = select

    }
    mineInfo.query({
      accessToken: currentUser.getAuthToken()
    }, function(data) {
      console.log('mainInfo')
      $scope.infodata = data;
      $scope.patientData.yy = data.hospital;
      console.log(data)
    })
    $scope.saveYY = function() {
      if ($scope.shengId && (!$scope.shiId || !$scope.xianId)) {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: '请选择完整的地域信息'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        return;
      }

      var saveMsg = {
          accessToken: currentUser.getAuthToken(),
          sheng: $scope.shengId,
          shi: $scope.shiId,
          xian: $scope.xianId,
          hospital: $scope.patientData.yy

        }
        // if(!$scope.shengId){
        //   delete saveMsg.sheng;
        //   delete saveMsg.shi;
        //   delete saveMsg.xian;
        // }
      console.log(saveMsg.hospital);
      if (!saveMsg.hospital) {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: '请选择/输入医院'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        return;
      }

      updateMsg.save(saveMsg, function(data) {
        if (data.status == 'suc') {
          // var popup = $ionicPopup.alert({
          //     title: '您的信息修改成功',
          //     template: '3秒后自动返回'
          // })
          // $timeout(function () {
          //     popup.close()
          $window.history.back();
          // }, 3000)
        } else {
          var popup = $ionicPopup.alert({
            title: '错误信息',
            template: data.error
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        }
      })
    }

    $scope.saveMsg = function() {
      var saveMsg = {
        accessToken: currentUser.getAuthToken(),
        name: $scope.patientData.name,
        birthday: $scope.patientData.birthday,
        agender: $scope.patientData.agender,
        hospital: $scope.patientData.yy,
        sheng: $scope.shengId,
        shi: $scope.shiId,
        xian: $scope.xianId,
        technicalTitle: $scope.patientData.zc,
        department: $scope.patientData.ks,
        teachingTitle: $scope.patientData.jszc
      }

      console.log(saveMsg);
      updateMsg.save(saveMsg, function(data) {
        if (data.status == 'suc') {
          // var popup = $ionicPopup.alert({
          //     title: '您的信息修改成功',
          //     template: '3秒后自动返回'
          // })
          // $timeout(function () {
          //     popup.close()
          $window.history.back();
          // }, 3000)
        } else {
          var popup = $ionicPopup.alert({
            title: '错误信息',
            template: data.error
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        }
      })
    }
  }])

.controller('mineInfoCtrl', ['$scope', '$ionicPopup', '$timeout', '$window', 'mineInfo', 'currentUser', 'ionicLoadingConfig', '$ionicLoading', function($scope, $ionicPopup, $timeout, $window, mineInfo, currentUser, ionicLoadingConfig, $ionicLoading) {
    var accesstoken = currentUser.getAuthToken()
    mineInfo.query({
      accessToken: accesstoken
    }, function(data) {
      $scope.infodata = data
      console.log(data)
    })

  }])
  .controller('analysisCtrl', ['$scope', '$window', 'analysisList', 'currentUser', function($scope, $window, analysisList, currentUser) {
    var accesstoken = currentUser.getAuthToken()
    analysisList.query({
      accessToken: accesstoken
    }, function(data) {
      $scope.analysislist = data;

      console.log(data)
    })

  }])
  .controller('analysisDetailCtrl', ['$document', '$scope', '$window', '$stateParams', '$ionicPopup', 'analysisDetail', 'analysisRemark', 'currentUser', 'collection', '$timeout', 'delay', 'SHARE_APP', '$ionicActionSheet', function($document, $scope, $window, $stateParams, $ionicPopup, analysisDetail, analysisRemark, currentUser, collection, $timeout, delay, SHARE_APP, $ionicActionSheet) {

    console.log($ionicActionSheet);
    var accesstoken = currentUser.getAuthToken();
    $scope.showAction = function() {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '<b>分享到新浪微博</b>'
        }, {
          text: '<b>分享到QQ空间</b>'
        }, {
          text: '<b>收藏</b>'
        }],
        buttonClicked: function(index) {
          if (index == 0) {
            $scope.shareWeibo();
          } else if (index == 1) {
            $scope.shareQzone();
          } else if (index == 2) {
            $scope.saveIt();
          }
          return true;
        },
        cancelText: '关闭'
      });
    }

    $scope.$on('$ionicView.enter', function(e, d) {
      analysisDetail.query({
        id: $stateParams.id,
        accessToken: accesstoken
      }, function(data) {
        $scope.analysisdetail = data
        console.log(data);
        $document[0].title = "病例分享:" + " 主讲人:" + data.doctorName + " 来自:" + data.hospital;
        mobShare.config({
          appkey: SHARE_APP,
        });
        $scope.shareWeibo = function() {
          var weibo = mobShare('weibo');
          weibo.send();
        }
        $scope.shareQzone = function() {
          var qzone = mobShare('qzone');
          qzone.send();
        }
      })
    });

    $scope.detailMsg = {
      'acomment': ''
    }

    $scope.aComment = function() {
      if ($scope.detailMsg.acomment.length == 0) {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '请填写评论'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        return
      }

      var msg = {
        accessToken: accesstoken,
        caseId: $stateParams.id,
        content: $scope.detailMsg.acomment
      }
      analysisRemark.save({}, msg, function(detail) {
        if (detail.status == 'suc') {
          $scope.detailMsg.acomment = ''
          analysisDetail.query({
            id: $stateParams.id,
            accessToken: accesstoken
          }, function(data) {
            $scope.analysisdetail = data
            console.log(data)
          })
        } else {
          $window.location.href = '#/'
        }
      })
    }


    $scope.saveIt = function() {

      var colMsg = {
        accessToken: accesstoken,
        caseId: $stateParams.id
      }

      collection.save({}, colMsg, function(col) {

        if (col.status == 'suc') {
          var popup = $ionicPopup.alert({
            title: '成功提示',
            template: '收藏成功'
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        } else {
          var popup = $ionicPopup.alert({
            title: '错误提示',
            template: col.error
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        }
      })
    }
  }])
  //消息记录
  .controller('msgRecordCtrl', ['$scope', 'gonggaolist', 'getPatientAsk', 'currentUser', 'mineInfo', function($scope, gonggaolist, getPatientAsk, currentUser, mineInfo) {
    var accesstoken = currentUser.getAuthToken()
    console.log('msgRecordCtrl');
    mineInfo.query({
      accessToken: accesstoken
    }, function(data) {
      var msg = {
        id: data.id,
        accessToken: accesstoken,
      }
      gonggaolist.query(msg, function(info) {
        $scope.gonggao = info
        console.log(info)
      })
      getPatientAsk.query({
        accessToken: accesstoken
      }, function(data) {
        console.log(data)
        $scope.mynews = data
      })
    })
  }])

.controller('gongGaoListCtrl', ['gonggaoDel','$timeout', '$scope', 'gonggaolist', 'mineInfo', 'currentUser', function(gonggaoDel,$timeout, $scope, gonggaolist, mineInfo, currentUser) {
  var accesstoken = currentUser.getAuthToken()
  mineInfo.query({
    accessToken: accesstoken
  }, function(data) {
    var msg = {
      id: data.id,
      accessToken: accesstoken
    }
    gonggaolist.query(msg, function(info) {
      $scope.gonggao = info
    })

  })
  $scope.del=function(id){
    var msg={
      id: id,
      accessToken: accesstoken
    }
    console.log(msg);
    gonggaoDel.save(msg,function(){
      mineInfo.query({
        accessToken: accesstoken
      }, function(data) {
        var msg = {
          id: data.id,
          accessToken: accesstoken
        }
        gonggaolist.query(msg, function(info) {
          $scope.gonggao = info
        })

      })
    });
  }

}])

.controller('gongGaoReleaseCtrl', ['$scope', '$window', '$stateParams', '$ionicPopup', 'gonggaoRelease', 'currentUser', '$timeout', function($scope, $window, $stateParams, $ionicPopup, gonggaoRelease, currentUser, $timeout) {
  var accesstoken = currentUser.getAuthToken()
  $scope.gongGao = {
    'info': ''
  }
  $scope.onRelease = function() {
    var msg = {
      content: $scope.gongGao.info,
      accessToken: accesstoken
    }
    gonggaoRelease.save({}, msg, function(rel) {
      if (rel.status = 'suc') {
        var popup = $ionicPopup.alert({
          title: '发表成功',
          template: '即将返回'
        })
        $timeout(function() {
          popup.close()
          $window.history.back();
        }, 3000)
      } else {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: rel.error
        })
        $timeout(function() {
          popup.close()
        }, 3000)
      }
    })
  }
}])

//轻松一刻
.controller('relaxedCtrl', ['$timeout', '$scope', 'getCarouselList', function($timeout, $scope, getCarouselList) {
  getCarouselList.query({
    type: 1,
    illType: 3
  }, function(data) {
    $scope.data = data
    console.log(data)
  })

}])

.controller('relaxedDetailCtrl', ['$timeout', '$scope', 'Detail', '$stateParams', 'collection', '$ionicPopup', 'currentUser', 'SHARE_APP', '$ionicActionSheet', function($timeout, $scope, Detail, $stateParams, collection, $ionicPopup, currentUser, SHARE_APP, $ionicActionSheet) {
  var accesstoken = currentUser.getAuthToken();
  $scope.showAction = function() {

    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: '<b>分享到新浪微博</b>'
      }, {
        text: '<b>分享到QQ空间</b>'
      }, {
        text: '<b>收藏</b>'
      }],
      buttonClicked: function(index) {
        if (index == 0) {
          $scope.shareWeibo();
        } else if (index == 1) {
          $scope.shareQzone();
        } else if (index == 2) {
          $scope.saveIt();
        }
        return true;
      },
      cancelText: '关闭'
    });
  }


  Detail.query({
    id: $stateParams.id
  }, function(data) {
    $scope.relaxed = data
    mobShare.config({
      appkey: SHARE_APP,
      params: {
        title: data.title
      }
    });
    $scope.shareWeibo = function() {
      var weibo = mobShare('weibo');
      weibo.send();
    }
    $scope.shareQzone = function() {
      var qzone = mobShare('qzone');
      qzone.send();
    }

  })

  $scope.saveIt = function() {

    var colMsg = {
      accessToken: accesstoken,
      caseId: $stateParams.id
    }

    collection.save({}, colMsg, function(col) {

      if (col.status == 'suc') {
        var popup = $ionicPopup.alert({
          title: '成功提示',
          template: '收藏成功'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
      } else {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: col.error
        })
        $timeout(function() {
          popup.close()
        }, 3000)
      }
    })
  }
}])

.controller('medicalCtrl', ['$timeout', '$scope', 'getCarouselList', function($timeout, $scope, getCarouselList) {
  getCarouselList.query({
    type: 1,
    illType: 2
  }, function(data) {
    $scope.data = data
    console.log(data)
  })
}])

.controller('medicalDetailCtrl', ['articleCollect','$timeout', '$document', '$scope', 'Detail', 'currentUser', '$window', '$stateParams', 'Remark', '$ionicPopup', 'collection', 'SHARE_APP', '$ionicActionSheet', function(articleCollect,$timeout, $document, $scope, Detail, currentUser, $window, $stateParams, Remark, $ionicPopup, collection, SHARE_APP, $ionicActionSheet) {
    console.log(SHARE_APP);
    console.log($ionicActionSheet);
    $scope.showAction = function() {

      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '<b>分享到新浪微博</b>'
        }, {
          text: '<b>分享到QQ空间</b>'
        }, {
          text: '<b>收藏</b>'
        }],
        buttonClicked: function(index) {
          if (index == 0) {
            $scope.shareWeibo();
          } else if (index == 1) {
            $scope.shareQzone();
          } else if (index == 2) {
            $scope.saveIt();
          }
          return true;
        },
        cancelText: '关闭'
      });
    }
    $scope.$on('$ionicView.enter', function(e, d) {
      Detail.query({
        id: $stateParams.id
      }, function(data) {
        $document[0].title = data.title;
        $scope.medicaldetail = data
        mobShare.config({
          appkey: SHARE_APP,
          params: {
            title: data.title
          }
        });
        $scope.shareWeibo = function() {
          var weibo = mobShare('weibo');
          weibo.send();
        }
        $scope.shareQzone = function() {
          var qzone = mobShare('qzone');
          qzone.send();
        }

        console.log(data)
      })
    });


    var accesstoken = currentUser.getAuthToken()
    $scope.markinfo = {
      'remak': ''
    }
    $scope.remark = function() {

      var msg = {
        accessToken: accesstoken,
        articleId: $stateParams.id,
        remark: $scope.markinfo.remak
      }
      if ($scope.markinfo.remak.length == 0) {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '请填写评论'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        return
      }

      Remark.save({}, msg, function(data) {
        $scope.markinfo.remak = ''


        if (data.status == 'suc') {
          Detail.query({
            id: $stateParams.id
          }, function(data) {
            $scope.medicaldetail = data
            console.log(data)
          })
        } else {
          var popup = $ionicPopup.alert({
            title: '错误提示',
            template: '您还未登陆不能进行评论'
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          $window.location.href = '#/sign_in'
        }
      })

    }
    $scope.saveIt = function() {

      var colMsg = {
        accessToken: accesstoken,
        articleId: $stateParams.id
      }

      // collection.save({}, colMsg, function(col) {
      //
      //   if (col.status == 'suc') {
      //     var popup = $ionicPopup.alert({
      //       title: '成功提示',
      //       template: '收藏成功'
      //     })
      //     $timeout(function() {
      //       popup.close()
      //     }, 2000)
      //   } else {
      //     var popup = $ionicPopup.alert({
      //       title: '错误提示',
      //       template: col.error
      //     })
      //     $timeout(function() {
      //       popup.close()
      //     }, 3000)
      //   }
      // })

      articleCollect.save({}, colMsg, function(data) {
        if (data.status == 'suc') {
          var popup = $ionicPopup.alert({
            title: '提示',
            template: '收藏成功'
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        } else {
          var popup = $ionicPopup.alert({
            title: '提示',
            template: data.error
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        }

      })
    }


  }])
  .controller('xinxuegCtrl', ['$scope', '$window', '$ionicPopup', 'currentUser', 'xinxueg', function($scope, $window, $ionicPopup, currentUser, xinxueg) {
    xinxueg.query({}, function(data) {
      $scope.xinlist = data
      console.log(data)
    })
    $scope.link = function(discovery) {
      console.log('link');
      $window.location.href = discovery.url;
    }
    $scope.isLogin = currentUser.hasAuthToken()
    $scope.goPublish = function() {
      if (!$scope.isLogin) {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: '您还未登陆'
        });
        $timeout(function() {
          popup.close()
        }, 3000)
        $window.location.href = '#/sign_in'
      } else {
        $window.location.href = '#/xinxueg_release'
      }
    }
  }])

.controller('xinxuegDetailCtrl', ['$timeout', '$scope', 'xinxuegDetail', '$stateParams', 'currentUser', '$window', '$ionicPopup', 'xinxuegMyRemark', function($timeout, $scope, xinxuegDetail, $stateParams, currentUser, $window, $ionicPopup, xinxuegMyRemark) {
    var accesstoken = currentUser.getAuthToken()
    $scope.link = function(discovery) {
      console.log('link');
      $window.location.href = discovery.url;
    }
    if (accesstoken) {
      xinxuegDetail.query({
        id: $stateParams.id,
        accessToken: accesstoken
      }, function(data) {
        $scope.xinxuegdetail = data
        console.log(data)
      })
    } else {
      var popup = $ionicPopup.alert({
        title: '错误提示',
        template: '您还未登陆'
      });
      $timeout(function() {
        popup.close()
      }, 3000)
      $window.location.href = '#/sign_in'
    }

    $scope.xinDmg = {
      'comment': ''
    }

    $scope.xinComment = function() {
      var comment = {
        heartCircleId: $stateParams.id,
        remark: $scope.xinDmg.comment,
        accessToken: accesstoken
      }
      xinxuegMyRemark.save({}, comment, function(data) {
        console.log(data)
        if (data.status == 'suc') {
          $scope.xinDmg.comment = ''
          xinxuegDetail.query({
            id: $stateParams.id,
            accessToken: accesstoken
          }, function(data) {
            $scope.xinxuegdetail = data
          })
        }
      })

    }

  }])
  .controller('patientCheckCtrl', ['$scope', 'patientCheckBindList', 'currentUser', '$ionicPopup', '$window', 'acceptOrNot', function($scope, patientCheckBindList, currentUser, $ionicPopup, $window, acceptOrNot) {
    patientCheckBindList.query({
      accessToken: currentUser.getAuthToken()
    }, function(data) {
      $scope.data = data
    })
    $scope.accept = function(acceptornot) {
      var msg = {
        id: $scope.data[0].id,
        acceptOrNot: acceptornot,
        accessToken: currentUser.getAuthToken()
      }
      acceptOrNot.save({}, msg, function(data) {
        if (data.status == 'suc') {
          $window.location.reload()
        }
      })
    }

  }])

.controller('patientListCtrl1', function() {
  console.log('patientListCtrl11');
})

.controller('patientListCtrl', ['$scope', 'dayIncrease', 'patientBindList', 'patientCheckBindList', 'currentUser', 'mineInfo', 'bindinfo', '$ionicPopup', '$window', '$timeout', function($scope, dayIncrease, patientBindList, patientCheckBindList, currentUser, mineInfo, bindinfo, $ionicPopup, $window, $timeout) {
  var accesstoken = currentUser.getAuthToken();
  if (!accesstoken) {
    if (!currentUser.already) {

      console.log(currentUser.already);
      // var popup = $ionicPopup.alert({
      //   title: '提示',
      //   template: '登陆才能查看哟！！'
      // })
      // $timeout(function() {
      //   popup.close()
      // }, 2000)
      $window.location.href = "#/sign_in";
      return
    }

  }else{
    mineInfo.query({
      accessToken: accesstoken
    }, function(data) {
      if (data.error) {
        //   var popup = $ionicPopup.alert({
        //     title: '错误',
        //     template: data.error
        //   })
        //   $timeout(function () {
        //       popup.close()
        //  }, 3000)
        $window.location.href = '#/sign_in'
        return;
      }

      $scope.infodata = data

      console.log(data)
    })
  }
  patientCheckBindList.query({
    accessToken: accesstoken
  }, function(data) {
    console.log(data);
    $scope.datacheck = data
    var num = 0
    for (var i = 0; i < data.length; i++) {
      if (data[i].checked == 0) {
        num++
      }
    }
    $scope.nochecknum = num
  })

  patientBindList.query({
    accessToken: accesstoken
  }, function(data) {
    $scope.data = data
    console.log(data)
  })
  mineInfo.query({
    accessToken: accesstoken
  }, function(rihuo) {
    var msg = {
      id: rihuo.id,
    }
    bindinfo.query(msg, function(count) {
      $scope.count = count
    })
  })
  dayIncrease.save({
    accessToken: currentUser.getAuthToken()
  }, function(data) {
    $scope.inScore = data.dayScore

  })
}])


//我的收藏列表
.controller('myCollectionListCtrl', ['deleteArticle','articleCollectList','$timeout', '$scope', 'collectionList', 'collectionDel', 'currentUser', function(deleteArticle,articleCollectList,$timeout, $scope, collectionList, collectionDel, currentUser) {
    var accesstoken = currentUser.getAuthToken()
    collectionList.query({
      accessToken: accesstoken
    }, function(data) {
      $scope.data = data
      console.log(data)
    })


    $scope.del = function(id) {
      collectionDel.save({}, {
        accessToken: accesstoken,
        collectId: id
      }, function(data) {
        if (data.status == 'suc') {
          collectionList.query({
            accessToken: accesstoken
          }, function(data) {
            $scope.data = data
            console.log(data)
          })
        } else {
          console.log(data.error)
        }
      })
    }

    articleCollectList.query({
      accessToken: currentUser.getAuthToken()
    }, function(data) {
      $scope.articlediscover = data
      console.log(data)
    })
    $scope.deleteArticle = function(item) {
      var msg = {
        accessToken: currentUser.getAuthToken(),
        articleId: item
      }
      deleteArticle.save({}, msg, function() {
        articleCollectList.query({
          accessToken: currentUser.getAuthToken()
        }, function(data) {
          $scope.articlediscover = data
        })
      })
    }

  }])
  //添加反馈
  .controller('feedBackCtrl', ['$scope', 'feedBack', 'currentUser', '$ionicPopup', '$window', '$timeout', function($scope, feedBack, currentUser, $ionicPopup, $window, $timeout) {
    var accesstoken = currentUser.getAuthToken()

    $scope.fbInfo = {
      'content': '',
      'contact': ''
    }
    $scope.release = function() {
      var info = {
        content: $scope.fbInfo.content,
        accessToken: accesstoken,
        contact: $scope.fbInfo.contact
      }
      feedBack.save({}, info, function(data) {
        if (data.status = 'suc') {
          var popup = $ionicPopup.alert({
            title: '反馈成功',
            template: '感谢您的大力支持'
          })
          $timeout(function() {
            popup.close()
          }, 3000)
          $window.history.back()

        } else {
          var popup = $ionicPopup.alert({
            title: '未知错误'
          })
          $timeout(function() {
            popup.close()
          }, 3000)
        }
      })
    }
  }])

.controller('patientDetailCtrl', ['$scope', '$ionicPopup', '$window', '$timeout', 'delMyPatient', 'patientDetail', 'currentUser', '$stateParams', function($scope, $ionicPopup, $window, $timeout, delMyPatient, patientDetail, currentUser, $stateParams) {
  var accesstoken = currentUser.getAuthToken()
  var params = {
    id: $stateParams.id,
    accessToken: accesstoken,
    patientId: $stateParams.id
  }
  patientDetail.query(params, function(data) {
    $scope.data = data
    console.log(data)
  })

  $scope.delPatient = function(userid) {
    $ionicPopup.confirm({
      title: '友情提示',
      template: '您确定要解绑患者：<span class="textcolor">' + $scope.data.name + '</span> 吗？',
      cancelText: '关闭',
      okText: '确定'

    }).then(function(res) {
      if (res == true) {
        delMyPatient.save({
          accessToken: accesstoken,
          patientId: userid
        }, function(data) {
          if (data.status = 'suc') {
            var popup = $ionicPopup.alert({
              title: '解绑成功',
              template: '你们已经不是好友啦'
            })
            $timeout(function() {
              popup.close()
              $window.history.back()
            }, 3000)
          } else {
            var popup = $ionicPopup.alert({
              title: '未知错误'
            })
            $timeout(function() {
              popup.close()
            }, 3000)
          }
        })
      } else {
        console.log(res)
      }
    });
  }
}])

.controller('myIconChangeCtrl', ['SERVER','$scope', '$http', 'updateIcon', 'currentUser', '$ionicPopup', '$window', '$timeout', '$ionicLoading', function(SERVER,$scope, $http, updateIcon, currentUser, $ionicPopup, $window, $timeout, $ionicLoading) {

  $scope.xinxuegimage = {
    imageBase64s: '',
  };
  $scope.xinxuegRelease = function(publishphoto) {
    if (publishphoto) {
      $scope.xinxuegimage.imageBase64s = publishphoto[0].dataURL
    } else {

    }

    var getbase64arr = function() {
      var temp = []
      for (var i = 0, len = publishphoto.length; i < len; i++) {
        temp[i] = publishphoto[i].dataURL
          //if (publishphoto[i].file.size > 1024000) {
          //    $ionicPopup.alert({
          //        'title': '提示',
          //        'template': '图片尺寸太大'
          //    })
          //    $scope.isLarge = true
          //    return
          //}
      }
      console.log(temp)
      return temp
    }
    $ionicLoading.show({
      template: '图片正在上传，请稍等'
    });
    var formData = new FormData()
    formData.append('imageBase64s', getbase64arr())
    formData.append('accessToken', currentUser.getAuthToken())

    $http.post(SERVER+'/doctor/profile/update', formData, {
      headers: {
        'Content-Type': undefined
      },
      transformRequest: angular.identity
    }).success(function(data) {
      $ionicLoading.hide()
      console.log(data)
      if (data.status == 'suc') {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '上传成功'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        $window.history.back()
      } else {
        console.log('error')
      }
    })
  }
}])

//绑定我的患者
.controller('patientAddCtrl', ['$timeout', '$window', '$scope', 'patientadd', 'currentUser', '$ionicPopup', '$stateParams', '$ionicLoading', 'ionicLoadingConfig', function($timeout, $window, $scope, patientadd, currentUser, $ionicPopup, $stateParams, $ionicLoading, ionicLoadingConfig) {
  var accesstoken = currentUser.getAuthToken()

  $scope.invite = {
    'mobile': '',
  }
  $scope.Invite = function() {
    var params = {
      accessToken: accesstoken,
      mobile: $scope.invite.mobile

    }
    $ionicPopup.confirm({
      title: '友情提示',
      template: $scope.invite.mobile,
      cancelText: '关闭',
      okText: '确定'

    }).then(function(res) {
      if (res == true) {
        patientadd.save(params, function(data) {
          $scope.data = data
          if (data.status == 'suc') {
            var popup = $ionicPopup.alert({
              title: '提示',
              template: "绑定成功"
            })
            $timeout(function() {
              popup.close()
            }, 3000)
            $window.history.back()
          } else {
            var popup = $ionicPopup.alert({
              title: '提示',
              template: data.error
            });
            $timeout(function() {
              popup.close()
            }, 3000)
          }
        })
      } else {
        console.log(res)
      }
    });

  }
}])

.controller('xinxuegRemarkCtrl', ['SERVER','$scope', '$window', '$http', '$ionicPopup', 'xinxuegRemark', 'currentUser', '$timeout', function(SERVER,$scope, $window, $http, $ionicPopup, xinxuegRemark, currentUser, $timeout) {
  $scope.xinxueg = {
    content: ''
  }

  $scope.xinxuegimage = {
    imageBase64s: '',
  };


  $scope.xinxuegRelease = function(publishphoto) {
    var imgs = [];
    if (publishphoto) {
      var getbase64arr = function() {
        var temp = []
        for (var i = 0, len = publishphoto.length; i < len; i++) {
          temp[i] = publishphoto[i].dataURL
        }
        return temp
      }
      console.log(getbase64arr());
      imgs = getbase64arr();
    }
    var formData = new FormData()
    formData.append('content', $scope.xinxueg.content);

    for (var i = 0; i < imgs.length; i++) {
      formData.append('imageBase64s', imgs[i]);
    }


    formData.append('accessToken', currentUser.getAuthToken())

    $http.post(SERVER+'/doctor/heartcircle/add', formData, {
      headers: {
        'Content-Type': undefined
      },
      transformRequest: angular.identity
    }).success(function(data) {
      console.log(data)
      if (data.status == 'suc') {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '发表成功'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        $window.history.back()
      } else {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: data.error
        })
        $timeout(function() {
          popup.close()
        }, 3000)
      }
    })


  }
}])

.controller('doctorEndChangePwdCtrl', ['$scope', 'currentUser', 'resetPwd', '$ionicPopup', '$timeout', '$window', function($scope, currentUser, resetPwd, $ionicPopup, $timeout, $window) {

  $scope.newMsg = {
    oldPwd: '',
    newPwd: '',
    accessToken: ''
  }
  $scope.resetPwd = function() {
    var newMsg = {
      oldPwd: $scope.newMsg.oldPwd,
      newPwd: $scope.newMsg.newPwd,
      accessToken: currentUser.getAuthToken()
    }
    console.log(newMsg)
    resetPwd.save({}, newMsg, function(data) {
      console.log(data)
      if (data.status == 'suc') {
        // var popup = $ionicPopup.alert({
        //     title: '密码修改成功',
        //     template: '3秒后进入登陆界面'
        // })
        // $timeout(function () {
        //     popup.close()
        $window.location.href = '#/sign_in'
          // }, 3000)
      }
    })
  }
}])


.controller('doctorVerifyCtrl', ['SERVER','$timeout', '$scope', '$window', '$http', '$ionicPopup', 'doctorVerifyUpload', 'currentUser', 'ionicLoadingConfig', '$ionicLoading', function(SERVER,$timeout, $scope, $window, $http, $ionicPopup, doctorVerifyUpload, currentUser, ionicLoadingConfig, $ionicLoading) {

    $scope.verifyimage = {
      crtWithPhoto: "",
      crtWithName: ""
    };

    $scope.uploadVerify = function(crtWithPhoto, crtWithName) {

      console.log(crtWithPhoto)
      console.log(crtWithName)
      if (crtWithPhoto || crtWithName) {
        $ionicLoading.show({
          template: ionicLoadingConfig.template,
        });
        $scope.verifyimage.crtWithPhoto = crtWithPhoto[0].dataURL
        $scope.verifyimage.crtWithName = crtWithName[0].dataURL
        var formData = new FormData();
        formData.append('crtWithPhoto', $scope.verifyimage.crtWithPhoto);
        formData.append('crtWithName', $scope.verifyimage.crtWithName);
        formData.append('accessToken', currentUser.getAuthToken());
        $http.post(SERVER+'/hospital/doctor/verify/upload', formData, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        }).success(function(data) {
          if (data.status == 'suc') {
            $ionicLoading.hide();
            var popup = $ionicPopup.alert({
              title: '提示',
              template: '上传认证信息成功'
            })
            $timeout(function() {
              popup.close()
            }, 3000)
            $window.history.back()
          }
        });
      } else {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '请上传医师证件'
        })
        $timeout(function() {
          popup.close()
        }, 3000)

      }



    }
  }])
  .controller('forgotPwdCtrl', ['$scope', '$window', '$ionicPopup', 'forgotpwd', 'forgotReturn', 'currentUser', function($scope, $window, $ionicPopup, forgotpwd, forgotReturn, currentUser) {
    $scope.forgot = {
      mobile: '',
      verifycode: '',
      newpwd: '',
      confirmPwd: '',
    };
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
    $scope.pwdCheck = function() {
      var msg = {
        mobile: $scope.forgot.mobile
      }
      console.log(msg)
      forgotpwd.query(msg, function(data) {
        if (data.error || $scope.forgot.mobile == 0 || $scope.forgot.mobileh < 11 || !reg.test($scope.forgot.mobile)) {
          var popup = $ionicPopup.alert({
            title: '提示',
            template: data.error
          });
          $timeout(function() {
            popup.close()
          }, 3000)
        } else {
          var popup = $ionicPopup.alert({
            title: '成功提示',
            template: '验证码已经发送，请稍后'
          });
          $timeout(function() {
            popup.close()
          }, 3000)
        }
      }, function() {
        var popup = $ionicPopup.alert({
          title: '错误提示',
          template: '未知错误，请稍后重试'
        });
        $timeout(function() {
          popup.close()
        }, 3000)
      })
    }
    $scope.pwdNext = function() {
      var msg = {
        mobile: $scope.forgot.mobile,
        verifycode: $scope.forgot.verifycode,
        newPwd: $scope.forgot.newpwd,
        confirmPwd: $scope.forgot.confirmPwd,
      }
      console.log(msg)
      forgotReturn.save({}, msg, function(data) {
        if (data.status == 'suc') {
          var popup = $ionicPopup.alert({
            title: '提示',
            template: '密码修改成功'
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          $window.history.back()
        } else {
          var popup = $ionicPopup.alert({
            title: '提示',
            template: data.error
          });
          $timeout(function() {
            popup.close()
          }, 3000)

        }
      })
    }
  }])

.controller('addIllHistoryCtrl', ['$scope', 'currentUser', 'addillHistory', '$stateParams', '$ionicPopup', '$timeout', '$window', function($scope, currentUser, addillHistory, $stateParams, $ionicPopup, $timeout, $window) {
  $scope.history = {
    content: ''
  }
  $scope.reillhistory = function() {
    var Msg = {
      illProfile: $scope.history.content,
      userId: $stateParams.userId,
      accessToken: currentUser.getAuthToken()
    }

    console.log(Msg)
    addillHistory.save({}, Msg, function(data) {
      console.log(data)
      if (data.status == 'suc') {
        // var popup = $ionicPopup.alert({
        //     title: '添加成功',
        //     template: '3秒后返回'
        // })
        // $timeout(function () {
        //     popup.close()
        $window.history.back()
          // }, 3000)
      }
    })
  }
}])

.controller('addBeizhuCtrl', ['$scope', 'currentUser', 'addbeizhu', '$stateParams', '$ionicPopup', '$timeout', '$window', function($scope, currentUser, addbeizhu, $stateParams, $ionicPopup, $timeout, $window) {

    $scope.beizhu = {
      remark: ''
    }
    $scope.relbeizhu = function() {
      var Msg = {
        remark: $scope.beizhu.remark,
        userId: $stateParams.userId,
        accessToken: currentUser.getAuthToken()
      }
      console.log(Msg)
      addbeizhu.save({}, Msg, function(data) {
        console.log(data)
        if (data.status == 'suc') {
          // var popup = $ionicPopup.alert({
          //     title: '添加成功',
          //     template: '3秒后返回'
          // })
          // $timeout(function () {
          //  popup.close()
          $window.history.back()
            // }, 3000)

        }
      })
    }
  }])
  .controller('xueshuCtrl', ['$scope', 'xueshu', function($scope, xueshu) {
    var params = {
      start: 0,
      limit: 10
    }
    $scope.data = [];
    xueshu.list(params, function(err, data) {
      console.log(data);
      $scope.data = data;
    });
  }])
  .controller('xueshuDetailCtrl', ['$window', '$scope', 'xueshu', '$stateParams', 'currentUser', '$ionicPopup', function($window, $scope, xueshu, $stateParams, currentUser, $ionicPopup) {
    $scope.data = {};
    var params = {
      id: $stateParams.id,
      accessToken: currentUser.getAuthToken()
    }
    xueshu.get(params, function(err, data) {
      console.log(data);
      $scope.data = data;
    });
    $scope.baoming = function() {
      $window.location.href = '#/xueshu_baoming';
    }
  }])
  .controller('xueshuBaomingCtrl', ['$window', '$scope', 'xueshu', '$stateParams', 'currentUser', '$ionicPopup', 'mineInfo', '$stateParams', function($window, $scope, xueshu, $stateParams, currentUser, $ionicPopup, mineInfo, $stateParams) {
    $scope.form = {
      name: '',
      mobile: ''
    };
    if (currentUser.getAuthToken()) {
      mineInfo.query({
        accessToken: currentUser.getAuthToken()
      }, function(data) {
        $scope.form = {
          name: data.name,
          mobile: data.username
        }
      });
    }
    $scope.take = function() {
      console.log($scope.form);
      if ($scope.form.name != '' && $scope.form.mobile != '') {
        var params = {
          name: $scope.form.name,
          mobile: $scope.form.mobile,
          address: $scope.form.address,
          id: $stateParams.id
        }
        if (currentUser.getAuthToken()) {
          params.accessToken = currentUser.getAuthToken();
        }
        xueshu.take(params, function(err, data) {
          console.log(data);
          if (data.error) {
            var popup = $ionicPopup.alert({
              title: '错误',
              template: data.error
            });
            $timeout(function() {
              popup.close()
            }, 3000)
            return;
          }
          if (data.status = 'suc') {
            var popup = $ionicPopup.alert({
              title: '提示',
              template: '报名成功'
            });
            $timeout(function() {
              popup.close()
            }, 3000)
            $window.location.href = '#/xueshu';
            return;
          }
        });
      } else {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '请填写完整的信息'
        });
        $timeout(function() {
          popup.close()
        }, 3000)
      }

    }


  }])

.controller('zhenhouxindeCtrl', ['$timeout', '$scope', 'xinde', 'currentUser', function($timeout, $scope, xinde, currentUser) {
    $scope.data = [];
    xinde.list({
      accessToken: currentUser.getAuthToken()
    }, function(err, data) {
      console.log(data);
      $scope.data = data;
    });
  }])
  .controller('zhenhouxindeWodeCtrl', ['$window', '$ionicPopup', '$scope', 'xinde', 'currentUser', function($window, $ionicPopup, $scope, xinde, currentUser) {
    $scope.data = [];
    xinde.mylist({
      accessToken: currentUser.getAuthToken()
    }, function(err, data) {
      console.log(data);
      if (data.error) {
        var popup = $ionicPopup.alert({
          title: '错误',
          template: data.error
        });
        $timeout(function() {
          popup.close()
        }, 3000)
        $window.location.href = "#/sign_in"
        return;
      }

      $scope.data = data;
    });
  }])
  .controller('patientdataCtrl', ['$window', '$ionicPopup', '$scope', 'jilu', 'currentUser', function($window, $ionicPopup, $scope, jilu, currentUser) {
    $scope.p = {
      name: ''
    }
    $scope.patientdata = [];

    function initQuery() {
      var params = {
        accessToken: currentUser.getAuthToken(),
        name: $scope.p.name,
        type: 'all'
      }
      jilu.queryPaitent(params, function(err, data) {
        console.log(data);
        $scope.patientdata = data;

      });
    }
    initQuery();

    $scope.queryPaitent = function() {
      var params = {
        accessToken: currentUser.getAuthToken(),
        name: $scope.p.name
      }
      jilu.queryPaitent(params, function(err, data) {
        $scope.patientdata = data;
      });
    }
  }])


.controller('zhenhouxindeDetailsCtrl', ['$timeout', '$window', '$ionicPopup', 'patientProfile', '$stateParams', '$scope', 'xinde', 'currentUser', function($timeout, $window, $ionicPopup, patientProfile, $stateParams, $scope, xinde, currentUser) {

    patientProfile.query({
      accessToken: currentUser.getAuthToken()
    }, function(data) {
      if (data.error_code) {
        var popup = $ionicPopup.alert({
          title: '错误',
          template: data.error
        });
        $timeout(function() {
          popup.close()
        }, 3000)
        $window.location.href = "#/sign_in"
        return;
      }
      $scope.myscore = data.score;
    })

    $scope.data = [];
    $scope.addscore = 5;
    xinde.get({
      id: $stateParams.id
    }, function(err, data) {
      console.log(data);
      $scope.data = data;
    });

    $scope.add_score = function(score) {
      $scope.addscore += score;
      if ($scope.addscore < 5) {
        $scope.addscore = 5;
      }
    }
    $scope.markinfo = {
      remak: ''
    };
    $scope.remark = function() {
      var accessToken = currentUser.getAuthToken();


      if ($scope.markinfo.remak.length == 0) {
        var popup = $ionicPopup.alert({
          title: '提示',
          template: '请填写评论'
        })
        $timeout(function() {
          popup.close()
        }, 3000)
        return
      }
      var formData = new FormData();
      formData.append('diaExpId', $stateParams.id);
      formData.append('accessToken', currentUser.getAuthToken());
      formData.append('content', $scope.markinfo.remak);
      xinde.addRemark(formData, function(data) {
        $scope.markinfo.remak = ''


        if (data.status == 'suc') {
          xinde.get({
            id: $stateParams.id
          }, function(err, data) {
            console.log(data);
            $scope.data = data;
          });
        } else {
          var popup = $ionicPopup.alert({
            title: '错误提示',
            template: '您还未登陆不能进行评论'
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          $window.location.href = '#/sign_in'
        }
      })

    }

    $scope.reward = function() {

      if ($scope.myscore - $scope.addscore < 0) {
        var popup = $ionicPopup.alert({
          title: '错误',
          template: '您的积分不够打赏'
        });
        $timeout(function() {
          popup.close()
        }, 3000)

        return;
      }
      var formData = new FormData();
      formData.append('diaExpId', $stateParams.id);
      formData.append('accessToken', currentUser.getAuthToken());
      formData.append('score', $scope.addscore);
      xinde.reward(formData, function(data) {
        console.log(data);
        if (data.error_code) {
          var popup = $ionicPopup.alert({
            title: '错误',
            template: data.error
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          return
        }
        var popup = $ionicPopup.alert({
          title: '打赏',
          template: '打赏成功'
        });
        $timeout(function() {
          popup.close()
        }, 3000)
        $window.location.href = "#/zhenhouxinde";
        return;
      });
    }
  }])
  .controller('zhenhouxindeBianjiCtrl', ['$window', '$ionicPopup', 'patientProfile', '$stateParams', '$scope', 'xinde', 'currentUser', function($window, $ionicPopup, patientProfile, $stateParams, $scope, xinde, currentUser) {
    $scope.xinde = {};
    xinde.get({
      id: $stateParams.id
    }, function(err, data) {
      console.log(data);
      $scope.xinde = data;
    });

    $scope.$watch('publishphoto', function(newValue, oldValue) {
      console.log('newValue ' + newValue);


    });
    $scope.fabu = function(publishphoto, status) {
      var imgs = [];
      if (publishphoto) {
        if (publishphoto.length > 3) {
          var popup = $ionicPopup.alert({
            title: '错误',
            template: '最多只能上传三张心得照片'
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          return;
        }
        var getbase64arr = function() {
          var temp = []
          for (var i = 0, len = publishphoto.length; i < len; i++) {
            temp[i] = publishphoto[i].dataURL
          }
          return temp
        }
        console.log(getbase64arr());
        imgs = getbase64arr();
      }
      var formData = new FormData()
      if (!$scope.xinde.illType || !$scope.xinde.illDesc || !$scope.xinde.experience) {
        var popup = $ionicPopup.alert({
          title: '错误',
          template: '请填写完整的心得信息'
        });
        $timeout(function() {
          popup.close()
        }, 3000)
        return;
      }
      formData.append('id', $stateParams.id);
      formData.append('status', status);
      formData.append('illType', $scope.xinde.illType);
      formData.append('illDesc', $scope.xinde.illDesc);
      formData.append('experience', $scope.xinde.experience);
      formData.append('isAnonymous', $scope.xinde.isAnonymous);
      for (var i = 0; i < imgs.length; i++) {
        formData.append('imageBase64s', imgs[i]);
      }


      formData.append('accessToken', currentUser.getAuthToken())
      console.log(formData);
      xinde.update(formData, function(data) {
        if (data.error_code) {
          var popup = $ionicPopup.alert({
            title: '错误',
            template: data.error
          });
          $timeout(function() {
            popup.close()
          }, 3000)
        } else {
          var popup = $ionicPopup.alert({
            title: '成功',
            template: '发布心得成功'
          });
          $timeout(function() {
            popup.close()
          }, 3000)
          $window.location.href = '#/zhenhouxinde_wode'
        }
      });
    }
  }])


.controller('zhenhouxindefabiaoCtrl', ['$timeout', '$scope', 'currentUser', 'xinde', '$ionicPopup', '$window', function($timeout, $scope, currentUser, xinde, $ionicPopup, $window) {
  $scope.xinde = {
    isAnonymous: 1
  };
  $scope.fabu = function(publishphoto, status) {
    var imgs = [];
    if (publishphoto) {
      if (publishphoto.length > 3) {
        var popup = $ionicPopup.alert({
          title: '错误',
          template: '最多只能上传三张心得照片'
        });
        $timeout(function() {
          popup.close()
        }, 3000)
        return;
      }
      var getbase64arr = function() {
        var temp = []
        for (var i = 0, len = publishphoto.length; i < len; i++) {
          temp[i] = publishphoto[i].dataURL
        }
        return temp
      }
      console.log(getbase64arr());
      imgs = getbase64arr();
    }
    var formData = new FormData()
    if (!$scope.xinde.illType || !$scope.xinde.illDesc || !$scope.xinde.experience) {
      var popup = $ionicPopup.alert({
        title: '错误',
        template: '请填写完整的心得信息'
      });
      $timeout(function() {
        popup.close()
      }, 3000)
      return;
    }

    formData.append('status', status);
    formData.append('illType', $scope.xinde.illType);
    formData.append('illDesc', $scope.xinde.illDesc);
    formData.append('experience', $scope.xinde.experience);
    formData.append('isAnonymous', $scope.xinde.isAnonymous);
    for (var i = 0; i < imgs.length; i++) {
      formData.append('imageBase64s', imgs[i]);
    }


    formData.append('accessToken', currentUser.getAuthToken())
    console.log(formData);
    xinde.add(formData, function(data) {
      if (data.error_code) {
        var popup = $ionicPopup.alert({
          title: '错误',
          template: data.error
        });
        $timeout(function() {
          popup.close()
        }, 3000)
      } else {
        var popup = $ionicPopup.alert({
          title: '成功',
          template: '发布心得成功'
        });
        $timeout(function() {
          popup.close()
        }, 3000)
        $window.location.href = '#/zhenhouxinde'
      }
    });
  }
}])

.controller('Messages', ['patientDetail', 'huanxin', '$scope', '$timeout', '$interval', '$ionicScrollDelegate', 'chart', 'currentUser', 'patientProfile', 'getChart', '$stateParams', '$window', function(patientDetail, huanxin, $scope, $timeout, $interval, $ionicScrollDelegate, chart, currentUser, patientProfile, getChart, $stateParams, $window) {
  var limit=5;//默认5条
  $scope.hideTime = true;
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
  var patientId = $stateParams.userId;
  var patientMobile = '';

  //查询患者
  var params = {
    id: patientId,
    accessToken: currentUser.getAuthToken(),
    patientId: patientId
  }
  patientDetail.query(params, function(data) {
    $scope.patient = data
    console.log(data)
  })
  huanxin.onReceive(function(message) { //收取消息处理
    console.log(message);
    $scope.$apply(function() {
      // var timeStr=date.getHours()+":"+date.getMinutes();
      $scope.messages.push({
        isSameDay:true,
        userId: patientId,
        text: message.data
      })
      $ionicScrollDelegate.scrollBottom(true);
    });
  });
  var doctorId ="";
  patientProfile.query({
    accessToken: currentUser.getAuthToken()
  }, function(data) {
    // console.log(data);
    $scope.myId = data.id
    $scope.telephone = data.mobile;
    doctorId = data.id
      // $interval(
      //   function() {
      //     //console.log(patientId+'----'+ doctorId)
          getChart.query({
              accessToken: currentUser.getAuthToken(),
              fromUserId: patientId,
              toUserID: doctorId,
              limit:limit
            },
            function(data) {
              var lastDay=null;
              for(var i=0;i<data.length;i++){
                var isSameDay=moment(lastDay).isSame(moment(data[i].timePoint),'day');
                lastDay=moment(data[i].timePoint);
                if(data[i].toChat!=null){
                    $scope.messages.push({
                      isSameDay:isSameDay,
                      time:data[i].timePointStr,
                      userId: doctorId,
                      text: data[i].toChat
                    })
                  }else{
                    $scope.messages.push({
                      isSameDay:isSameDay,
                      time:data[i].timePointStr,
                      userId:data.fromUserId,
                      text: data[i].fromChat
                    })
                  }
              }
              $ionicScrollDelegate.scrollBottom(true);
            });
      //   }, 2000)
  })
  $scope.doRefreshChat=function(){
      $scope.messages=[];
      limit=limit+5;
      console.log(limit);
      getChart.query({
          accessToken: currentUser.getAuthToken(),
          fromUserId: patientId,
          toUserID: doctorId,
          limit:limit,
        },
        function(data) {
          var lastDay=null;
          for(var i=0 ;i<data.length;i++){
            var isSameDay=moment(lastDay).isSame(moment(data[i].timePoint),'day');
            lastDay=moment(data[i].timePoint);
            if(data[i].toChat!=null){
              $scope.messages.push({
                isSameDay:isSameDay,
                time:data[i].timePointStr,
                userId:doctorId,
                text: data[i].toChat
              })
            }else{

              $scope.messages.push({
                isSameDay:isSameDay,
                time:data[i].timePointStr,
                userId:data.fromUserId,
                text: data[i].fromChat
              })
            }

          }


        })

      $scope.$broadcast('scroll.refreshComplete');
    }

  $scope.data = {};
  $scope.messages = [];

  $scope.sendMessage = function() {
    var date=new Date();
      // var timeStr=date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 "+date.getHours()+":"+date.getMinutes();
    var timeStr=date.getHours()+":"+date.getMinutes();
    if($scope.data.message){
      $scope.messages.push({
        isSameDay:false,
        time:timeStr,
        userId: $scope.myId,
        text: $scope.data.message
      });

      var msg = {
        accessToken: currentUser.getAuthToken(),
        toChat: $scope.data.message,
        fromUserId: patientId,
        toUserID: $scope.myId
      }

      huanxin.sendText(msg.toChat, $scope.patient.mobile);
      chart.save({}, msg, function(data) {
        console.log(data)
      })

      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom(true);
    }
  };

  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };
}]);
