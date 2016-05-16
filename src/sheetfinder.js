var sheetfinder = (function () {
    // use strict
    "use strict";

    var _data = "";
    var instance;
    var events = [];
    var event_keys = {
      _init: "connected",
      _keySave : "created",
      _keyUpdate : "updated",
      _keyDelete : "deleted",
      _keyRead : "read"
    };
    var _key = '';

    function createInstance() {
        var _self = new Object();
        return _self;
    }

    function _getInstance() {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }

    function isValid (val) {
      var isString = typeof val === 'string';
      var notEmpty = val !== '';
      var notNull = val !== null;
      return (isString && notEmpty && notNull) ? 1 : 0;
    }

    function _connect(key) {
      if (!isValid(key)) {
          console.error('Invalid key.');
      } else {
        _key = key;
        handleRequest();
      }
    }
    // HandleRequest method - creates the Google Docs request
    function handleRequest () {
      var url = 'https://spreadsheets.google.com/feeds/list/'+_key+'/1/public/basic?alt=json';
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
              // Success!
              _data = JSON.parse(request.responseText);
              dispatch (event_keys._init);
          } else {
              // We reached our target server, but it returned an error
              console.error("Server returned an error. Check the spreadsheet key.");
          }
      };
      request.onerror = function() {
        // Connection error of some sort.
        console.error("Connection error.");
      };
      request.send();
    }

    function dispatch (key) {
  		var dataObj;
  		if (events.hasOwnProperty(key)) {
  			dataObj = dataObj || {};
  			dataObj.currentTarget = sheetfinder;
  			for (var i in events[key]) {
  				events[key][i](dataObj);
  			}
  		}
  	}

    // removes listeners
    function _addEventListener (key,func) {
  		if (!events.hasOwnProperty(key)) {
  		    events[key] = [];
  		}
  		events[key].push(func);
  	}

  	// removes listeners
  	function _removeEventListener (key,func) {
  		if (events.hasOwnProperty(key)) {
  			for (var i in events[key]) {
  				if (events[key][i] === func) {
  					events[key].splice(i, 1);
  				}
  			}
  		}
  	}

    return {// Public API

      getInstance : _getInstance,

      // public methods
      connect : _connect,

      // EventListener methods
      addEventListener : _addEventListener,
      removeEventListener : _removeEventListener,

      connected : event_keys._init
      
    }
})();
