angular.module('App.ImagesCtrl', [])
.controller('ImagesCtrl', function($scope, $firebaseArray, $cordovaCamera, $rootScope){
  var id = $rootScope.id;
  $scope.images = [];
  var ref = firebase.database().ref().child("profiles/"+id+"/images");
  //var store = firebase.storage().ref().child("images/"+id);
  var sync = $firebaseArray(ref);
  $scope.images = sync;
  $scope.upload = function() {
    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
        sync.$add({image: imageData}).then(function() {
            alert("Image has been uploaded");
        });
    }, function(error) {
        console.error(error);
    });
}

})
