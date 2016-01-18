angular.module('medicine.services', ['ngResource'])
    .constant('CURRENT_USER', 'currentUser')
    .factory('getCarouselList', ['$resource', 'SERVER',function ($resource,SERVER) {
        return $resource(SERVER +'/patient/article/list/:type/:category', {}, {
            query: {
                method: 'GET',
                params:{
                    type: 2,
                    category: 1
                },
                isArray: true
            }
        })
    }])
    .factory('getVerificationCode', ['$resource', 'SERVER', function ($resource,SERVER) {
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
    .factory('checkLogin',['currentUser',function(currentUser){
        var checkLogin = {}
        checkLogin.check = function(){
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
    .factory('doctorList',['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/mydoctors',{},{
            query:{
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('doctorMsg',['$resource','SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/mydoctor/detail/:id', {}, {
            query:{
                method: 'GET'
            }
        })
    }])
    .factory('updateMsg', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/profile/update', {
            accessToken: "@accessToken",
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
    .factory('threeKiller',['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/ill/articles/:illType',{},{
            get:{
                method: 'GET'
            }
        })
    }])
    .factory('addFeedback',['$resource', 'SERVER', function($resource, SERVER){
       return $resource(SERVER + '/back/feedback/add',{content:'@content',accessToken:'@accessToken',contact:'@contact'},{
           save:{
               method: 'POST'
           }
       })
    }])
    .factory('publishdiscover',['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/discovery/add',{imageBase64s:'@imageBase64s',content:'@content',accessToken:'@accessToken'},{
            save:{
                method: 'POST'
            }
        })
    }])
    .factory('healthLecture', ['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/saveHeart/lecture',{},{
            query:{
                method: 'GET'
            }
        })
    }])
    .factory('getArticleById',['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/article/detail/:id',{},{
            query:{
                method: 'GET'
            }
        })
    }])
    .factory('patientProfile',['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/profile',{},{
            query:{method: 'GET'}
        })
    }])
    .factory('discoveryList',['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/discovery/list',{},{
            query:{
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('doctorAnnouncements',['$resource', 'SERVER', function($resource,SERVER){
       return $resource(SERVER + '/patient/mydoctor/announcements',{},{
           query:{
               method: 'GET',
               isArray: true
           }
       })
    }])
    .factory('discoveryDetail',['$resource', 'SERVER', function($resource, SERVER){
        return $resource(SERVER + '/patient/discovery/detail/:id',{},{
            query:{
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
