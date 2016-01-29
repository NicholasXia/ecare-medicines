angular.module('medicine.filters', [])
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url)
        }
    }])
    .filter('trustHtml',['$sce', function($sce) {
        return function (html) {
            return $sce.trustAsHtml(html);
        }
    }])



