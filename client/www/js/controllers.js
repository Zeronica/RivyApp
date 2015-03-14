angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicLoading) {
 
   $scope.initialise = function() {
      console.log("In Google.maps.event.addDomListener");
      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log(mapOptions);
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      navigator.geolocation.getCurrentPosition(function(pos) {
          console.log(pos);
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
              map: map,
              title: "My Location"
          });
      });

      $scope.map = map;
  };

google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
 
})

.controller('FeedCtrl', [
  '$scope',
  'rivys', 
  '$http',
  function($scope, rivys, $http) {
    $scope.rivys = rivys.rivys;
    $scope.incrementUpvotes = function(rivy) {
    rivys.upvote(rivy);
    };
    $scope.doRefresh = function() {
    $http.get("http://localhost:3000/rivys")
     .success(function(newItems) {
       $scope.rivys = newItems;
     }).finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    }

}])

.controller('RivyFormCtrl', [
  '$scope',
  'rivys', 
  function($scope, rivys) {
    $scope.rivys = rivys.rivys;

    $scope.inputObject = {
      title: "",
      body: "" 
    };
    
    $scope.addRivy = function(){
        if($scope.inputObject.title === "") { 
          alert("write the title u fuk");
          return; 
        } 
        // console.log($scope.inputObject.title)
        rivys.create({
          title: $scope.inputObject.title,
          body: $scope.inputObject.body,
        })
      $scope.inputObject.title = "";
      $scope.inputObject.body = "";
    };
}])

.controller('FeedDetailCtrl', [
'$scope',
'rivys',
'rivy',
function($scope, rivys, rivy){
  $scope.rivy = rivy;

  $scope.inputObject = {
      body: "" 
    };

  $scope.incrementUpvotes = function(comment){
  rivys.upvoteComment(rivy, comment);
  };
  
  $scope.addComment = function(){
  if($scope.inputObject.body === '') { return; }
  rivys.addComment(rivy._id, {
    body: $scope.inputObject.body,
    author: 'user',
  }).success(function(comment) {
    $scope.rivy.comments.push(comment);
  });
  $scope.inputObject.body = '';
};

}])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


var module = angular.module('starter.directives', []);
module.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$watch(attributes.hideTabs, function(value){
                $rootScope.hideTabs = value;
            });

            scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});
