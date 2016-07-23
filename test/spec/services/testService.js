'use strict';

describe('Test service with AboutCtrl controller and factory: ', function () {

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
		httpBackend.flush();
		//console.log('aboutCtrl', aboutCtrl);
		expect(scope).toBeDefined();

		console.log('scope', scope);
	});

});