angular.module('App.ListViewCtrl', [])
.controller('ListViewCtrl', function($scope, $state, $rootScope, $firebaseArray){
  var doc_id = $rootScope.id;
  var id = localStorage.getItem("doc_id");
  $scope.today = new Date();
  var today = new Date();
  var refer = firebase.database().ref("shifts").orderByChild("doctor_id").equalTo("");
  $scope.shifts = [];
  var shifter = $firebaseArray(refer);
  shifter.$loaded().then(function(resp){
      angular.forEach(resp, function(key, value){
          var changed = new Date(key.date);
          if(changed >= today)
          {
            console.log("After");
            if(key.status == 1 || key.status == 2 || key.status == '1' || key.status == '2')
            {
              $scope.shifts.push(key);
            }
          }
          else
          {

          }
      })
        $scope.shifter = resp;
      },function(err){
      console.log(err+"Error");
    });

  $scope.shiftStatus = function(shift_id){
    var refe = firebase.database().ref("shifts/"+shift_id+"/doctors");
    var result =  refe.orderByChild('id').equalTo(id);
    $firebaseArray(result).$loaded().then(function(resp){
      var found = isEmpty(resp[0]);
      if(found)
      {
        $state.go('app.shiftdetail', {id: shift_id});
      }
      else
      {
        $state.go('app.approved', {id: shift_id});
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
