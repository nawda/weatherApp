(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', Controller);

    Controller.$inject = ['WeatherFactory', '$log', ];

    /* @ngInject */
    function Controller(WeatherFactory, $log) {
        var vm = this;
        vm.title = 'WeatherController';
        vm.items = [];
        vm.set = function(passvalue) {
            vm.oras = passvalue;
        };

         var city = "San Diego";


      /*  activate(city);
        ////////////////
        function activate(city) {
            WeatherFactory.getWeather(city).then(
                function(response) {
                    vm.weather = response.data;
                },
                function(error) {
                    $log.error('failure getting tops pots', error)
                });
            };*/
        vm.update = function(city){
             WeatherFactory.getWeather(city).then(
                function(response) {
                    vm.weather = response.data;
                       vm.items.push({
                            'name': city,
                            'time': new Date()

                            });

                },
                function(error) {
                    $log.error('Sorry there has been an error connecting to the API', error)
                });

        };

    }
})();
