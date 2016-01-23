angular.module('medicine.filters', [])
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url)
        }
    }])




////////////////
// fitlers
    .filter('nl2br', ['$filter',
        function($filter) {
            return function(data) {
                if (!data) return data;
                return data.replace(/\n\r?/g, '<br />');
            };
        }
    ])
