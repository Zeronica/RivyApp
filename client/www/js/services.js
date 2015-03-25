angular.module('starter.services', [])

.factory('rivys', 
  ['$http',function($http){
    var o = {
        rivys: []
    };

    o.getAll = function() {
        $http.get("https://rivy.herokuapp.com/rivys")
          .success(function(data) {
            angular.copy(data, o.rivys);
          }).error(function (data) {
            alert("error with loading rivys");
          })
        return;
    },

    o.create = function(rivy) {
      return $http.post('https://rivy.herokuapp.com/rivys', rivy).success(function(data){
      o.rivys.push(data);
    });
  };

    o.get = function(id) {
    return $http.get('https://rivy.herokuapp.com/rivys/' + id).then(function(res){
    return res.data;
    });
  };

    o.addComment = function(id, comment) {
      return $http.post('https://rivy.herokuapp.com/rivys/' + id + '/comments', comment);
    };

    o.upvote = function(rivy) {
    return $http.post('https://rivy.herokuapp.com/rivys/' + rivy._id + '/upvote')
      .success(function(data){
        rivy.upvotes += 1;
      });
  };

    o.upvoteComment = function(rivy, comment) {
    return $http.post('https://rivy.herokuapp.com/rivys/' + rivy._id + '/comments/'+ comment._id + '/upvote')
    .success(function(data){
      comment.upvotes += 1;
    });
  };

    return o;
  }
])