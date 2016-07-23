'use strict';

/***
*
* FACTORY TEST MOKING WITH $PROVIDE 
* 
* a) instantiate module 'yo714App'
* b) we override 'getInfo' with function defined by $provide (get injected)

* Note: when 'getInfo' is called during mocking test, provider will give the mocking value
* 
****/

describe('Test AboutCtrl controller and factory using Mocking: ', function () {

	var aboutCtrl, scope, getInfoMock;

		//instantiate module
	beforeEach(module('yo714App'));

	//mocking factory
	beforeEach(module(function($provide){
		$provide.factory('getInfo', ['$q', function($q) {
	     return {

	     	tableTitles: function() {
		     	return $q(function(res, rej) {
		     		res({
		     			data:{
							"table": {
								"id_title":"#",
								"name_title":"Name",
								"phone_title":"Phone"
								}
							}
						});
		     	});
	     	},
	     	tableContent: jasmine.createSpy('tableTitles').and.callFake(function() {
	     		return $q(function(res, rej) {
	     			res([
						{
							"id"	   : 1,
							"firstName": "Wayne",
							"lastName" : "Testerson",
							"phone"	   : 1234567890
						},
						{
							"id"	   : 2,
							"firstName": "Doug",
							"lastName" : "Testerson",
							"phone"	   : 9876543210
						},
						{
							"id"	   : 3,
							"firstName": "Boris",
							"lastName" : "Testerson",
							"phone"	   : 5555776699
						},
						{
							"id"	   : 4,
							"firstName": "Ashly",
							"lastName" : "Testerson",
							"phone"	   : 1111111111
						}
					]);
				});
	     	}),
	      	tempStorage: function(dataToStore) {
	      		var arrStorage = [];
		        if (dataToStore)
		          arrStorage.push(dataToStore);
		        return arrStorage;		      
			      	}
			     };
		}]);
	}));
	



	beforeEach(inject(function($rootScope, $controller, getInfo) {

		scope = $rootScope.$new();

		//define controller
	    aboutCtrl = $controller('AboutCtrl', {
	      $scope: scope
	    });

	    getInfoMock = getInfo;

	}));

	


	it('test scope: ', function(){
		
		expect(scope.data[0]).toBe(1);
		
		console.log('scope', scope);
	});

	it('test function: ', function(){
		
		expect(getInfoMock.tableTitles).toBeDefined();

		// 1. not defined before '$digest'
		console.log('scope.name_title', scope.name_title);
		expect(scope.name_title).not.toBeDefined();
		scope.$digest();

		// 2. defined after '$digest'
		console.log('scope.name_title', scope.name_title);
		expect(scope.name_title).toBe('Name');		
		
	});

});