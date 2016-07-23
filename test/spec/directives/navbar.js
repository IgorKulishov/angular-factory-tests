'use strict';
/***
*
*   TEST DIRECTIVE
*  1) inject $compile, $httpBackend, $rootScope
*  2) assign mock values to scope
*  3) use 'when' and 'respond' to load mock value for httpBackend (when 'httpBackend.flush()' trigers http call)
*  4) $compile html element of directive
*  5) $digest scope and flush server (httpBackend gets loaded)
*  6) test instatiated directive
* 
***/

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('yo714App'));

  var scope, element, compile, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $compile, $httpBackend) {
    scope = $rootScope.$new();    
    
    compile = $compile;

    httpBackend = $httpBackend;
    httpBackend.when('GET', 'scripts/directives/navtab/navtab.html').respond(
      `<div class="collapse navbar-collapse" id="js-navbar-collapse">`+
      `<ul class="nav navbar-nav">`+
        `<li ng-click="isActive('home')" ng-class="{active : isActive('home')}" ><a ui-sref="home">Home</a></li>`+
        `<li ng-click="isActive('about')" ng-class="{active : isActive('about')}"><a ui-sref="about">About</a></li>`+
        `<li ng-click="isActive('contact')"  ng-class="{active : isActive('contact')}" ><a ui-sref="contact">Contact</a></li>`+
      `</ul>`+
      `</div>`);

    //define call 1
    httpBackend.when('GET', 'scripts/data/content.json').respond({
      "table": {
        "id_title":"#",
        "name_title":"Name",
        "phone_title":"Phone"
      }
    });
    //define call 2
    httpBackend.when('GET', 'scripts/data/data.json').respond({
      "table": {
        "id_title":"#",
        "name_title":"Name",
        "phone_title":"Phone"
      }
    });
    //define call 3
    httpBackend.when('GET', 'views/main.html').respond('<div>Mock test</div>');


  }));

  it('should attach a list of awesomeThings to the scope', function () {
     element = compile(`<nav-bar></nav-bar>`)(scope);
     scope.$digest();
     httpBackend.flush();
     expect(scope.isActive).toBeDefined();
     console.log('scope of directives', scope);
   
  });
});
