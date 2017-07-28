angular.module('App.ChatCtrl', [])
.controller('ChatCtrl', function($scope, $rootScope, $firebaseArray, loader){
  var id = localStorage.getItem('doc_id');
  var name = $rootScope.name;
  $scope.chat = {};
  loader.show();
  var ref = firebase.database().ref().child("profiles/"+id+"/messages");
  var r = $firebaseArray(ref);
  r.$loaded().then(function (result){
    loader.hide();
    $scope.messages = result;
  });
  //$scope.msg = $firebaseArray(ref);
  $scope.sendChat = function (chat)
  {
    if(chat.message != "")
    {
      r.$add({
            user: 1,
            message: chat.message,
            datetime: firebase.database.ServerValue.TIMESTAMP
      }).then(function(r){

      });
    }
      chat.message = "";
  }
})
.filter("firebaseTimer", function(){
 return function(input){
    // Your logic
    console.log(input);
    var v = new Date(input * 1000);
    console.log(v.getTime());
    return v;
 }
});
