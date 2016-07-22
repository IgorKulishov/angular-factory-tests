'use strict';

angular.module('yo714App')
  .directive('navBar', function() {
  	return {
  		templateUrl: 'scripts/directives/navtab/navtab.html',
  		controller: ['$scope', '$state', function($scope, $state) {
  			$scope.isActive = function(param) {
  				if ($state.current.name === param) {
  					return true;
  				}
  			}
  		}]
  	};
  });
