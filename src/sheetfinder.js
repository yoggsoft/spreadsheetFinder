var sheetfinder = (function () {
    // use strict
    'use strict';
    
    var _data = "";
    
    var instance;
 
    function createInstance() {
        var _self = new Object();
        return _self;
    }
    
    function _getInstance(){
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }
    
    function isValid (val) {
        console.log(val);
        var isString = typeof val === 'string';
        var notEmpty = val !== '';
        var notNull = val !== null;
        return (isString && notEmpty && notNull) ? 1 : 0;
    }
    
    function _find(key){
        if (!isValid(key)){
            console.error('Invalid key.');
        }else{
            this.key = key;
            var url = 'https://spreadsheets.google.com/feeds/list/'+this.key+'/1/public/basic?alt=json';
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    _data = JSON.parse(request.responseText);
                    console.log(_data);
                } else {
                    // We reached our target server, but it returned an error
                }
            };
            request.onerror = function() {
              // There was a connection error of some sort
            };
            request.send();
        }
    }
    return {
        getInstance: _getInstance,
        find:_find
    };
})();