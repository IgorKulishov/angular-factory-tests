'use strict';

angular.module('yo714App')
    .factory('loginInterceptor', ['$q', '$location', function ($q, $location) {
        return {
        	request: function(config) {
        		console.log('Request made with', config);
        		return config;
        	},
        	requestError: function(rejection) {
        		console.log('Request was rejected with ', rejection);
        		return rejection;
        	},
        	response: function(response) {
        		console.log('Received response ', response);
        		return response;
        	},
        	responseError: function(rejection) {
        		console.log('Request error due to ', rejection);
        		return rejection;
        	}
        };
    }]);
