angular.module('App.MyJobsCtrl', [])
.controller('MyJobsCtrl', function($scope, $state, $firebaseArray, $ionicModal){
    var doc_id = localStorage.getItem('doc_id');
    var ref = firebase.database().ref("shifts").orderByChild("doctor_id").equalTo(doc_id);
    var docs = $firebaseArray(ref);
    $scope.shifts_completed = [];
    $scope.shifts_approved = [];
    $scope.shifts_pending = [];
    var shifter = $firebaseArray(ref);
    shifter.$loaded().then(function(resp){
        angular.forEach(resp, function(key, value)
        {
              if(key.status == '2' || key.status == 2)
              {
                $scope.shifts_pending.push(key);
              }
              if(key.status == '3' || key.status == 3)
              {
                $scope.shifts_approved.push(key);
              }
              if(key.status == '4' || key.status == 4)
              {
                $scope.shifts_completed.push(key);
              }
        })

        },function(err){
        //console.log(err+"Error");
      });


    $scope.assigned = function(id){
        if(id)
        {
          $state.go('app.job-detail',{shift_id:id})
        }
    }

})
