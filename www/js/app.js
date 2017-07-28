
angular.module('App', [
            'ionic',
            'ngCordova',
            'firebase',
            'flexcalendar',
            'checklist-model',
            'pascalprecht.translate',
            'ngAnimate',
            'App.LoginCtrl',
            'App.SignupCtrl',
            'App.ProfileCtrl',
            'App.EditProfileCtrl',
            'App.ShiftsCtrl',
            'App.SettingsCtrl',
            'App.ExperienceCtrl',
            'App.ImagesCtrl',
            'App.ChatCtrl',
            'App.ShiftDetailsCtrl',
            'App.ApprovedShiftCtrl',
            'App.ListViewCtrl',
            'App.MyJobsCtrl',
            'App.MyJobDetailsCtrl',
            'App.ResetPasswordCtrl',
            'App.FilterCtrl',
            'App.DocsCtrl',
            'App.CTCCtrl',
            'App.CRB-DBSCtrl',
            'App.CRBCCtrl',
            'App.PassportCtrl',
            'App.MedicalCtrl',
            'App.CVCtrl',
            'App.DemoShiftsCtrl',
            'App.RegisterCtrl'
          ])

.run(['$ionicPlatform', function($ionicPlatform, $state) {
    $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //Load the Pre-populated database, debug = true
    //$sqliteService.preloadDataBase(true);
  });
}])
.config(['$stateProvider',
         '$urlRouterProvider',
         '$ionicConfigProvider',
         '$compileProvider',
         function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider,$state) {

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

    // $urlRouterProvider.otherwise(function ($injector, $location) {
    //     var $state = $injector.get("$state");
    //     $state.go("login");
    // });
}]);

/* global ionic */
(function (angular, ionic) {
	"use strict";

	ionic.Platform.isIE = function () {
		return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
	}

	if (ionic.Platform.isIE()) {
		angular.module('ionic')
			.factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
				return function (scope, element, clickExpr) {
					var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

					element.on('click', function (event) {
						scope.$apply(function () {
							if (scope.clicktimer) return; // Second call
							clickHandler(scope, { $event: (event) });
							scope.clicktimer = $timeout(function () { delete scope.clicktimer; }, 1, false);
						});
					});

					// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
					// something else nearby.
					element.onclick = function (event) { };
				};
			}]);
	}

	function SelectDirective() {
		'use strict';

		return {
			restrict: 'E',
			replace: false,
			link: function (scope, element) {
				if (ionic.Platform && (ionic.Platform.isWindowsPhone() || ionic.Platform.isIE() || ionic.Platform.platform() === "edge")) {
					element.attr('data-tap-disabled', 'true');
				}
			}
		};
	}

	angular.module('ionic')
    .directive('select', SelectDirective);

	/*angular.module('ionic-datepicker')
	.directive('select', SelectDirective);*/

})(angular, ionic);
(function () {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$ionicPopover', '$state', '$ionicModal'];
    function AppController($scope, $rootScope, $ionicPopover, $state, $ionicModal) {

        $scope.items = [
            {
                color: "#E47500",
                icon: "ion-ionic",
                title: "Hello Ionic"
            },
            {
                color: "#5AD863",
                icon: "ion-social-html5",
                title: "HTML5"
            },
            {
                color: "#F8E548",
                icon: "ion-social-javascript",
                title: "JS"
            },
            {
                color: "#AD5CE9",
                icon: "ion-social-sass",
                title: "Sass"
            },
            {
                color: "#3DBEC9",
                icon: "ion-social-css3",
                title: "CSS3"
            },
            {
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Angular"
            }
        ];

        $scope.exitApp = function () {
            ionic.Platform.exitApp();
        };

        $ionicModal.fromTemplateUrl('templates/modals/filter-model.html', {
        scope: $rootScope,
        animation: 'slide-in-down'
        }).then(function(modal) {
        $rootScope.modal = modal;
        });
        $rootScope.openfilterModal = function() {
        $rootScope.modal.show();
        };
        $rootScope.closefilterModal = function() {
        $rootScope.modal.hide();
        };

        $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });
        var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
          // handle it
        });

        $scope.logout = function()
        {
          localStorage.setItem("is_login", null);
          firebase.auth().signOut().then(function()
          {
            unsubscribe();
          // Sign-out successful.
          console.log("Signout Successfull");

          $state.go('login');
          },
          function(error)
          {
            console.log("Signout Failed");
            console.log(error);
          });
        }
    }

})();
(function () {
	'use strict';

	angular
		.module('App')
		.service('$sqliteService', $sqliteService);

	$sqliteService.$inject = ['$q', '$cordovaSQLite'];
	function $sqliteService($q, $cordovaSQLite) {

		var self = this;
		var _db;
	}
})();
