(function(){
    'use strict';

    angular.module('App')
        .service('loader', loader)
        .service('upladingLoader', upladingLoader)
        .service('shareService', shareService)
        .service('Authorization', Authorization)
        .service('stateService', stateService);

        loader.$inject = ['$ionicLoading'];
        function loader($ionicLoading)
        {
            this.show = function()
            {
              console.log("Show");
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner icon="android"></ion-spinner>'
              });
            }
            this.hide = function()
            {
              console.log("Hide");
              $ionicLoading.hide();
            }
        }

        upladingLoader.$inject = ['$ionicLoading'];
        function upladingLoader($ionicLoading)
        {
            this.show = function()
            {
              console.log("Show");
              $ionicLoading.show({
                template: '<p>Uploading...</p><ion-spinner icon="android"></ion-spinner>'
              });
            }
            this.hide = function()
            {
              console.log("Hide");
              $ionicLoading.hide();
            }
        }

    stateService.$inject = ['$rootScope', '$state'];
    function stateService($rootScope, $state)
    {
        this.changeState = function(stateName, params)
        {
          if(params)
          {
            $state.go(stateName, {id: params});
          }
          else
          {
            $state.go(stateName);
          }
        }
        this.changeStateO = function(stateName, params)
        {
          if(typeof(params) == 'object')
          {
            if(Object.keys(params).length == 0)
            {
              //$state.go(stateName, {id: stateName});
            }
            else
            {
              $state.go(stateName, {parent: params.parent, category: params.name});
            }
          }
        }
    }
    shareService.$inject = ['$cordovaSocialSharing'];
    function shareService($cordovaSocialSharing)
    {
        this.share = function()
        {
          $cordovaSocialSharing.share("Hi! Visit and download OSCE App for Medical Students", "OSCE Skills", "", "https://www.google.com.pk");
        }
    }
    Authorization.$inject = ['$state'];
    function Authorization($state)
    {
      this.authorized = false,
      this.memorizedState = null;

      var
      clear = function() {
        this.authorized = false;
        this.memorizedState = null;
      },

      go = function(fallback) {
        this.authorized = true;
        var targetState = this.memorizedState ? this.memorizedState : fallback;
        $state.go(targetState);
      };

      return {
        authorized: this.authorized,
        memorizedState: this.memorizedState,
        clear: clear,
        go: go
      };
    }

})();
