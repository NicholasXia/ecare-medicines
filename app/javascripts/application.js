angular.module('medicine', ['ionic', 'medicine.controllers', 'medicine.services', 'medicine.directive', 'medicine.filters', 'angular-carousel', 'ionic-datepicker', 'LocalStorageModule','ngTouch','ui.calendar'])
  .constant('ionicLoadingConfig', {
    template: "<ion-spinner icon='ripple' class='spinner-energized'></ion-spinner>",
    hideOnStateChange: true
  })
  .constant('SERVER', 'http://127.0.0.1:8080/hospital')
  // .constant('SERVER', 'http://123.56.184.184:8080/hospital')
  //.constant('SERVER', 'http://work.e-care365.com/hospital')
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom')
    $ionicConfigProvider.navBar.alignTitle('center')
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
  })
  .factory('sessionInjector', ['$window',function($window) {
    var sessionInjector={
      response: function(response) {
            // if(response.data.error_code=='10002'){
            //   console.log(response);
            //   $window.location="#/signup"
            // }

            return response;
      }
    }
    return sessionInjector;
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
  }])


/*
.config(function(localStorageServiceProvider){
 localStorageServiceProvider
 .setStorageType('sessionStorage')
 .setNotify(true, true)
 })
 */

.config(function($stateProvider, $urlRouterProvider) {

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
    // .state('tabs.knowledge', {
    //   url: "/knowledge",
    //   views: {
    //     'knowledge-tab': {
    //       templateUrl: "templates/knowledge.html",
    //       controller: "doctorEndKnowledgeCtrl"
    //     }
    //   }
    // })
    .state('tabs.knowledge', {
      url: "/knowledge",
      views: {
        'knowledge-tab': {
          templateUrl: "templates/sangao.html",
          controller: "articleCtrl"
        }
      }
    })
    // .state('tabs.guanxinbing', {
    //   url: "/guanxinbing",
    //   views: {
    //     'guanxinbing-tab': {
    //       templateUrl: "templates/sangao.html",
    //       controller: "articleCtrl"
    //     }
    //   }
    // })

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
    .state('doctortabs', {
      url: '/mydoctor',
      templateUrl: "templates/my_doctor.html"
    })
    .state('doctortabs.notice', {
      url: "/notice",
      views: {
        'notice-tab': {
          templateUrl: "templates/notice_tab.html",
          controller: "doctorAnnouncementsCtrl"
        }
      }
    })
    .state('doctortabs.consult', {
      url: "/consult",
      views: {
        'consult-tab': {
          templateUrl: "templates/consult_tab.html",
          controller:"doctorChat"
        }
      }
    })
    .state('doctortabs.doctorlist', {
      url: "/doctorlist",
      views: {
        'doctorlist-tab': {
          templateUrl: "templates/doctorlist_tab.html",
          controller: "doctorListCtrl"
        }
      }
    })


  /*三高*/
  .state('threekiller', {
      url: '/threekiller',
      templateUrl: "templates/three_killer.html"
    })
    .state('threekiller.zhishi', {
      url: "/zhishi",
      views: {
        'zhishi-tab': {
          templateUrl: "templates/zhishi_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('threekiller.manhua', {
      url: "/manhua",
      views: {
        'manhua-tab': {
          templateUrl: "templates/manhua_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('threekiller.shipin', {
      url: "/shipin",
      views: {
        'shipin-tab': {
          templateUrl: "templates/shipin_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    /*冠心病*/
    // .state('guanxinbing', {
    //   url: '/guanxinbing',
    //   templateUrl: "templates/guanxinbing.html"
    // })

    .state('guanxinbing', {
      url: "/guanxinbing",
      templateUrl: "templates/sangao.html",
      controller: "articleCtrl"
    })
    .state('guanxinbing.zhishi', {
      url: "/zhishi",
      views: {
        'zhishi-tab': {
          templateUrl: "templates/zhishi_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('guanxinbing.manhua', {
      url: "/manhua",
      views: {
        'manhua-tab': {
          templateUrl: "templates/manhua_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('guanxinbing.shipin', {
      url: "/shipin",
      views: {
        'shipin-tab': {
          templateUrl: "templates/shipin_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })

  /*心肌梗塞*/
  // .state('xinjigengse', {
  //     url: '/xinjigengse',
  //     templateUrl: "templates/xinjigengse.html"
  //   })
  .state('xinjigengse', {
    url: '/xinjigengse',
    templateUrl: "templates/sangao.html",
    controller: "articleCtrl"
  })
    .state('xinjigengse.zhishi', {
      url: "/zhishi",
      views: {
        'zhishi-tab': {
          templateUrl: "templates/zhishi_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('xinjigengse.manhua', {
      url: "/manhua",
      views: {
        'manhua-tab': {
          templateUrl: "templates/manhua_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('xinjigengse.shipin', {
      url: "/shipin",
      views: {
        'shipin-tab': {
          templateUrl: "templates/shipin_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    /*心力衰竭*/
    // .state('xinlishuaijie', {
    //   url: '/xinlishuaijie',
    //   templateUrl: "templates/xinlishuaijie.html"
    // })
    .state('xinlishuaijie', {
      url: '/xinlishuaijie',
      templateUrl: "templates/sangao.html",
      controller: "articleCtrl"
    })
    .state('xinlishuaijie.zhishi', {
      url: "/zhishi",
      views: {
        'zhishi-tab': {
          templateUrl: "templates/zhishi_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('xinlishuaijie.manhua', {
      url: "/manhua",
      views: {
        'manhua-tab': {
          templateUrl: "templates/manhua_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('xinlishuaijie.shipin', {
      url: "/shipin",
      views: {
        'shipin-tab': {
          templateUrl: "templates/shipin_tab.html",
          controller: "threeKillCtrl"
        }
      }
    })
    .state('zhishidetail', {
      url: "/zhishidetail/:id",
      templateUrl: "templates/zhishi_detail.html",
      controller: "zhishiDetailCtrl"
    })
    .state('manhuadetail', {
      url: "/manhuadetail/:id",
      templateUrl: "templates/manhua_detail.html",
      controller: "manhuaDetailCtrl"
    })

  .state('confirm', {
      url: "/confirm",
      templateUrl: "templates/confirm_id.html",
      controller: "doctorEndConfirmIdCtrl"
    })
    .state('signin', {
      url: "/signin",
      templateUrl: "templates/sign_in.html",
      controller: "doctorEndSignInCtrl"
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "templates/sign_up.html",
      controller: "doctorEndSignUpCtrl"
    })
    .state('feedback', {
      url: "/feedback",
      templateUrl: "templates/feedback.html",
      controller: "doctorEndFeedbackCtrl"
    })
    .state('setting', {
      url: "/setting",
      templateUrl: "templates/setting.html",
      controller: "doctorEndSettingCtrl"
    })
    .state('personal', {
      url: "/personal",
      templateUrl: "templates/personal_data.html",
      controller: "doctorEndPersonalDataCtrl"
    })
    .state('wishwall', {
      url: "/wishwall",
      templateUrl: "templates/wish_wall.html",
      controller: "doctorEndWishWallCtrl"
    })
    .state('binddoctor', {
      url: "/binddoctor",
      templateUrl: "templates/bind_doctor.html",
    })
    .state('numberway', {
      url: "/numberway",
      templateUrl: "templates/number_way.html",
      controller: "doctorEndNumberWayCtrl"
    })
    .state('instruction', {
      url: "/instruction",
      templateUrl: "templates/instruction.html",
      controller: "doctorEndInstructionCtrl"
    })
    .state('appointment', {
      url: "/appointment",
      templateUrl: "templates/appointment.html",
      controller: "doctorEndAppointmentCtrl"
    })
    .state('beds', {
      url: "/beds",
      templateUrl: "templates/beds.html",
      controller: "doctorEndBedsCtrl"
    })
    .state('healthEvaluation', {
      url: "/healthEvaluation",
      templateUrl: "templates/health_evaluation.html",
      controller: "doctorEndHealthEvaluationCtrl"
    })
    .state('myDoctor', {
      url: "/myDoctor",
      templateUrl: "templates/my_doctor.html",
      controller: "doctorEndMyDoctorCtrl"
    })
    .state('changepwd', {
      url: "/changepwd",
      templateUrl: "templates/change_pwd.html",
      controller: "doctorEndChangePwdCtrl"
    })
    .state('doctordata', {
      url: "/doctordata/:id",
      templateUrl: "templates/doctor_data.html",
      controller: "doctorEndDoctorDataCtrl"
    })

  .state('discoverdetail', {
      url: "/discoverdetail/:id",
      templateUrl: "templates/discover_detail.html",
      controller: "doctorEndDiscoverDetailCtrl"
    })
    .state('discoverdetailv', {
      url: "/discoverdetail/:id/:remarkId",
      templateUrl: "templates/discover_detail.html",
      controller: "doctorEndDiscoverDetailvCtrl"
    })

  .state('discoverpost', {
      url: "/discoverpost",
      templateUrl: "templates/discover_post.html",
      contorller: "doctorEndDiscoverPostCtrl"
    })
    .state('evaluationlist', {
      url: "/evaluation",
      templateUrl: "templates/evaluation_list.html",
      controller: "doctorEndEvaluationListCtrl"
    })
    .state('scanway', {
      url: "/scanway",
      templateUrl: "templates/scan_way.html",
      controller: "doctorEndScanWayCtrl"
    })
    .state('collection', {
      url: "/collection",
      templateUrl: "templates/collection.html",
      controller: "doctorEndCollectionCtrl"
    })
    .state('publishdiscover', {
      url: "/publishdiscover",
      templateUrl: "templates/publish_discover.html",
      controller: "doctorEndPublishDiscoverCtrl"
    })
    .state('textcontent', {
      url: "/textcontent/:id",
      templateUrl: 'templates/textcontent.html',
      controller: 'doctorEndTextContentCtrl'
    })
    .state('changeicon', {
      url: "/changeicon",
      templateUrl: "templates/changeicon.html",
      controller: 'changeCtrl'
    })
    .state('changename', {
      url: "/changename",
      templateUrl: "templates/changename.html",
      controller: 'changeCtrl'
    })
    .state('changephone', {
      url: "/changephone",
      templateUrl: "templates/changephone.html",
      controller: 'changeCtrl'
    })
    .state('changesex', {
      url: "/changesex",
      templateUrl: "templates/changesex.html",
      controller: 'changeCtrl'
    })
    .state('changebirth', {
      url: "/changebirth",
      templateUrl: "templates/changebirth.html",
      controller: 'changeCtrl'
    })
    .state('changeweight', {
      url: "/changeweight",
      templateUrl: "templates/changeweight.html",
      controller: 'changeCtrl'
    })
    .state('forgot_pwd', {
      url: "/forgot_pwd",
      templateUrl: "templates/forgot_pwd.html",
      controller: "forgotPwdCtrl"
    })
    .state('chart', {
      url: "/chart/:id",
      templateUrl: "templates/chart.html",
      controller: "Messages"
    })
    .state('fkshow', {
      url: "/fkshow",
      templateUrl: "templates/fk.html"
    })
    .state('xinyuan', {
      url: "/xinyuan",
      templateUrl: "templates/xinyuan.html",
      controller:"xinyuanCtrl"
    })
    .state('xinyuan_help',{
      url:"/xinyuan_help",
      templateUrl: "templates/xinyuan_help.html",
    })
    .state('xinyuan_fabu',{
      url:"/xinyuan_fabu",
      templateUrl:"templates/xinyuan_fabu.html",
      controller:"xinyuanFabuCtrl"
    })
    .state('xinyuan_wode',{
      url:"/xinyuan_wode",
      templateUrl:"templates/xinyuan_wode.html",
      controller:"xinyuanWodeCtrl"
    })
    .state('about',{
      url:"/about",
      templateUrl:"templates/about.html"
    })
    .state('jilu',{
      url:"/jilu",
      templateUrl:"templates/jilu.html",
      controller:"jiluCtrl"
    })
    .state('jilu_details',{
      url:"/jilu_details",
      templateUrl:"templates/jilu_details.html",

    })
    .state('jilu_xueya',{
      url:"/jilu_xueya",
      templateUrl:"templates/jilu_xueya.html",
      controller:"jiluDeailtsCtrl"
    })
    .state('jilu_tizhong',{
      url:"/jilu_tizhong",
      templateUrl:"templates/jilu_tizhong.html",
      controller:"jiluDeailtsCtrl"
    })
    .state('jilu_xinlv',{
      url:"/jilu_xinlv",
      templateUrl:"templates/jilu_xinlv.html",
      controller:"jiluDeailtsCtrl"
    })

    .state('mianze',{
      url:"/mianze",
      templateUrl:"templates/mianze.html"
    });
  $urlRouterProvider.otherwise("/tab/home");
}).run(['$stateParams','huanxin','$timeout','$window','$ionicPopup','currentUser','$rootScope', function($stateParams,huanxin,$timeout,$window,$ionicPopup,currentUser,$rootScope) {

  console.log('connect '+huanxin.getConnect());
    if(currentUser.getUser().password){//登录
      huanxin.connect(currentUser.getUser().username,currentUser.getUser().password,function(){
        console.log('IM conn连接');
      });

    }

  document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);


  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {

      //必须完成资料

      // console.log('ddd');
      // console.log(toParams);
      // console.log($stateParams);
      var forbit=['jilu'];
            for(i in forbit){
              console.log(forbit[i]);
              console.log(toState);

              if(forbit[i]==toState.name){
                if(currentUser.getAuthToken()==null){
                  var popup = $ionicPopup.alert({
                      title: '错误提示',
                      template: '没有登录'
                  });
                  $timeout(function(){
                    popup.close();
                    $window.location.href="#/signup";
                  }, 1500);

                }
                break;
              }
            }

      var baiduUrl="#"+toState.url;
      if(toParams.id){
             baiduUrl= "#"+toState.url.replace(":id",toParams.id);
            _hmt.push(['_trackPageview',baiduUrl]);
      }if(toState.name.indexOf('tabs')>0){
             baiduUrl="#/tab"+toState.url;
            _hmt.push(['_trackPageview',baiduUrl]);

      }else{

        _hmt.push(['_trackPageview', baiduUrl]);
      }
      console.log(baiduUrl);
    });
}]);
