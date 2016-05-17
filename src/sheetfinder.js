;(function(window, document, undefined) {
    // use strict
    "use strict";
    var NAME ="sheetfinder";

    var url_prefix = 'https://spreadsheets.google.com/feeds/list/';
    var url_suffix = '/1/public/basic?alt=json';

    function isValid(val) {
      var isString = typeof val === 'string';
      var notEmpty = val !== '';
      var notNull = val !== null;
      return (isString && notEmpty && notNull);
    }

    function sheetfinder(key){
      this._key;
      this.url;
      this.events = [];
      this.requester;
      this.data = {};

      if(isValid(key)){
        this._key = key;
        this.url = url_prefix+this.key+url_suffix;
        console.log(this.url);
        this.requester = new requester(this.url);
      }else{
        console.error('Doc Key is invalid. Make sure that the document is published and the Key is valid');
      }
    }

    // HandleRequest method - pulls data from
    sheetfinder.prototype.connect = function(key) {
      
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onreadystatechange = function(){
        if (request.readyState === 4){
          if (request.status >= 200 && request.status < 400) {
            parsedata(JSON.parse(request.responseText));
          }else{
            console.error("Server returned an error. Check the spreadsheet key.");
          }
        }
      };
      request.send(null);
    }

    var dispatch = function (){
      var dataObj;
  		if (this.events.hasOwnProperty(key)) {
  			dataObj = dataObj || {};
  			dataObj.currentTarget = sheetfinder;
  			for (var i in this.events[key]) {
  				this.events[key][i](dataObj);
  			}
  		}
    }

    sheetfinder.prototype.dispatch = function (key) {
      return dispatch.call(key);
  	};

    sheetfinder.prototype.addEventListener = function (key,func) {
  		if (!this.events.hasOwnProperty(key)) {
  		    this.events[key] = [];
  		}
  		this.events[key].push(func);
  	};

  	sheetfinder.prototype.removeEventListener = function (key,func) {
  		if (this.events.hasOwnProperty(key)) {
  			for (var i in this.events[key]) {
  				if (this.events[key][i] === func) {
  					this.events[key].splice(i, 1);
  				}
  			}
  		}
  	};

  	var parsedata = function(data){
  	  var spreadsheet = {};
  	  spreadsheet.title = data.feed.title;
  	  spreadsheet.author = data.feed.author;
  	  // spreadsheet.feed = data.feed;
  	  console.log(spreadsheet);
  	};

  window[NAME] = sheetfinder;
})(window, document);
