angular.module('App.ExperienceCtrl', [])
.controller('ExperienceCtrl', function($scope, $rootScope, $state, $firebaseArray, $cordovaToast){
      var doc_id = $rootScope.id;
      var id = localStorage.getItem('doc_id');
      var refe = $firebaseArray(firebase.database().ref().child("profiles/"+id+"/experiences"));
      console.log("Ex");
      $scope.exp = {};
      $scope.edu = {};
      $scope.addExperience = function(exp)
      {
        if(exp.company == null || exp.grade == null || exp.startD == null || exp.endD == null || exp.description == null )
        {
          $cordovaToast.show("Please provide all fields", 'long', 'center');
        }
        else {
          $scope.save({
            exp_title: exp.grade,
            exp_company: exp.company,
            exp_startD: exp.startD,
            exp_endD: exp.endD,
            exp_description: exp.description,
          });
          $cordovaToast.show("Experience Added", 'long', 'center');
          $state.go('app.profile');
        }
      }
      $scope.addEducation = function()
      {

      }
      $scope.removeExp = function()
      {

      }
      $scope.save = function(exp)
      {
        refe.$add(exp).then(function(ref) {
        var id = ref.key;
        console.log("Added");
        refe.$indexFor(id);
        }, function(err){
        console.log(err);
        });
      }

});
