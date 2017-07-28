angular.module('App.ProfileCtrl', [])
.controller('ProfileCtrl', function($scope, $state, $firebaseArray, $cordovaCamera, $rootScope, upladingLoader, $cordovaToast){
      var doc_id = $rootScope.id;
      var id = localStorage.getItem("doc_id");
      var refe = firebase.database().ref().child("profiles/"+doc_id);
      $firebaseArray(refe).$loaded().then(function(){
        refe.on('value', function(snapshot){
          $scope.first_name = snapshot.val().first_name;
          $scope.last_name = snapshot.val().last_name;
          $scope.full_name = snapshot.val().full_name;
          $scope.degree_title = snapshot.val().degree_title;
          $scope.degree_year = snapshot.val().degree_year;
          $scope.current_emp = snapshot.val().current_emp;
          $scope.emp_grade = snapshot.val().emp_grade;
          $scope.emp_speciality = snapshot.val().emp_speciality;
          $scope.emp_startD = snapshot.val().emp_startD;
          $scope.emp_endD = snapshot.val().emp_endD;
          $scope.experiences = snapshot.val().experiences;
          $scope.picture = snapshot.val().profile_picture;
        });
      });

      $scope.image = [];
      var ref = firebase.database().ref().child("profiles/"+id);
      var sync = ref;
      $scope.image = sync;
      var options = {
          quality : 75,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 1000,
          targetHeight: 1000,
          saveToPhotoAlbum: false
      };
      $scope.upload = function()
      {
          $scope.update()
      }

      $scope.update = function(){
            $cordovaCamera.getPicture(options).then(function(imageData) {
                upladingLoader.show();
                sync.update({profile_picture: imageData}).then(function(success){
                    //console.log(success.key);
                    upladingLoader.hide();
                    $cordovaToast.show("Profile Picture Updated", 'long', 'center');
                    //alert("Document has been Updated");
                });
            }, function(error) {
              $cordovaToast.show("Updation Failed", 'long', 'center');
            });
      }


      $scope.name = "Dr Simon jones";

$scope.one = true;
$scope.two = false;
$scope.active_one = true;

$scope.showOne = function() {
	$scope.one = true;
	$scope.two = false;
	$(this).addClass('active');
}
$scope.showTwo = function() {
	$scope.two = true;
	$scope.one = false;
}

$scope.detailshow = function() {
	$scope.PersonalDetail = !$scope.PersonalDetail;
}
$scope.experienceshow = function() {
	$scope.experience = !$scope.experience;
}

$scope.documentsshow = function() {
	$scope.documents = !$scope.documents;
}
$scope.docs = function(state)
{
  $state.go(state);
}


})
