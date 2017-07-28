angular.module('App.ApprovedShiftCtrl',[])
.controller('ApprovedShiftCtrl', function($scope, $rootScope, $window, $firebaseArray, $stateParams, $state, $firebaseObject, $cordovaToast){
  var shift_id = $stateParams.id;
  var doc_id = $rootScope.id;
  var refe = firebase.database().ref().child("shifts/"+shift_id);
  refe.on('value', function(snapshot){
      $scope.date = snapshot.val().date;
      $scope.startTime = snapshot.val().startTime;
      $scope.endTime = snapshot.val().endTime;
      $scope.ratePH = snapshot.val().ratePH;
      $scope.grade = snapshot.val().grade;
      $scope.speciality = snapshot.val().speciality;
  });
  $scope.go_back = function () {
      $window.history.back();
  };
  $scope.cancelShift = function()
  {
    var refe = firebase.database().ref("shifts/"+shift_id).child("doctors");
    var result =  refe.orderByChild('id').equalTo(doc_id);
    $firebaseArray(result).$loaded().then(function(resp){
      var empty = isEmpty(resp[0]);
      if(empty)
      {

      }
      else
      {
        var ref = firebase.database().ref("shifts/"+shift_id);
        $firebaseObject(ref.child('doctors')).$remove(resp[0].$id).then(function(res){
          $cordovaToast.show("Shift Cancelled", 'long', 'center');
          $state.go("app.shifts");
        },function(err){
          console.log(err);
          $cordovaToast.show("Can't cancel your shift", 'long', 'center');
          console.log("removal failed");
        })
      }
    },
    function(err){
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
