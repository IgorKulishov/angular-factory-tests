'use strict';

describe('Test service', function () {


  //There are two ways a) to use $injector or b) $provider; we are mocking using $provider
  //injecting factory first with defined function
  beforeEach(module(function($provide){

    $provide.factory('getInfo', function() {
      return {
        tableTitles: jasmine.createSpy('tableTitles').and.callFake(function() {
          return {
            "table": {
              "id_title":"#",
              "name_title":"Name",
              "phone_title":"Phone"
            }
          };
        }),
        tableContent: jasmine.createSpy('tableContent').and.callFake(function() {
           return [
              {
                "id"     : 1,
                "firstName": "Wayne",
                "lastName" : "Testerson",
                "phone"    : 1234567890
              },
              {
                "id"     : 2,
                "firstName": "Doug",
                "lastName" : "Testerson",
                "phone"    : 9876543210
              },
              {
                "id"     : 3,
                "firstName": "Boris<script>alert(1);</script>",
                "lastName" : "Testerson",
                "phone"    : 5555776699
              },
              {
                "id"     : 4,
                "firstName": "Ashly",
                "lastName" : "Testerson",
                "phone"    : 1111111111
              }
            ];
        }
      )
     };
    });

  }));

  // load the controller's module
  beforeEach(module('yo714App'));

  var AboutCtrl, getInfo,
    scope, mockGetInfo, httpBackend;

  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $injector, getInfo) {
    scope = $rootScope.$new();

    mockGetInfo = getInfo;
    
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    httpBackend = $injector.get('$httpBackend');

    httpBackend.when('GET', 'scripts/data/content.json').respond({
      "table": {
        "id_title":"#",
        "name_title":"Name",
        "phone_title":"Phone"
      }
    });

    httpBackend.when('GET', 'scripts/data/data.json').respond([
        {
          "id"     : 1,
          "firstName": "Wayne",
          "lastName" : "Testerson",
          "phone"    : 1234567890
        },
        {
          "id"     : 2,
          "firstName": "Doug",
          "lastName" : "Testerson",
          "phone"    : 9876543210
        },
        {
          "id"     : 3,
          "firstName": "Boris<script>alert(1);</script>",
          "lastName" : "Testerson",
          "phone"    : 5555776699
        },
        {
          "id"     : 4,
          "firstName": "Ashly",
          "lastName" : "Testerson",
          "phone"    : 1111111111
        }
      ]);

    httpBackend.when('GET', 'views/main.html').respond('<div>Mock test</div>');

  }));

  it('Should make a GET call', function () {
    
    httpBackend.flush();

    console.log('AboutCtrl : ', AboutCtrl);
    // titles
    expect(scope.id_title).toBeDefined();
    expect(scope.id_title).toBe('#');
    expect(scope.name_title).toBe('Name');
    // data
    expect(scope.data[0].firstName).toBe('Wayne');
  });
});
