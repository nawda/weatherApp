(function() {
    'use strict';

    angular
        .module('app')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ["$http", "$q", "$log"]; //maybe need ""

    /* @ngInject */
    function WeatherFactory($http, $q, $log) {
        var service = {
            getWeather: getWeather //, if more functions
        };
        return service;

        ////////////////


        function getWeather(city) {
            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: ('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=8d341ab1bde4d1589b7108af6c9267fd')
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                            toastr.success('Successful!');
                        } else {
                            defer.reject(response);
                            toastr.warning('Sorry there has been an error connecting to the API <br/>' + response.config.url);
                        }
                    },
                    //failure
                    function(error) {
                        defer.reject(error);
                        $log.error(error);
                        toastr.error('error: '+ error.data + '<br/>status: ' + error.statusText);
                    });
            return defer.promise;

        }
    }
})();
