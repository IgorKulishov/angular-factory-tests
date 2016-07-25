'use strict';

/**
 * @ngdoc overview
 * @name yo714App
 * @description
 * # yo714App
 *
 * Main module of the application.
 */
angular.module('yo714App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .value('myConstant', {value:123})
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('about.contacts', {
        url: '/contacts',
        templateUrl: 'views/contacts.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('about.form', {
        url: '/form',
        templateUrl: 'views/form.html',
        controller: 'FormCtrl'
      })
      .state('about.schedule', {
        url: '/schedule',
        templateUrl: 'views/schedule.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('const', {
        url:'/const',
        template :"<pre>Const: {{const}}</pre>",
        controller :['$scope', 'myConstant', function($scope, myConstant){
          $scope.const = myConstant;
          console.log(myConstant);
        }]
      })
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('loginInterceptor');
    $httpProvider.defaults.headers.post['Content-Type'] = 'json/application';
  });
