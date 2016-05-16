var sheetfinder = (function(){
    // use strict
    'use strict';
    
    var _data = "";
    
    var isValid = function(val){
        return (typeof val === String && val !== '' && val !== null) ? 1 : 0;
    };
    
    var find = function(key){
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
    };
    return{
      pullfrom : find
    };
})();