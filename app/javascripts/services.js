angular.module('medicine.services', ['ngResource'])
    .constant('CURRENT_USER', 'currentUser')
    .factory('getCarouselList', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/article/list/:type/:category', {}, {
            query: {
                method: 'GET',
                params: {
                    type: 2,
                    category: 1
                },
                isArray: true
            }
        })
    }])
    .factory('getVerificationCode', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/u/verificationCode', {mobile: '@mobile'}, {
            query: {
                method: 'GET',
                params: {
                    mobile: ''
                }
            }
        })
    }])
    .factory('createUser', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('signUp', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/u/login', {
            username: '@username',
            password: '@password'
        }, {
            save: {
                method: 'POST',
                params: {}
            }
        })
    }])
    .factory('resetPwd', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('currentUser', ['localStorageService', 'CURRENT_USER', function (localStorageService, CURRENT_USER) {
        var currentUser = {}
        currentUser.getAuthToken = function () {
            return localStorageService.get(CURRENT_USER)
        }
        currentUser.setAuthToken = function (authToken) {
            localStorageService.set(CURRENT_USER, authToken)
        }
        currentUser.hasAuthToken = function () {
            return localStorageService.get(CURRENT_USER)
        }
        currentUser.destroy = function () {
            localStorageService.remove(CURRENT_USER)
        }
        return currentUser
    }])
    .factory('checkLogin', ['currentUser', function (currentUser) {
        var checkLogin = {}
        checkLogin.check = function () {
            return currentUser.hasAuthToken()
        }
        return checkLogin
    }])
    .factory('bindDoctor', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/patientBindDoctor', {
            doctorIdentity: "@doctorIdentity",
            accessToken: "@accessToken"
        }, {
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('doctorList', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/mydoctors', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('doctorMsg', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/mydoctor/detail/:id', {}, {
            query: {
                method: 'GET'
            }
        })
    }])
    .factory('updateMsg', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/profile/update', {
            accessToken: "@accessToken",
            imageBase64s :"@imageBase64s",
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
    .factory('threeKiller', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/ill/articles/:illType', {}, {
            get: {
                method: 'GET'
            }
        })
    }])
    .factory('addFeedback', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('publishdiscover', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('healthLecture', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/saveHeart/lecture', {}, {
            query: {
                method: 'GET'
            }
        })
    }])
    .factory('getArticleById', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/article/detail/:id', {}, {
            query: {
                method: 'GET'
            }
        })
    }])
    .factory('patientProfile', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/profile', {}, {
            query: {method: 'GET'}
        })
    }])
    .factory('discoveryList', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/discovery/list', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('doctorAnnouncements', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/mydoctor/announcements', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('discoveryDetail', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/discovery/detail/:id', {}, {
            query: {
                method: 'GET',
            }
        })
    }])
    .factory('discoverRemark', ['$resource', 'SERVER', function ($resource, SERVER) {
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

    .factory('Detail', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/article/detail/:id', {}, {
            query: {
                method: 'GET'
            }
        })
    }])

    .factory('Remark', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('unbindDoctor',['$resource','SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/unbind', {
           accessToken: "@accessToken",
            doctorId: "@doctorId"
        },{
           save: {
                method: 'POST'
           }
        })
    }])
    .factory('forgotpwd', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/u/pwd/forget/verifycode', {
            mobile: "@mobile",
        }, {
            query: {
                method: 'GET'
            }
        })
    }])
    .factory('forgotReturn', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/u/pwd/forget', {
            mobile:'@mobile',
            verifycode:'@verifycode',
            newPwd:'@newPwd',
            confirmPwd: "@confirmPwd"

        }, {
            save: {
                method: 'POST',
            }
        })
    }])
    .factory('patientRemark', ['$resource', 'SERVER', function($resource, SERVER){
       return $resource(SERVER + '/patient/article/remark',{
           accessToken: '@accessToken',
           articleId: '@articleId',
           remark: '@remark'
       },{
           save: {
               method: 'POST'
           }
       })
    }])
    .factory('discoverCollect', ['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/discovery/collect', {
            accessToken: '@accessToken',
            discoveryId: '@discoveryId'
        },{
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('collectList', ['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/discovery/collect/list',{
            accessToken: '@accessToken',
        },{
            get: {
                method: 'GET',
            }
        })
    }])
    .factory('articleCollect', ['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/article/collect', {
            accessToken: '@accessToken',
            articleId: '@articleId'
        },{
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('articleCollectList', ['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/article/collect/list',{
            accessToken: '@accessToken',
        },{
            get: {
                method: 'GET',
            }
        })
    }])
    .factory('deleteArticle', ['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/article/collect/del', {
            accessToken: '@accessToken',
            articleId: '@articleId'
        },{
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('deleteDiscover', ['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/discovery/collect/del', {
            accessToken: '@accessToken',
            discoveryId: '@discoveryId'
        },{
            save: {
                method: 'POST'
            }
        })
    }])


//////////////
// services
    .factory('MockService', ['$http', '$q',
        function($http, $q) {
            var me = {};

            me.getUserMessages = function(d) {
                /*
                 var endpoint =
                 'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
                 return $http.jsonp(endpoint).then(function(response) {
                 return response.data;
                 }, function(err) {
                 console.log('get user messages error, err: ' + JSON.stringify(
                 err, null, 2));
                 });
                 */
                var deferred = $q.defer();

                setTimeout(function() {
                    deferred.resolve(getMockMessages());
                }, 1500);

                return deferred.promise;
            };

            me.getMockMessage = function() {
                return {
                    userId: '534b8e5aaa5e7afc1b23e69b',
                    date: new Date(),
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                };
            }

            return me;
        }
    ])