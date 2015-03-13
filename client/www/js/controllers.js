angular.module('starter.controllers', [])

.controller('FeedCtrl', [
  '$scope',
  'rivys', 
  function($scope, rivys) {
    $scope.rivys = rivys.rivys;
    $scope.incrementUpvotes = function(rivy) {
    rivys.upvote(rivy);
};
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
