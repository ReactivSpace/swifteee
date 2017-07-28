angular.module('App.ShiftDetailsCtrl',[])
.controller('ShiftDetailsCtrl', function($scope, $rootScope,$window, $stateParams, $firebaseArray, $ionicModal, $ionicPopover, $state, $cordovaToast){
    var shift_id = $stateParams.id;
    var id = $rootScope.id;
    var ref = firebase.database().ref("shifts/"+shift_id+"/doctors");
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
    $scope.apply = function(){
      var refe = $firebaseArray(firebase.database().ref("shifts/"+shift_id+"/doctors"));
      refe.$add(id).then(function(resp){
         // $cordovaToast.show("Applied Successfully", 'long', 'center');
          $state.go('app.shifts');
          $scope.openPopover();
      },
      function(err){
        $cordovaToast.show("There's an issue while applying for this shift. Please contact admin for more information", 'long', 'center');
      });
    }
    //Popup after applying for a shift
    $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    }, function(error){
        //console.log(error);
        //alert(error);
    });

    $scope.openPopover = function () {
        //alert();
        $scope.popover.show();
    };

    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });

})
