var myTicketApp = angular.module('myTicketApp', ['ngRoute']);

myTicketApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
     .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'TicketController'
     })
     .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'TicketController'
     })
     .otherwise({
        redirectTo: '/home'
     });

     //$routeProvider.errorOnUnhandledRejections(false);
}]);

myTicketApp.directive('randomTicket', [function() {

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

myTicketApp.controller('TicketController', ['$scope', '$http', function($scope, $http) {

    $scope.removeTicket = function(ticket) {
        var removedTicket = $scope.tickets.indexOf(ticket);
        $scope.tickets.splice(removedTicket, 1);
    };

    $scope.addTicket = function() {
        $scope.tickets.push({
            name: $scope.newticket.name,
            belt: $scope.newticket.belt,
            rate: parseInt($scope.newticket.rate),
            avaliable: true
        });

        $scope.newticket.name = "";
        $scope.newticket.belt = "";
        $scope.newticket.rate = "";

    };

   
    $http.get('app/data/tickets.json').then(function(response){
       
        $scope.tickets = response.data;
        console.log('ninjas',$scope.tickets)
    },
    (reason) => {
      console.error(reason); // Error!
    });

    
}]);


// https://www.youtube.com/watch?v=5SXog1helAY&list=PL4cUxeGkcC9gsJS5QgFT2IvWIX78dV3_v&index=17&ab_channel=TheNetNinja Pocetak