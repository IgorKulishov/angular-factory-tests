'use strict';

angular.module('yo714App')
  .factory('getInfo', ['$http', function ($http) {
     var arrStorage = [];
     return {
     	tableTitles: function() {
	     	return $http.get('scripts/data/content.json');
	    },
     	tableContent: function() {
	     	return $http.get('scripts/data/data.json');
	    },
      tempStorage: function(dataToStore) {
        if (dataToStore)
          arrStorage.push(dataToStore);
        return arrStorage;
      }
     };
  }]);
