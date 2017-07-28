angular.module('App.ResetPasswordCtrl', [])
.controller('ResetPasswordCtrl', function($scope, $state, $cordovaToast){
    $scope.users = {};
    $scope.reset = function(user)
    {
      if(user == null)
      {
        $cordovaToast.show("Please provide your email before proceeding.", 'long', 'center');
      }
      else {
        firebase.auth().sendPasswordResetEmail(user.email).then(function(resp){
            $cordovaToast.show("An email has been sent to your email. Check your email, reset your password and login with your new password!", 'long', 'center');
            //alert("An email has been sent to your email. Check your email, reset your password and login with your new password!");
            $state.go('login');
        },
        function(err){
          $cordovaToast.show("There's problem with your email, please enter a valid email address.", 'long', 'center');
          console.log(err);
        });
      }
    }

})
