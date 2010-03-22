var Joq = function() {
	var that = {
      resets : new Array()
	}
	return that;
}();

Joq.Stub = function(object, method) {
	var rv = {};
	rv.returns = function(returnCode) {
		var original = object[method];
		var replaceOriginal = function() {
			console.log("replacing" + original)
			object[method] = original;			
		};
		Joq.resets[Joq.resets.length] = replaceOriginal;
		object[method] = function() { return eval("'" + returnCode + "'")};		
	};
	return rv;
};

Joq.reset = function() {
	for(var i = Joq.resets.length-1; i>=0; i--)
	  Joq.resets[i]();
};

Object.prototype.stubs = function(method) {
	return Joq.Stub(this, method);
};

