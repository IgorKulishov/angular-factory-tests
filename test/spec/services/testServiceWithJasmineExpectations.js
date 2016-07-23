'use strict';

/***
*
* TEST BASED ON HTTPBACKEND CALL WITH SET EXPECTATIONS:
* 
* a) instantiate module 'yo714App'
* b) inject scope and service httpBackend (Angular-mock prevents actual XHR call)
* c) instatiate controller
* Note: because controller makes a call it is important to set expectations (with Jasmine: 'expect' and 'when') before we instatiate controller
* 
****/

describe('Test AboutCtrl controller and factory using Mocking: ', function () {

	var aboutCtrl, scope, httpBackend;

	beforeEach(module('yo714App'));
	
	beforeEach(inject(function($rootScope, $injector, $controller) {
		//ctrl = $controller('MainCtrl');

		scope = $rootScope.$new();
		//call service (could be also defined as httpBackend = $httpBackend; but $httpBackend has to be injected above)
		httpBackend = $injector.get('$httpBackend');
		//define call 1
		httpBackend.expectGET('scripts/data/content.json').respond({
			"table": {
				"id_title":"#",
				"name_title":"Name",
				"phone_title":"Phone"
			}
		});
		//define call 2
		httpBackend.expectGET('scripts/data/data.json').respond({
			"table": {
				"id_title":"#",
				"name_title":"Name",
				"phone_title":"Phone"
			}
		});
		//define call 3
		httpBackend.when('GET', 'views/main.html').respond('<div>Mock test</div>');

		//define controller
	    aboutCtrl = $controller('AboutCtrl', {
	      $scope: scope
	    });

	}));

	it('test factory: ', function(){
		//console.log('httpBackend', httpBackend);
		httpBackend.flush();
		console.log('httpBackend', httpBackend);
		expect(scope.data.table.id_title).toBeDefined();

		console.log('scope.data', scope.data);
	});

});