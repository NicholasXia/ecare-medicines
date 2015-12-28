angular.module('medicine.services',['ngResource'])
.factory('getCarouselList',['$resource',function($resource){
        return $resource('http://115.28.70.85:8080/dpc/back/other/bannerSlide/list',{},{
            query:{
                method: 'POST'
            }
        })
    }])
