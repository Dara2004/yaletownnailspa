angular.module('subsService', [])
    .factory('Subscribers', ['$http', function ($http) {
        return {
            get: function () {
                return $http.get('api/list');
            },
            create: function (subsData) {
                return $http.post('api/list', subsData);
            },
            delete: function (id) {
                return $http.delete('api/list' + id);
            }
        }
    }]);
