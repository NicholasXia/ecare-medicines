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
    .factory('signIn',['$resource',function($resource){
        return $resource('http://112.126.83.112:8080/hospital/u/verificationCode',{},{
            query: {
                method: 'GET',
                params: {
                }
            }
        })
    }])
