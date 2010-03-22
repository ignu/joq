var Joq = function() {
	
	var resets = [];	
	var remember = function(object, method) {
		var original = object[method];
		var replaceOriginal = function() {
			object[method] = original;			
		};
		resets[resets.length] = replaceOriginal;
	};
	
	var expectations = new Array();
	var selectFunction = function() {
      
	};
	
	var that = {
      	_stub : function(object, method) {
			remember(object, method);	
			var rv = {};
			rv.returns = function(returnCode) {
				object[method] = function() { return eval("'" + returnCode + "'")};		
			};
			return rv;
		}, 
		_expect : function(object, method) {
			var rv = {};
			object[method] = function(parameter) { object[method][parameter](); };
			rv["with"] = function(parameter) {
                console.log(parameter + " ooo " + method);
                return {
					returns : function(returnFunction) {
                      console.log(parameter);
				      object[method][parameter] = function() {return returnFunction();};
					}
				}
			};
			return rv;
		}, 
		reset : function() {
			for(var i = resets.length-1; i>=0; i--)
			  resets[i]();
		}, 
		errors : function() {
			return new Array();
		}
	}
	
	Object.prototype.stubs = function(method) {
		return that._stub(this, method);
	};

	Object.prototype.expects = function(method) {
		return that._expect(this, method)
	};
		
	return that;
}();



