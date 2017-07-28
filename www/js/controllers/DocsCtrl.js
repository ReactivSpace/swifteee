angular.module('App.DocsCtrl', [])
.controller('DocsCtrl', function($scope, $cordovaCamera, $cordovaFile, $firebaseArray, $ionicPlatform){
    var id = localStorage.getItem("doc_id");
    $scope.images = [];
    var ref = firebase.database().ref().child("profiles/"+id+"/documents");
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
          targetWidth: 1000,
          targetHeight: 1000,
          saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
          sync.$add({image: imageData, name: 'CV', status: 1}).then(function(success){
              console.log(success.key);
              alert("Document has been Uploaded");
          });
      }, function(error) {
          console.error(error);
      });
    }

    $scope.ctc = function(image, filename)
    {
      aler();
      storageRef.child('documents/'+id+'/'+filename).put(image).then(function(success){
        console.log("Upploaded");
      },
      function(error){
        console.log(error);
      })
    }

    $scope.up = function(){
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          maximumImagesCount:1
        };
      $cordovaCamera.getPicture(options).then(function(imageURI) {
        $scope.imgURI = imageURI;
        alert(imageURI);
        var name = imageURI.replace(/^.*[\\\/]/, '');
        console.log(name);
        var directory = cordova.file.cacheDirectory;
        if($ionicPlatform.is["android"])
        {
          var directory = cordova.file.cacheDirectory;
          console.log(directory);
        }
        else {
          var directory = cordova.file.tempDirectory;
        }


        $cordovaFile.readAsArrayBuffer(directory, name).then(function(success) {
          alert(success);
          var blob = new Blob(["file:///storage/emulated/0/Android/data/com.swiftee.android/cache/"+name], { type:"image/jpeg" });
          $scope.ctc(blob);

        }, function(error) {
          console.log(error);
        });

      }, function(error){
        alert('erreur du getPicture' + error);
      });
    }

})
