;(function(window, document, undefined) {
    // use strict
    "use strict";
    var NAME ="sheetfinder";

    var url_prefix = 'https://spreadsheets.google.com/feeds/list/';
    var url_suffix = '/1/public/basic?alt=json';

    // Constructor
    function sheetfinder(key){
      this.key;
      this.url;
      this.events = [];
      this.trix = {};
      this.req;

      this.dispatch = function (key) {
        var dataObj;
    		if (this.events.hasOwnProperty(key)) {
    			dataObj = dataObj || {};
    			dataObj.currentTarget = sheetfinder;
    			for (var i in this.events[key]) {
    				this.events[key][i](dataObj);
    			}
    		}
    	};

      this.addEventListener = function (key,func) {
    		if (!this.events.hasOwnProperty(key)) {
    		    this.events[key] = [];
    		}
    		this.events[key].push(func);
    	};

      this.removeEventListener = function (key,func) {
    		if (this.events.hasOwnProperty(key)) {
    			for (var i in this.events[key]) {
    				if (this.events[key][i] === func) {
    					this.events[key].splice(i, 1);
    				}
    			}
    		}
    	};

    }

    sheetfinder.prototype.connect = function(key){
      if (isValid(key)){
        this.key = key;
        this.url = url_prefix+this.key+url_suffix;
        this.humbleRequest(this.url);
      }else{
        console.error('Doc Key is invalid. Make sure that the document is published and the Key is valid.');
      }
    }

    // humbleRequest constructor
    sheetfinder.prototype.humbleRequest = function(url) {
      var req = new XMLHttpRequest();
      req.open("GET",url,true);
      req.onreadystatechange = function(){
        if (req.readyState === 4){
          if (req.status >= 200 && req.status < 400){
            handleParse(req.responseText);
          }else{// Connection established but something broke.
            console.error('Connection established but something broke.');
          }
        }
      }
      req.send();
    }

    var handleParse = function(data){
      dispatch('connect');
      var spreadsheet = {};
      spreadsheet.title = data.feed.title;
  	  spreadsheet.author = data.feed.author;

      return spreadsheet;
    }

    // validates Doc key
    var isValid = function(val) {
      //  checks if String
      var isString = typeof val === 'string';
      // checks if empty
      var notEmpty = val !== '';
      // checks if null
      var notNull = val !== null;
      return (isString && notEmpty && notNull);
    }

  window[NAME] = sheetfinder;
})(window, document);
