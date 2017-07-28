angular.module('App.MyJobDetailsCtrl', [])
.controller('MyJobDetailsCtrl', function($scope, $state, $stateParams, $firebaseArray, $cordovaToast){
      var shift_id = $stateParams.shift_id;
      var doc_id = localStorage.getItem('doc_id');
//      var refe = firebase.database().ref().child("shifts/"+shift_id).orderByChild('doctor_id').equalTo(doc_id);
//      console.log($firebaseArray(refe).$id);
      var ref = firebase.database().ref("shifts/"+shift_id);
      ref.on('value', function(snapshot){
          $scope.date = snapshot.val().date;
          $scope.startTime = snapshot.val().startTime;
          $scope.endTime = snapshot.val().endTime;
          $scope.ratePH = snapshot.val().ratePH;
          $scope.grade = snapshot.val().grade;
          $scope.speciality = snapshot.val().speciality;
      });

      $scope.cancelShift = function()
      {
        var refe = firebase.database().ref("shifts/"+shift_id);//.orderByChild("doctor_id").equalTo(doc_id);
        $firebaseArray(refe).$loaded().then(function(resp){
          var empty = isEmpty(resp[0]);
          if(empty)
          {

          }
          else
          {
            refe.update({doctor_id: ""}).then(function(resp){
              $cordovaToast.show("Shift Cancelled.", 'long', 'center');
              $state.go('app.myjobs');
            },
            function(err){
              $cordovaToast.show("Can't Cancel Your Shift", 'long', 'center');
            });
          }
        },
        function(err){
          console.log(err);
        });
      }

      function isEmpty(obj) {
          for(var key in obj) {
              if(obj.hasOwnProperty(key))
                  return false;
          }
          return true;
      }


});
