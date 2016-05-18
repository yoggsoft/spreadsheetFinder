;(function(window, document, undefined) {
    // use strict
    "use strict";
    var NAME ="sheetfinder";

    var url_prefix = 'https://spreadsheets.google.com/feeds/list/';
    var url_suffix = '/1/public/basic?alt=json';

    /**
     * Represents a sheetfinder object to be used as DB.
     * @constructor
     */
    function sheetfinder(){
      this.key;
      this.url;
      this.trix = {};
    }
    
    /** SHEETFINDER CONNECT
     * Connects sheetfinder with spreadsheet and returns its content to DOM
     * @param {String} key - the public spreadsheet key.
     * @returns {json} callback - executes when request succeeds. 
     */
    sheetfinder.prototype.connect = function(key,callback){
      if (isValid(key)){
        this.key = key;
        this.url = url_prefix+this.key+url_suffix;
      
        // Ajax call
        var xhr = new XMLHttpRequest();
        xhr.open("GET",this.url,true);
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 400){
              if(callback){
                callback(xhr.responseText);
              }
            }else{
              console.error('Connection established but something broke.');
            }
          }
        };
        xhr.send();
      }else{
        console.error('Doc Key is invalid. Make sure that the document is published and the Key is valid.');
      }
    };

    /** IS VALID
     * Returns true if public document key is valid
     * @param {String} key - the public spreadsheet key. 
     */
    var isValid = function(val) {
      //  checks if String
      var isString = typeof val === 'string';
      // checks if empty
      var notEmpty = val !== '';
      // checks if null
      var notNull = val !== null;
      return (isString && notEmpty && notNull);
    };

  window[NAME] = sheetfinder;
})(window, document);
