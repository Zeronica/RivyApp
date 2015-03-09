angular.module('starter.controllers', [])

.controller('FeedCtrl', [
  '$scope',
  'rivys', 
  function($scope, rivys) {
    $scope.rivys = rivys.rivys;
}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
