angular.module('App.SettingsCtrl',[])
.controller('SettingsCtrl', function($scope, $state, $rootScope, $cordovaToast){
  var doc_id = $rootScope.id;
  $scope.user = {};
  var refe = firebase.database().ref().child("profiles/"+doc_id);
  $scope.changeEmail = function(email){
    refe.update({
      secondary_email: email.sec_email,
    }).then(function(ers){
      $cordovaToast.show("Email Updated", 'long', 'center');
    }, function(er){
      $cordovaToast.show("Email Updation Failed", 'long', 'center');
    });
  }
  $scope.changeContact = function(cont){
    refe.update({
      contact: cont.contact
    }).then(function(ers){
      $cordovaToast.show("Contact Updated", 'long', 'center');
    }, function(er){
      $cordovaToast.show("Contact Updation Failed", 'long', 'center');
    });
  }

    $scope.groups = [];
    for (var i=0; i<10; i++) {
        $scope.groups[i] = {
            name: i,
            items: []
        };
        for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
        }
    }

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

    $scope.notificationshow = function() {
    	$scope.notification = !$scope.notification;
    }

    $scope.aboutshow = function() {
    	$scope.about = !$scope.about;
    }

    $scope.logout = function()
    {
      localStorage.setItem("is_login", null);
      firebase.auth().signOut().then(function()
      {
        //unsubscribe();
      // Sign-out successful.
      console.log("Signout Successfull");

      $state.go('login');
      },
      function(error)
      {
        console.log("Signout Failed");
        console.log(error);
      });
    }


})
