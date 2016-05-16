/**
 * @author Administrator
 */
var util = {
	addEvent: function(el, type, fn){
	  if (document.addEventListener){
	      if (el && el.nodeName || el === window) {
	        el.addEventListener(type, fn, false);
	      } else if (el && el.length) {
	        for (var i = 0; i < el.length; i++) {
	          addEvent(el[i], type, fn);
	        }
	      }
	  }else{
	      if (el && el.nodeName || el === window) {
	        el.attachEvent('on' + type, function () { return fn.call(el, window.event);});
	      } else if (el && el.length) {
	        for (var i = 0; i < el.length; i++) {
	          addEvent(el[i], type, fn);
	        }
	      }
	  };	
	},
	asTime: function(t){
		t = Math.round(t);
		var s = t % 60;
		var m = Math.round(t / 60);
		return util.two(m) + ':' +util.two(s);		
	},
	two: function(s){
		s += "";
	    if (s.length < 2) s = "0" + s;
		return s;		
	}
}
