angular.module('medicine.services', ['ngResource'])
  .constant('CURRENT_USER', 'currentUser')
  .constant('SHARE_APP', '1009643115684')
  .factory('getCarouselList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/list/:type/:illType', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('getVerificationCode', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/verificationCode', {
      mobile: '@mobile'
    }, {
      query: {
        method: 'GET',
        params: {
          mobile: ''
        }
      }
    })
  }])
  .factory('createUser', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/register', {
      registerType: '@registerType',
      mobile: '@mobile',
      password: '@password',
      verifycode: '@verifycode'
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])
  .factory('signUp', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/login', {
      username: '@username',
      password: '@password',
      type: '@type'
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])
  .factory('resetPwd', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/pwd/reset', {
      oldPwd: "@oldPwd",
      newPwd: "@newPwd",
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])
  .factory('currentUser', ['localStorageService', 'CURRENT_USER', function(localStorageService, CURRENT_USER) {
    var currentUser = {}
    currentUser.getAuthToken = function() {
      return localStorageService.get(CURRENT_USER)
    }
    currentUser.setAuthToken = function(authToken) {
      localStorageService.set(CURRENT_USER, authToken)
    }
    currentUser.hasAuthToken = function() {
      return localStorageService.get(CURRENT_USER)
    }
    currentUser.destroy = function() {
      localStorageService.remove(CURRENT_USER)
    }
    currentUser.setUser=function(username,password){
      localStorageService.set('username',username);
      localStorageService.set('password',password);
    }
    currentUser.getUser=function(){
      return {
        username: localStorageService.get('username'),
        password: localStorageService.get('password')
      }
    }
    return currentUser
  }])
  .factory('checkLogin', ['currentUser', function(currentUser) {
    var checkLogin = {}
    checkLogin.check = function() {
      return currentUser.hasAuthToken()
    }
    return checkLogin
  }])
  .factory('bindDoctor', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/patientBindDoctor', {
      doctorIdentity: "@doctorIdentity",
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('doctorList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/mydoctors', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('doctorMsg', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/mydoctor/detail/:id', {}, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('updateMsg', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/profile/update', {
      accessToken: "@accessToken",
      imageBase64s: "@imageBase64s",
      name: "@name",
      agender: "@agender",
      birthday: "@birthday",
      mobile: "@mobile",
      weight: "@weight"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('threeKiller', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/ill/articles/:illType', {
      start: '@start',
      limit: '@limit'
    }, {
      get: {
        method: 'GET'
      }
    })
  }])
  .factory('addFeedback', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/back/feedback/add', {
      content: '@content',
      accessToken: '@accessToken',
      contact: '@contact'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('publishdiscover', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/discovery/add', {
      imageBase64s: '@imageBase64s',
      content: '@content',
      accessToken: '@accessToken'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('healthLecture', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/saveHeart/lecture', {}, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('getArticleById', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/detail/:id', {}, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('patientProfile', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/profile', {}, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('discoveryList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/discovery/list', {
      start: '@start',
      limit: '@limit'
    }, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('doctorAnnouncements', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/mydoctor/announcements', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('discoveryDetail', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/discovery/detail/:id', {}, {
      query: {
        method: 'GET',
      }
    })
  }])





.factory('discoveryDetailv', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/patient/discovery/detail/:id/:remarkId', {}, {
    query: {
      method: 'GET',
    }
  })
}])






.factory('discoverRemark', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/patient/discovery/remark/:id', {
    id: '@id',
    remark: '@remark',
    accessToken: "@accessToken",
  }, {
    save: {
      method: 'POST'
    }
  })
}])

.factory('Detail', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/patient/article/detail/:id', {
    accessToken: '@accessToken'
  }, {
    query: {
      method: 'GET'
    }
  })
}])

.factory('Remark', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/remark', {
      accessToken: "@accessToken",
      articleId: '@articleId',
      remark: '@remark'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('unbindDoctor', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/unbind', {
      accessToken: "@accessToken",
      doctorId: "@doctorId"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('forgotpwd', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/pwd/forget/verifycode', {
      mobile: "@mobile",
    }, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('forgotReturn', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/pwd/forget', {
      mobile: '@mobile',
      verifycode: '@verifycode',
      newPwd: '@newPwd',
      confirmPwd: "@confirmPwd"

    }, {
      save: {
        method: 'POST',
      }
    })
  }])
  .factory('patientRemark', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/remark', {
      accessToken: '@accessToken',
      articleId: '@articleId',
      remark: '@remark'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('discoverCollect', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/discovery/collect', {
      accessToken: '@accessToken',
      discoveryId: '@discoveryId'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('collectList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/discovery/collect/list', {
      accessToken: '@accessToken',
    }, {
      get: {
        method: 'GET',
      }
    })
  }])
  .factory('articleCollect', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/collect', {
      accessToken: '@accessToken',
      articleId: '@articleId'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('articleCollectList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/collect/list', {
      accessToken: '@accessToken',
    }, {
      get: {
        method: 'GET',
      }
    })
  }])
  .factory('deleteArticle', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/collect/del', {
      accessToken: '@accessToken',
      articleId: '@articleId'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('deleteDiscover', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/discovery/collect/del', {
      accessToken: '@accessToken',
      discoveryId: '@discoveryId'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('chart', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/chatonline', {
      accessToken: '@accessToken',
      fromUserId: '@fromUserId',
      toUserID: '@toUserID',
      fromChat: '@fromChat',
      toChat: '@toChat'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('getChart', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/chatonline/info', {
      accessToken: "@accessToken",
      fromUserId: "@fromUserId",
      toUserID: "@toUserID",
      limit:"@limit"
    }, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('reply', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/reply/new', {
      accessToken: "@accessToken"
    }, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('wish', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/wish', {
      accessToken: "@accessToken",
      content: "@content"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('helper', function($ionicPopup) {
    var helperObj = {}
    helperObj.fkmsg = function() {
      $ionicPopup.alert({
        title: "提示",
        template: '努力开发中~敬请期待~'
      })
    }
    return helperObj
  })
  .factory('jilu', ['$http', 'SERVER', function($http, SERVER) {
    var fa = {};
    fa.add = function(formData, cb) {
      $http.post(SERVER + '/patient/jilu/add', formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).
      success(cb).
      error(cb);
    }
    fa.query = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/patient/jilu/query'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    return fa;
  }])

.factory('mywish', ['$http', 'SERVER', function($http, SERVER) {
    var fa = {};
    fa.getMyWish = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/patient/wishlist'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    fa.getSuggest = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/patient/suggestwish'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    fa.readWish = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/patient/wish/read'
      }).then(function success(res) {
        console.log('read wish');
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });

    }
    return fa;
  }])
  .factory('huanxin', ['$http', 'SERVER', function($http, SERVER) {
    // console.log('huanxin init');
    var fa = {};
    var APPKEY = 'laduola#ldlceshi';
    var conn = null;
    var config = {

      /*
          The global value set for xmpp server
          ws://im-api.easemob.com/ws/
          wss://im-api.easemob.com/ws/
          http://im-api.easemob.com/http-bind/
          https://im-api.easemob.com/http-bind/
      */
      xmppURL: 'wss://im-api.easemob.com/ws/',
      /*
          The global value set for Easemob backend REST API
          http://a1.easemob.com
      */
      apiURL: 'http://a1.easemob.com',
      /*
          连接时提供appkey
      */
      appkey: "laduola#ldlceshi",
      https: true
    }

    fa.registerUser = function(options) {
      options.appKey = APPKEY;

      Easemob.im.Helper.registerUser(options);
    }
    var doReceive;
    fa.onReceive=function(cb){
      doReceive=cb;
    }
    fa.connect = function(username, password, cb) {

      conn = new Easemob.im.Connection();
      console.log({
        user: username,
        pwd: password,
        appKey: APPKEY
      });
      conn.init({
        onOpened: function() {
          cb();
          conn.setPresence();
        },
        onTextMessage: function(message) {
          console.log(message);
          // alert("发送消息成功");
          if(doReceive){
            doReceive(message);
          }

        }
      });
      conn.open({
        apiUrl: config.apiURL,
        user: username,
        pwd: password,
        //连接时提供appkey
        appKey: config.appkey
      });
    }
    fa.sendText = function(msg, to) {
      var options = {
        to: to,
        msg: msg,
        type: "chat"
      };
      console.log(msg)
      console.log(options)
        //发送文本消息接口
      conn.sendTextMessage(options);
    }

    fa.getConnect = function() {
      return conn;
    }
    return fa;
  }]);
