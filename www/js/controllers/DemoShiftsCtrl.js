angular.module('App.DemoShiftsCtrl', [])
.controller('DemoShiftsCtrl', function($scope, $rootScope, $firebaseArray, $state, loader){
    $scope.change = function()
    {
      $state.go("login");
    }
    $scope.today = new Date();
    var doc_id = $rootScope.id;
    var id = localStorage.getItem("doc_id");
    var calendar = firebase.database().ref("shifts");
    $scope.events = [];
    loader.show();
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
              if(key.status == 1 || key.status == 2 || key.status == '1' || key.status == '2')
              {
                $scope.shifts.push(key);
                $scope.events.push({eventClass:'expired', date: key.date});
              }
            }
            else
            {

            }
        })
          console.log($scope.shifts);
          loader.hide();
        },function(err){
        console.log(err+"Error");
      });

    $scope.getShiftofDate = function(date)
    {
      var refer = firebase.database().ref("shifts").orderByChild("doctor_id").equalTo("");
      $scope.shifts = [];
      var shifter = $firebaseArray(refer);
      shifter.$loaded().then(function(resp){
          angular.forEach(resp, function(key, value){
              var changed = new Date(key.date);
              if(+changed == +date)
              {
                if(key.status == 1 || key.status == 2 || key.status == '1' || key.status == '2')
                {
                  $scope.shifts.push(key);
                }
              }
              else
              {

              }
          })
            console.log($scope.shifts);
          },function(err){
          console.log(err+"Error");
        });
    }
    $scope.options = {
    defaultDate: today,
    minDate: "2000-01-01",
    maxDate: "2099-12-31",
    dayNamesLength: 3, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
    mondayIsFirstDay: true,//set monday as first day of week. Default is false
    eventClick: function(date) { // called before dateClick and only if clicked day has events
      console.log(date);
    },
    dateClick: function(date) { // called every time a day is clicked
      //console.log(date.date);
      $scope.getShiftofDate(date.date);
    },
    changeMonth: function(month, year) {
      //console.log(month, year);
    },
    filteredEventsChange: function(filteredEvents) {
      console.log(filteredEvents);
    },
  };
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    $rootScope.filter = {'FYI': false, 'SHO': false, 'Consultant': false, 'Registrar': false};
    $scope.filter2 = {'FYI': false, 'SHO': false, 'Consultant': false, 'Registrar': false};
    $rootScope.filters = {'A&E': false, 'AUU': false, 'General Medicine': false, 'General Surgery': false, 'Therapist': false};
    $scope.filters2 = {'A&E': false, 'AUU': false, 'General Medicine': false, 'General Surgery': false, 'Therapist': false};

    $scope.FYIFChange = function(){
      if(!$rootScope.filter['FYI']) $rootScope.filter['FYI'] = true;
      else $rootScope.filter['FYI'] = false;
    }
    $scope.SHOFChange = function(){
      if(!$rootScope.filter['SHO']) $rootScope.filter['SHO'] = true;
      else $rootScope.filter['SHO'] = false;
    }
    $scope.ConsultantFChange = function(){
      if(!$rootScope.filter['Consultant']) $rootScope.filter['Consultant'] = true;
      else $rootScope.filter['Consultant'] = false;
    }
    $scope.RegistrarFChange = function(){
      if(!$rootScope.filter['Registrar']) $rootScope.filter['Registrar'] = true;
      else $rootScope.filter['Registrar'] = false;
    }
    $scope.AEChange = function(){
      if(!$rootScope.filters['A&E']) $rootScope.filters['A&E'] = true;
      else $rootScope.filters['A&E'] = false;
    }
    $scope.AUUChange = function(){
      if(!$rootScope.filters['AUU']) $rootScope.filters['AUU'] = true;
      else $rootScope.filters['AUU'] = false;
    }
    $scope.GMChange = function(){
      if(!$rootScope.filters['General Medicine']) $rootScope.filters['General Medicine'] = true;
      else $rootScope.filters['General Medicine'] = false;
    }
    $scope.GSChange = function(){
      if(!$rootScope.filters['General Surgery']) $rootScope.filters['General Surgery'] = true;
      else $rootScope.filters['General Surgery'] = false;
    }
    $scope.TherapistChange = function(){
      if(!$rootScope.filters['Therapist']) $rootScope.filters['Therapist'] = true;
      else $rootScope.filters['Therapist'] = false;
    }
    $scope.filterByGrade = function(shift)
    {
      return $rootScope.filter[shift.grade] || $scope.noFilter($rootScope.filter);
    }
    $scope.filterBySpeciality = function(shift)
    {
      return $rootScope.filters[shift.speciality] || $scope.noFilter($rootScope.filters);
    }
    $scope.noFilter = function(filterObj)
    {
      return Object.keys(filterObj).every(function(key){
        return !filterObj[key];
      });
    }

    $scope.$on('$ionicView.beforeLeave', function(){
        $scope.filter2 = {'FYI': false, 'SHO': false, 'Consultant': false, 'Registrar': false};
        $scope.filters2 = {'A&E': false, 'AUU': false, 'General Medicine': false, 'General Surgery': false, 'Therapist': false};
        $rootScope.filter['FYI'] = false;
        $rootScope.filter['SHO'] = false;
        $rootScope.filter['Consultant'] = false;
        $rootScope.filter['Registrar'] = false;
        $rootScope.filters['A&E'] = false;
        $rootScope.filters['AUU'] = false;
        $rootScope.filters['General Medicine'] = false;
        $rootScope.filters['General Surgery'] = false;
        $rootScope.filters['Therapist'] = false;
    });

});
