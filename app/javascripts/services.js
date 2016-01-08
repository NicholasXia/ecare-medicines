angular.module('medicine.services', ['ngResource'])
    .constant('CURRENT_USER', 'currentUser')
    .factory('getCarouselList', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/back/article/list/:type/:category', {}, {
            query: {
                method: 'GET',
                params: {
                    "type": "2",
                    "category": "1",
                },
                isArray: true
            }
        })
    }])
    .factory('getVerificationCode', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/u/verificationCode', {mobile: '@mobile'}, {
            query: {
                method: 'GET',
                params: {
                    mobile: ''
                }
            }
        })
    }])
    .factory('createUser', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/u/register', {
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
    .factory('signUp', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/u/login', {
            username: '@username',
            password: '@password'
        }, {
            save: {
                method: 'POST',
                params: {}
            }
        })
    }])
    .factory('resetPwd', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/u/pwd/reset', {
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
    .factory('bindDoctor', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/patient/patientBindDoctor', {
            doctorIdentity: "@doctorIdentity",
            accessToken: "@accessToken"
        }, {
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('updateMsg', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/patient/profile/update', {
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
    .factory('threeKiller',['$resource',function($resource){
        return $resource('http://112.126.83.112:8080/hospital/patient/ill/articles',{},{
            get:{
                method: 'GET'
            }
        })
    }])
    .factory('addFeedback',['$resource',function($resource){
       return $resource('http://112.126.83.112:8080/hospital/back/feedback/add',{content:'@content',accessToken:'@accessToken',contact:'@contact'},{
           save:{
               method: 'POST'
           }
       })
    }])
    .factory('publishdiscover',['$resource',function($resource){
        return $resource('http://112.126.83.112:8080/hospital/patient/discovery/add',{imageBase64s:'@imageBase64s',content:'@content',accessToken:'@accessToken'},{
            save:{
                method: 'POST'
            }
        })
    }])
