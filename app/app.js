var myNinjaApp = angular.module('myNinjaApp', ['ngRoute']);

myNinjaApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
     .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'NinjaController'
     })
     .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'NinjaController'
     })
     .otherwise({
        redirectTo: '/home'
     });

     //$routeProvider.errorOnUnhandledRejections(false);
}]);

myNinjaApp.directive('randomNinja', [function() {

    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        controller: function($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };

}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {

    $scope.removeNinja = function(ninja) {
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = function() {
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            avaliable: true
        });

        $scope.newninja.name = "";
        $scope.newninja.belt = "";
        $scope.newninja.rate = "";

    };

   
    $http.get('app/data/ninjas.json').then(function(response){
       
        $scope.ninjas = response.data;
        console.log('ninjas',$scope.ninjas)
    },
    (reason) => {
      console.error(reason); // Error!
    });

    
}]);


// https://www.youtube.com/watch?v=5SXog1helAY&list=PL4cUxeGkcC9gsJS5QgFT2IvWIX78dV3_v&index=17&ab_channel=TheNetNinja Pocetak