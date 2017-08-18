angular
  .module('cms.globals', [
    '_',
    'async'
  ]);

angular.module('job', [
  'ui.router',
  'ui.bootstrap',
  'infinite-scroll',
  'angularUtils.directives.uiBreadcrumbs',
  'xeditable',
  'ngTagsInput',
  'ngSanitize',
  'angularFileUpload',
  'ui.select',
  'photo.area',
  'infinite-scroll',
  'uiGmapgoogle-maps',
  'cms.globals',
  'ngResource',
  'dndLists',
  'cgNotify',
  'ui.tinymce',
  'ngCropper'
])
.run(['$rootScope', '$window', 'cmsConfig', function ($rootScope, $window, cmsConfig) {
  $rootScope.safeApply = function () {
    if (!$rootScope.$$phase) {
      $rootScope.$apply();
    }
  };

  angular.element(document).ready(function () {
    $window.io = $window.io(cmsConfig.socketsApi);
  });
}]);

angular.module('job')
  .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', '$provide', 'cmsConfig',
    function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $provide, cmsConfig) {
      'use strict';

      $httpProvider.defaults.withCredentials = true;

      $provide.value('amazonUrl', '//static.dollarstreet.org/');

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: '/components/account/login.html',
          controller: 'LoginController',
          onEnter: function () {
            angular.element('body').addClass('gray-bg');
          },
          onExit: function () {
            angular.element('body').removeClass('gray-bg');
          }
        })
        .state('registration', {
          url: '/registration',
          templateUrl: '/components/account/registration.html',
          controller: 'RegistrationController',
          onEnter: function () {
            angular.element('body').addClass('gray-bg');
          },
          onExit: function () {
            angular.element('body').removeClass('gray-bg');
          }
        })
        .state('slideshow', {
          url: '/admin/slideshow/?row?amount?country?place?category?thing?rating?income?photographer?date?oneThing?onePlace',
          templateUrl: '/components/slideshow/slideshow.html',
          resolve: {
            authentication: ['$http', '$state', function ($http, $state) {
              $http.get(cmsConfig.serverApi + '/authorize').success(function (res) {
                if (!res.hasUser) {
                  $state.go('login');
                }
              });
            }]
          },
          controller: 'SlideshowController',
          onEnter: function () {
            angular.element('body').addClass('gray-bg slideshow');
          },
          onExit: function () {
            angular.element('body').removeClass('gray-bg slideshow');
          }
        });
    }]);
