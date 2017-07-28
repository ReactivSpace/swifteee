angular.module('App.CVCtrl', [])
.controller('CVCtrl', function($scope, $cordovaCamera, $cordovaFile, $firebaseArray, $ionicPlatform, upladingLoader, $cordovaToast){
    var id = localStorage.getItem("doc_id");
    $scope.images = [];
    var ref = firebase.database().ref().child("profiles/"+id+"/documents");
    var find = ref.orderByChild('name').equalTo('CV');
    var uploaded;
    $firebaseArray(find).$loaded().then(function(resp){
      var found = isEmpty(resp[0]);
      if(found)
      {
        uploaded = 0;
      }
      else
      {
        uploaded = 1;
      }
    },
    function(err){
    });
    var sync = $firebaseArray(ref);
    $scope.images = sync;
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
      if(uploaded)
      {
        $scope.update()
      }
      else {
        $scope.newUpload();
      }
    }

    $scope.newUpload = function(){
      $cordovaCamera.getPicture(options).then(function(imageData) {
          upladingLoader.show();
          sync.$add({image: imageData, name: 'CV', status: 1}).then(function(success){
              console.log(success.key);
              upladingLoader.hide();
              $cordovaToast.show("Document Uploaded", 'long', 'center');
              //alert("Document has been Uploaded");
          });
      }, function(error) {
            $cordovaToast.show("Uploading Failed", 'long', 'center');
      });
    }

    $scope.upload = function(){
          $cordovaCamera.getPicture(options).then(function(imageData) {
              upladingLoader.show();
              sync.$add({image: imageData, name: 'CV', status: 1}).then(function(success){
                  console.log(success.key);
                  upladingLoader.hide();
                  $cordovaToast.show("Document Uploaded", 'long', 'center');
                  //alert("Document has been Updated");
              });
          }, function(error) {
            $cordovaToast.show("Uploading Failed", 'long', 'center');
          });
        }
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
})
