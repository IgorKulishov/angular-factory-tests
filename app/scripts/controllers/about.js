'use strict';

/**
 * @ngdoc function
 * @name yo714App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yo714App
 */
angular.module('yo714App').
	controller('AboutCtrl', ['$scope', 'getInfo', '$state', function ($scope, getInfo, $state) {
	  	
	  	$scope.chevronName = $scope.chevronPhone = "glyphicon glyphicon-minus";
	  	$scope.sortingType = 'firstName';
	  	$scope.sortingOrder = false;

	  	getInfo.tableTitles().then(
	  		function(data){
	  			
	  			var data = data.data.table;
	  			$scope.id_title = data.id_title;
	  			$scope.name_title = data.name_title;
	  			$scope.phone_title = data.phone_title;
	  		},function(err){
	  			console.log(err);
	  		}
	  	);

	  	getInfo.tableContent().then(
	  		function(data){
	  			console.log(data.data);
	  			var data = data.data;

	  			$scope.data = data;	
	  		},function(err){
	  			console.log(err);
	  		}
	  	);

	  	$scope.isActive = function(page) {
	  		console.log('current state: ', page);
	  		if($state.current.name === page) {
	  			return true;
	  		}
	  	}

	  	
	  	$scope.sortByName = function(sortingOrder) {
	  		
	  		if (sortingOrder == false) {
	  			$scope.sortingType = "firstName";
	  			$scope.sortingOrder = true;
	  			
	  		} if (sortingOrder == true) {
	  			$scope.sortingType = "firstName";
	  			$scope.sortingOrder = false;
	  		}
	  	};
	  	$scope.sortByPhone = function(sortingOrder) {
	  		if (sortingOrder == false) {
	  			$scope.sortingType = "phone";
	  			$scope.sortingOrder = true;
	  			
	  		} if (sortingOrder == true) {
	  			$scope.sortingType = "phone";
	  			$scope.sortingOrder = false;
	  		}
	  	};

	  	$scope.addContact = function(newContact) {
	  		newContact.id = $scope.data[$scope.data.length-1].id + 1;
	  		console.log($scope.data);
	  		$scope.data.push(newContact);
	  		delete $scope.newContact;
	  	};

	  	$scope.deleteRow = function(ind) {
	  		angular.forEach($scope.data, function(v, k) {
	  			if (v.id == ind)
	  				$scope.data.splice(k,1);
	  		});
	  	};
  	}]);
