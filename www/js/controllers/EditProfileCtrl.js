angular.module('App.EditProfileCtrl', [])
.controller('EditProfileCtrl', function($scope, $firebaseArray, $rootScope, $state, $cordovaToast){
  var doc_id = $rootScope.id;
  $scope.user = {};
  var refe = firebase.database().ref().child("profiles/"+doc_id);
  refe.on('value', function(snapshot){
      $scope.user.first_name = snapshot.val().first_name;
      $scope.user.last_name = snapshot.val().last_name;
      $scope.user.dob = new Date(snapshot.val().d_o_b);
      $scope.user.reg_no = snapshot.val().reg_no;
      $scope.user.contact = snapshot.val().contact;
      $scope.user.sec_email = snapshot.val().secondary_email;
      $scope.user.grade = snapshot.val().grade;
      $scope.user.degree_title = snapshot.val().degree_title;
      $scope.user.degree_institute = snapshot.val().degree_institute;
      $scope.user.degree_start = new Date(snapshot.val().degree_start);
      $scope.user.degree_end = new Date(snapshot.val().degree_end);
      $scope.user.current_emp = snapshot.val().current_emp;
      $scope.user.emp_grade = snapshot.val().emp_grade;
      $scope.user.emp_speciality = snapshot.val().emp_speciality;
      $scope.user.emp_startD = new Date(snapshot.val().emp_startD);
      $scope.user.emp_endD = new Date(snapshot.val().emp_endD);
  });
  $scope.profileUp = function(info)
  {
      refe.update({
        first_name: info.first_name,
        last_name: info.last_name,
        d_o_b: info.dob,
        secondary_email: info.sec_email,
        reg_no: info.reg_no,
        contact: info.contact,
        current_emp: info.current_emp,
        emp_grade: info.emp_grade,
        emp_speciality: info.emp_speciality,
        emp_startD: info.emp_startD,
        emp_endD: info.emp_endD,
        profile_added: 1,
        degree_title: info.degree_title,
        degree_start: info.degree_start,
        degree_end: info.degree_end
      }).then(function(ers){
          $cordovaToast.show("Profile Updated", 'long', 'center');
          $state.go('app.profile');
      }, function(er){
          $cordovaToast.show("Updation Failed", 'long', 'center');
          console.log(er);
      });

  }
})
