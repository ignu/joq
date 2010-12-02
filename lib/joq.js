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

  var self = {
        _stub : function(object, method) {
      remember(object, method);
      var rv = {};
      rv.returns = function(returnCode) {
        object[method] = function() { return eval("'" + returnCode + "'")};
      };
      return rv;
    },
    _expect : function(object, method) {
      remember(object, method);
      object[method] = function(p,a,r,a,m,e,t,e,r,s) {
        object[method]["calls"] = [p,a,r,a,m,e,t,e,r,s];
        object[method].fulfilled = true;
        return object[method]["returnFunction"]
      };
      object[method]["returnFunction"] = function() {

      };
      object[method].name = method;
      expectations[expectations.length] = object[method];
      var rv = {};
      rv["with"] = function(p,a,r,a,m,e,t,e,r,s) {
                return {
          returns : function(returnFunction) {
              // TODO: there's opnly one return function, yet many withs()'

              object[method]["returnFunction"] = returnFunction();
          }
        }
      };
      return rv;
    },
    reset : function() {
      expectations = new Array();
      for(var i = resets.length-1; i>=0; i--)
        resets[i]();
    },
    errors : function() {
      var rv = new Array();
            $.each(expectations, function() {
        if(!this.fulfilled)
        rv[rv.length] = "expected " + this.name + " to be called";
      });
      return rv;
    }
  }


  var returns = {};
  var options = {};

  var mockAjax = mockAjax = function(ajaxOptions) {
    var key = ajaxOptions.method + ajaxOptions.url;
    options[key] = ajaxOptions;
    ajaxOptions.success(returns[key]);
  };

  self.mockAjax = function(verb, path) {
    $.ajax = mockAjax;
    return { returns : function(rv) {
                         returns[verb + path] = rv
                      }};
  };

  Object.prototype.stubs = function(method) {
    return self._stub(this, method);
  };

  Object.prototype.expects = function(method) {
    return self._expect(this, method)
  };

  return self;
}();
