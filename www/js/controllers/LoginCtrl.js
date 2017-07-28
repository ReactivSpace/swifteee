angular.module('App.LoginCtrl', [])
.controller('LoginCtrl', function($scope, $state, $ionicHistory, $rootScope, $firebaseArray, $firebaseObject, $ionicLoading, $cordovaToast){
    $scope.users = {};
    $scope.login = function(users)
    {
      $scope.show();
      if(users.email == null || users.password == null)
      {
          $scope.hide();
          $cordovaToast.show("All fields are required", 'long', 'center');
      }
      else {
        firebase.auth().signInWithEmailAndPassword(users.email, users.password)
        .then(function(result)
        {
            $scope.hide();
            localStorage.setItem("is_login", 1);
            var ref = firebase.database().ref("/profiles");
            var examination = $firebaseArray(ref.orderByChild('uid').equalTo(result.uid));
            examination.$loaded().then(function(exam){
                $scope.doc_id = exam[0].$id;
                var refe = firebase.database().ref().child("profiles/"+$scope.doc_id);
                refe.on('value', function(snapshot){
                      $rootScope.id = snapshot.key;
                      localStorage.setItem("doc_id", snapshot.key);
                      var f_name = snapshot.val().first_name;
                      var l_name = snapshot.val().last_name;
                      $rootScope.name = f_name+" "+l_name;
                });
            });
            $state.go('app.listview', {}, {reload: true});
        },
        function(error)
        {
          if(error.code == "auth/user-not-found")
          {
            $scope.hide();
            $cordovaToast.show("User not found.", 'long', 'center');
          }
          if(error.code == "auth/wrong-password")
          {
            $scope.hide();
            $cordovaToast.show("Incorrect email or password. Please type correct email & password.", 'long', 'center');
          }
        });
      }
    }

    $scope.show = function() {
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide = function(){
      $ionicLoading.hide();
    };
})
