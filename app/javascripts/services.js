angular.module('medicine.services', ['ngResource'])
    .factory('getCarouselList', ['$resource', function ($resource) {
        return $resource('http://112.126.83.112:8080/hospital/back/article/list/:type/:category', {}, {
            query: {
                method: 'GET',
                params: {
                    "type": "1",
                    "category": "1",
                },
                isArray: true
            }
        })
    }])
    .factory('getVerificationCode',['$resource',function($resource){
        return $resource('http://112.126.83.112:8080/hospital/u/verificationCode',{mobile: '@mobile'},{
            query: {
                method: 'GET',
                params: {
                    mobile: ''
                }
            }
        })
    }])
    .factory('createUser',['$resource',function($resource){
        return $resource('http://112.126.83.112:8080/hospital/u/register',{registerType:'@registerType', mobile:'@mobile', password:'@password',verifycode:'@verifycode'},{
            save: {
                method: 'POST',
                params:{
                }
            }
        })
    }])
    .factory('signUp',['$resource',function($resource){
        return $resource('http://112.126.83.112:8080/hospital/u/login',{username:'@username',password:'@password'},{
            save:{
                method: 'POST',
                params:{

                }
            }
        })
    }])
