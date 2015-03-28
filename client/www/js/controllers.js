angular.module('starter.controllers', [])

// initializes the map interface
.controller('HomeCtrl', ['$scope','rivys','$http', function($scope,rivys,$http,$ionicLoading) {
      $scope.rivys = rivys.rivys;
      var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(37.3000, -120.4833),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 

   // $scope.initialise = function() {
   //    console.log("In Google.maps.event.addDomListener");
   //    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
   //    var mapOptions = {
   //        center: myLatlng,
   //        zoom: 16,
   //        mapTypeId: google.maps.MapTypeId.ROADMAP
   //    };
   //    console.log(mapOptions);
      
      // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      $scope.markers = [];
      var infoWindow = new google.maps.InfoWindow();

    $scope.getLocation = function() {
    $http.get("http://localhost:3000/rivys")
     .success(function(newItems) {
       $scope.rivys = newItems;
     })}

    // var createMarker = function (info){
        
    //     var marker = new google.maps.Marker({
    //         map: $scope.map,
    //         position: new google.maps.LatLng(info.lat, info.lng),
    //         // title: info.city
    //     });
        // marker.content = '<div class="infoWindowContent">' '</div>';
        
        // google.maps.event.addListener(marker, 'click', function(){
        //     infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        //     infoWindow.open($scope.map, marker);
        // });
        
        // $scope.markers.push(marker);
        
  //  }  

    for (i = 0; i < $scope.rivys.length; i++){
        // createMarker($scope.rivys[i]);
        var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(rivys.lat,rivys.lng)
        
        });

        $scope.markers.push(marker);
    }


    // $scope.openInfoWindow = function(e, selectedMarker){
    //     e.preventDefault();
    //     google.maps.event.trigger(selectedMarker, 'click');
    // }



      // navigator.geolocation.getCurrentPosition(function(pos) {
      //     console.log(pos);
      //     map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      //     var myLocation = new google.maps.Marker({
      //         position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
      //         map: map,
      //         title: "My Location"
      //     });
      // });
//google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());

}])

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

    $scope.lng = "";

    $scope.lat = "";

    $scope.address = "";

    $scope.inputObject = {
      title: "",
      body: ""
    };
    // $scope.addLocation = function(){ // searches if a location exits or not 
    //     if($scope.location === ''){
    //       alert('no locations updates');
    //       } else {
    //         alert('Location found: ' + $scope.location);
    //             }
    //           };
    $scope.addRivy = function(){
        // if($scope.location === "") { 
        //   alert("write the address u fuk");
        //   return; 
        // }
        // $scope.addLocation();
        console.log($scope.address)
        rivys.create({
          title: $scope.inputObject.title,
          body: $scope.inputObject.body,
          lng: $scope.lng,
          lat: $scope.lat,
          address: $scope.address,
       })  
      $scope.inputObject.title = "";
      $scope.inputObject.body = "";
      $scope.lng = "";
      $scope.lat = "";
      $scope.address = "";
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
})


// .controller('TestMapCtrl',function($scope){
//     $scope.location = ''; //stores location
//     $scope.addLocation = function(){ // searches if a location exits or not 
//       if($scope.location === ''){
//           alert('no locations updates');
//           } else {
//             alert('Location found: ' + $scope.location);
//                 }
//             };
//         })

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
module.directive('googlePlaces', function(){
    return {
            restrict:'E',
            replace:true,
            // transclude:true,
            scope: {lat:'=', lng:'=', address:'='},
            template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
            link: function($scope, elm, attrs){
              var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {}); //autocomplete places functionality
              google.maps.event.addListener(autocomplete, 'place_changed', function() {
              var place = autocomplete.getPlace(); //get place from suggestions
              var lat = place.geometry.location.lat(); //find latitutde
              var lng = place.geometry.location.lng(); // find longitude 
              $scope.lng = lng; //update location
              $scope.lat = lat; //update location
              $scope.address = place.formatted_address;
              // var address = $scope.address;
              // console.log($scope.address);
              $scope.$apply(); //apply the scope
                        });
                    }
                }
            });
 //lat lng for map starts here
