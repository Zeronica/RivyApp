var app = angular.module('app', ['onsen']);

app.controller('AppController', [
    '$scope',
    'rivys',
    'rivy'
    function($scope, rivys, rivy) {

        ons.ready(function(){
            rivys.getAll();
        });

        $scope.rivys = rivys.rivys;

        $scope.doSomething = function() {
            setTimeout(function() {
              alert('tapped');
            }, 100);
        };

        $scope.addRivy = function() {
            console.log($scope.title);
            console.log($scope.body);

            if(!$scope.title || $scope.title === '') { return alert("write the title u fuk"); }
            if(!$scope.body || $scope.body === '') { return alert("write the body u fuk"); }

            console.log("adfa");
            rivys.create({
                title: $scope.title,
                body: $scope.body
            }, function(err, data){
                console.log("sdafdasfdsaf");
                if (err){
                    return alert(err);
                }
                $scope.title = '';
                $scope.body = '';
                return alert("success!");
            });
        };

        $scope.routeToRivy = function(rivy) {
            console.log(rivy._id);
            myNavigator.pushPage('templates/rivy.html', { animation : 'slide', param1: rivy._id});
            console.log(myNavigator.getCurrentPage());
        };

        $scope.getCurrentRivy = function() {
            var page = $scope.myNavigator.getCurrentPage();
            console.log(page.options.param1);
            id = page.options.param1
            return 
        }
    }
]);

app.factory('rivys', ['$http', function($http){
    var o = {
        rivys: [],
        rivy: {}
    };

    // o.getAll = function(){
    //     //console.log("dfasfa");
    //     return $http.get('/rivys')
    //     .success(function(data){
    //         angular.copy(data, o.rivys);
    //     })
    // };

    o.getAll = function() {
        return $http.get('/rivys').success(function(data){
            angular.copy(data, o.rivys);
        });
    };

    o.create = function(rivy, cb){
        $http.post('/rivys', rivy)
            .success(function(data){
                o.rivys.push(data);
                cb(false, data);
            })
            .error(function(data){
                cb(data, null);
            });
    };

    o.get = function(id) {
      return $http.get('/rivys/' + id).success(function(data){
        angular.copy(data, o.rivy);
      });
    };

    return o;
}])


// app.config([
// '$stateProvider',
// '$urlRouterProvider',
// function($stateProvider, $urlRouterProvider) {

//   $stateProvider
//     .state('home', {
//       url: '/home',
//       templateUrl: 'templates/home.html',
//       controller: 'AppController',
//       resolve: {
//         postPromise: ['rivys', function(rivys){
//         return rivys.getAll();
//         }]
//     }
//     })
//     .state('settings', {
//       url: '/settings',
//       templateUrl: 'templates/settings.html',
//       controller: 'AppController'
//     })
//     .state('rivyForm', {
//       url: '/rivyForm',
//       templateUrl: 'templates/rivyForm.html',
//       controller: 'AppController'
//     })

//     $urlRouterProvider.otherwise('home');
// }]);