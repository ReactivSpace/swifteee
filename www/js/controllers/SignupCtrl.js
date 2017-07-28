angular.module('App.SignupCtrl', [])
.controller('SignupCtrl', function($scope, $state, $ionicHistory, $firebaseArray, $cordovaToast){
    var ref = firebase.database().ref().child('profiles');
    console.log("In Signup");
    var hos_ref = firebase.database().ref().child('hospitals');
    var profiles = $firebaseArray(ref);
    var hospitals = $firebaseArray(hos_ref);
    $scope.hos = [];
    $scope.user = {};
    hospitals.$loaded().then(function(sc){
      $scope.hos = sc;
      console.log($scope.hos);
    })
    $scope.u = function()
    {
      alert();
    }
    $scope.userInfo = {};
    $scope.signup = function(user)
    {
      alert();
      if(user.email == null || user.password == null || user.first_name == null || user.last_name == null || user.reg_no == null)
      {
        // $scope.hide();
        $cordovaToast.show("All fields are required.", 'long', 'center');
      }
      else {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(response)
        {
            $ionicHistory.nextViewOptions({
              historyRoot: false
            });
            response.sendEmailVerification().then(function(s)
            {
              $scope.save({
                uid: response.uid,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                reg_no: user.reg_no,
                hostpital: user.hospital,
                grade: '',
                d_o_b: '',
                secondary_email: '',
                contact: '',
                current_emp: '',
                emp_grade: '',
                emp_speciality: '',
                emp_startD: '',
                emp_endD: '',
                degree_title: '',
                degree_start: '',
                degree_end: '',
                profile_added: 1,
                status: 0
              });
              $state.go('app.signupconform', {}, {location: "replace"});
            }, function(e){
              $cordovaToast.show("Please enter a valid email address", 'long', 'center');

            });

        },
        function(error)
        {
            if(error.code == "auth/invalid-email")
            {
              $cordovaToast.show("Invalid Email Address", 'long', 'center');
            }
            if(error.code == "auth/operation-not-allowed")
            {
              $cordovaToast.show("Account is not activated yet. Try contacting your admin", 'long', 'center');
            }
            if(error.code == "auth/weak-password")
            {
              $cordovaToast.show("Please use a strong password.", 'long', 'center');
            }
            if(error.code = "auth/email-already-in-use")
            {
              $cordovaToast.show("Email already exists. Please try using new email.", 'long', 'center');
            }
        });
      }
    }

    $scope.save = function(user)
    {
      profiles.$add(user).then(function(ref) {
      var id = ref.key;
      //console.log("added user with id " + id);
      profiles.$indexFor(id); // returns location in the array
      }, function(err){
      console.log(err);
    });
    }
    $scope.confirm = function()
    {
      $state.go("login");
    }
});
