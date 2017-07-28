angular.module('App')
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
      .state('login', {
          url: "/login",
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
      })
      .state('main', {
          url: '/main',
          cache: false,
          controller: function ($state) {
              var is_login = localStorage.getItem("is_login");
              if(!is_login || is_login == null) $state.go("login", {reload:true});
              else $state.go('app.listview', {}, {reload: true});
          }
      })
      .state('app', {
          url: '/app',
          abstract: true,
          controller: 'AppController',
          templateUrl: 'templates/menu.html'
      })
      .state('app.listview', {
          url: "/listview",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/list_view.html",
                  controller: 'ShiftsCtrl'
              }
          }
        })
       .state('app.shifts', {
          url: "/shifts",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/shifts.html",
                  controller:  "ShiftsCtrl"
              }
          }
      })
      .state('app.jobs_list', {
         url: "/jobs_list",
         cache: false,
         views: {
             viewContent: {
                 templateUrl: "templates/jobs_list.html",
                 controller:  "MyJobsCtrl"
             }
         }
     })
     .state('demoshifts', {
         url: "/demoshifts",
         templateUrl: "templates/demo-shifts.html",
         controller: 'DemoShiftsCtrl'
     })
      .state('app.forgetpassword', {
          url: "/forgetpassword",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/forgetpassword.html",
                  controller: 'ResetPasswordCtrl'
                }
              }
        })
      .state('app.images', {
         url: "/shifts",
         cache: false,
         views: {
             viewContent: {
                 templateUrl: "templates/images.html",
                 controller:  "ImagesCtrl"
             }
         }
     })
     .state('app.chat', {
        url: "/chat",
        cache: false,
        views: {
            viewContent: {
                templateUrl: "templates/chat.html",
                controller:  "ChatCtrl"
            }
        }
    })

      .state('app.addexperiance', {
          url: "/addexperiance",
          cache: false,
          views: {
            viewContent: {
                templateUrl: "templates/addexperiance.html",
                controller: "ExperienceCtrl"
              }
          }
      })
      .state('app.editexperiance', {
          url: "/editexperiance",
          cache: false,
          views: {
            viewContent: {
                templateUrl: "templates/editexperiance.html",
                controller: "ExperienceCtrl"
              }
          }
        })
       .state('app.shiftdetail', {
          url: "/shiftdetail/:id",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/shiftdetail.html",
                  controller: 'ShiftDetailsCtrl'
              }
          }
      })
       .state('app.shiftconfirm', {
          url: "/shiftconfirm",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/shiftconfirm.html"
              }
          }
      })
       .state('app.approved', {
          url: "/approved/:id",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/approved_job.html",
                  controller: 'ApprovedShiftCtrl'
              }
          }
      })
       .state('app.selectall', {
          url: "/selectall",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/selectAlljob.html"
              }
          }
      })
      //   .state('app.myjobs', {
      //     url: "/myjobs",
      //     cache: false,
      //     views: {
      //         viewContent: {
      //             templateUrl: "templates/myjobs.html",
      //             controller: 'MyJobsCtrl'
      //         }
      //     }
      // })
         .state('app.job-detail', {
          url: "/job-detail/:shift_id",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/job_detail.html",
                  controller: 'MyJobDetailsCtrl'
              }
          }
      })
      .state('app.profile', {
          url: "/profile",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/profile.html",
                  controller: "ProfileCtrl"
              }
          }
      })
      .state('app.mydocs', {
          url: "/mydocs",
          cache: false,
          views: {
              viewContent: {
                templateUrl: "templates/mydocs.html",
                controller: 'DocsCtrl'
              }
            }
      })
        .state('app.ctc', {
          url: "/ctc",
          cache: false,
          views: {
              viewContent: {
                templateUrl: "templates/ctc.html",
                controller: 'CTCCtrl'
              }
            }
      })
      .state('app.cv', {
        url: "/cv",
        cache: false,
        views: {
            viewContent: {
              templateUrl: "templates/cv.html",
              controller: 'CVCtrl'
            }
          }
        })
        .state('app.medical', {
          url: "/medical",
          cache: false,
          views: {
              viewContent: {
                templateUrl: "templates/medical.html",
                controller: 'MedicalCtrl'
              }
            }
          })
       .state('app.CRB', {
         url: "/CRB",
         cache: false,
         views: {
              viewContent: {
                templateUrl: "templates/CRB.html",
                controller: 'CRB-DBSCtrl'
              }
            }
      })
      .state('app.passport', {
        url: "/passport",
        cache: false,
        views: {
              viewContent: {
                templateUrl: "templates/passport.html",
                controller: 'PassportCtrl'
              }
            }
      })
      .state('app.crbc', {
        url: "/crbc",
        cache: false,
        views: {
            viewContent: {
              templateUrl: "templates/crbc.html",
              controller: 'CRBCCtrl'
            }
          }
    })
      .state('app.editprofile', {
          url: "/editprofile",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/editprofile.html",
                  controller:  "EditProfileCtrl"
              }
          }
      })
       .state('app.setting', {
          url: "/setting",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/setting.html",
                  controller: "SettingsCtrl"
              }
          }
      })
      .state('app.signup', {
          url: "/signup",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/signup.html",
                  controller: "SignupCtrl"
              }
          }
      }).state('app.signupconform', {
          url: "/signupconform",
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/emailconf.html",
                  controller: "SignupCtrl"

              }
          }
      });

  $urlRouterProvider.otherwise('main');


});
