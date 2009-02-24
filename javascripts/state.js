var State = Class.create({
  // representation: new Hash(),
  
  initialize: function(){
    this._init();
  },
    
  set: function(key,val){
    this._read();
    this.h.set(key,val);
    this._write();
  },
  
  get: function(key){
    this._read();
    return this.h.get(key);
  },
  
  // returns the hash
  getAll: function(){
    return this.h;
  },
  
  isSet: function(key){
    return this.get(key) !== undefined
  },
  
  remove: function(key){
    this.h.remove(key);
    this._write();
  },
  
  removeAll: function(){
    this.h = new Hash();
    this._write();
  },
  
  //private
  
  _init: function(){
    this.h = new Hash();
    this._read();
  },
  
  
  _write: function(){
  },
  
  _read: function(){
  }
});

var LocationState = Class.create(State,{
  initialize: function(){
    this._init();
  },
  
  
  _write: function(){
    document.location.hash = this.h.toQueryString();
  },
  
  _read: function(){
    document.location.hash.replace(/#|#&/,'').split('&').each(function(keyval){
      keyval = keyval.split('=');
      this.h.set(keyval[0],keyval[1]);
    }.bind(this));
  }
  
})


var CookieState = Class.create(State, {

  initialize: function(cookie_name) {
    this.cookie_name = cookie_name;
    this.day_duration = 365;
    this._init();
  },
  
  _serialize: function(){
    // console.log("Serializing state: " + this.h.toJSON());
    return this.h.toJSON();
  },
  
  _unserialize: function(value){
    //TODO Fix this
    if(value) {
      // console.log("Unserializing: " + value.inspect());
      this.h = $H(value.evalJSON());
    } else {
      this.h = new Hash();
    }
      
  },
  
  _write: function(){
    this._eraseCookie();
    this._createCookie(this._serialize(), this.day_duration);
  },
  
  _read: function(){
    // console.log('cookie value ' + this._readCookie());
    this._unserialize(this._readCookie());
  },
  
  
  _createCookie: function(value,days) {
  	if (days) {
  		var date = new Date();
  		date.setTime(date.getTime()+(days*24*60*60*1000));
  		var expires = "; expires="+date.toGMTString();
  	}
  	else var expires = "";
  	document.cookie = this.cookie_name + "=" + value + expires + "; path=/";
  }, 
  
  _readCookie: function() {
  	var nameEQ = this.cookie_name + "=";
  	var ca = document.cookie.split(';');
  	for(var i=0;i < ca.length;i++) {
  		var c = ca[i];
  		while (c.charAt(0)==' ') {
  		  c = c.substring(1,c.length);
		  }
  		if (c.indexOf(nameEQ) == 0) {
  		  return c.substring(nameEQ.length,c.length);
		  }
  	}
  	return null;
  }, 
  
  _eraseCookie: function() {
  	this._createCookie("",-1);
  }
  
});



