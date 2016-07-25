'use strict';

angular.module('yo714App')
  .directive('nameValidation', function() {
  	return {
  		require: 'ngModel',
  		link: function(scope, element, attribute, controller) {

        var patern = /^[A-Za-z]+@[A-Za-z]+$/;

        // max length validation
        controller.$validators.lengthvalid = function(modelValue, viewValue) {
          
          if (controller.$isEmpty(modelValue))
            return true;
          if (modelValue.length > 10) {
            return false;
          }
        };
        controller.$validators.emailval = function(modelValue, viewValue) {
          
          console.log(modelValue, viewValue);

          if (controller.$isEmpty(modelValue)) {
            
            return true;
          }
          if ((modelValue.length > 10) && (!modelValue.indexOf('@'))) {
            return false;
          }
        };
        //parser (modelValue) valdiation
        controller.$parsers.unshift(function(value) {
          return patern.test(value) ? value : 'undefined';
        });

        //formatters (viewValue) valition
        controller.$formatters.unshift(function(value) {
          if (value) {
            console.log('formatters value', value);
            return patern.test(value) ? value : 'undefined';            
          }
        });


  			// ct.$validators.validCharacters = function(modelValue, viewValue) {
  			// 	console.log(modelValue, viewValue);
  			// };

  			// var parten = /^[A-Za-z]+$/;
  			// sc.validate = function(e) {

  			// 	var char = String.fromCharCode(e.which||e.charCode||e.keyCode);
  			// 	if (parten.test(char)) {
  			// 		console.log(char);
  			// 		console.log('ct', ct);
  			// 		return true;
  			// 	} if (!parten.test(char)) {
  			// 		e.preventDefault();
  			// 		return false;
  			// 	}
  			// }

  		}
  	};
  });