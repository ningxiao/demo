/**
 * @author nttdocomo
 */
(function() {
	var hasOwn = Object.prototype.hasOwnProperty, class2type = {}, toString = Object.prototype.toString;
	// Populate the class2type map
	var name = "Boolean Number String Function Array Date RegExp Object".split(" ");
	for (var i = 0; i < name.length; i++){
		class2type["[object " + name[i] + "]"] = name[i].toLowerCase();
	}
	var div = document.createElement('div');
	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
	/*add ads custom style*/
	var style = document.getElementsByTagName('style');
	if(style.length) {
		style = style[0];
	} else {
		style = document.createElement('style');
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	var styleText = '.leju-ads object {vertical-align:top}\
	.cf:before,.cf:after{content:"";display:table;}\
	.cf:after{clear:both;}.cf{zoom:1;}\
	.row-6-900 div {margin-right:10px;}\
	.row-3 .lunbo-585,.row-3 .banner-585{float:left;diplay:inline;margin:4px 14px}';
	if(style.styleSheet) {// for IE
		style.styleSheet.cssText += styleText;
	} else {// others
		var textnode = document.createTextNode(styleText);
		style.appendChild(textnode);
	}
	var all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], vendors = "Khtml Ms O Moz Webkit".split(' '), len = vendors.length;
	var supports = this.supports = function(prop) {
		if( prop in div.style) {
			return true;
		}
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		for(var i = 0; i < len; i++) {
			if(vendors[i] + prop in div.style) {
				return true;
			}
		}
		return false;
	};
	this.ads = {
		config : {
			path : 'src/'
		},
		hasInit : false,
		bind : function(E, D) {
			return function() {
				return D.apply(E, arguments)
			}
		},
		supports : {
			cssFloat : !!a.style.cssFloat
		},
		timers : [],
		vendors : "Khtml Ms O Moz Webkit".split(' '),
		ie : document.uniqueID != document.uniqueID,
		flashChecker : (function() {
			var hasFlash = 0;
			var flashVersion = 0;
			var isIE = document.uniqueID != document.uniqueID;
			if(isIE) {
				var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
				if(swf) {
					hasFlash = 1;
					VSwf = swf.GetVariable("$version");
					flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
				}
			} else {
				if(navigator.plugins && navigator.plugins.length > 0) {
					var swf = navigator.plugins["Shockwave Flash"];
					if(swf) {
						hasFlash = 1;
						var words = swf.description.split(" ");
						for(var i = 0; i < words.length; ++i) {
							if(isNaN(parseInt(words[i])))
								continue;
							flashVersion = parseInt(words[i]);
						}
					}
				}
			}
			return {
				f : hasFlash,
				v : flashVersion
			};
		})(),
		id : 0,
		$ : function(id) {
			if(id)
				return document.getElementById(id);
		},
		init : function() {
			if(!ads.hasInit) {
				// http://www.robertpenner.com/easing/
				Math.linearTween = function(t, b, c, d) {
					return c * t / d + b;
				};
				Math.easeOutCirc = function(t, b, c, d) {
					return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
				};
				Math.easeInQuad = function(t, b, c, d) {
					return c * (t /= d) * t + b;
				};
				Math.easeOutBack = function(t, b, c, d, s) {
					if(s == undefined)
						s = 1.70158;
					return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
				};
				Math.easeOutQuint = function(t, b, c, d) {
					return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
				};
				Math.easeOutBounce = function(t, b, c, d) {
					if((t /= d) < (1 / 2.75)) {
						return c * (7.5625 * t * t) + b;
					} else if(t < (2 / 2.75)) {
						return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
					} else if(t < (2.5 / 2.75)) {
						return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
					} else {
						return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
					}
				};
			}
		},
		animate : function(el, prop, opt) {
			var start, end, unit;
			if( typeof opt != 'object' || opt === null) {
				var args = arguments;
				opt = {
					duration : args[2],
					easing : args[3],
					complete : args[4]
				};
			}
			if( typeof opt.duration != 'number')
				opt.duration = 250;
			opt.easing = Math[opt.easing] || Math.easeInQuad;
			opt.curAnim = ads.extend({}, prop);
			for(var name in prop) {
				var e = new ads.fx(el, opt, name);
				start = parseFloat(ads.css(el, name)) || 0;
				end = parseFloat(prop[name]);
				unit = name != 'opacity' ? 'px' : '';

				e.custom(start, end, unit);
			}
		},
		css : function(el, prop) {
			if(el.style[prop]) {
				return el.style[prop];
			} else if(document.defaultView) {
				return document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);

			} else {
				if(prop == 'opacity')
					prop = 'filter';
				var val = el.currentStyle[prop.replace(/\-(\w)/g, function(a, b) {
					return b.toUpperCase();
				})];
				if(prop == 'filter')
					val = val.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
						return b / 100
					});
				return val === '' ? 1 : val;
			}
		},
		inArray : function(elem, array) {

			if(indexOf) {
				return indexOf.call(array, elem);
			}

			for(var i = 0, length = array.length; i < length; i++) {
				if(array[i] === elem) {
					return i;
				}
			}

			return -1;
		},
		isArray : Array.isArray ||
		function(obj) {
			return ads.type(obj) === "array";
		},

		isFunction : function(obj) {
			return ads.type(obj) === "function";
		},
		isWindow : function(obj) {
			return obj && typeof obj === "object" && "setInterval" in obj;
		},
		type : function(obj) {
			return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
		},
		noop : function() {
		},
		isPlainObject : function(obj) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if(!obj || ads.type(obj) !== "object" || obj.nodeType || ads.isWindow(obj)) {
				return false;
			}

			// Not own constructor property must be Object
			if(obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.

			var key;
			for(key in obj ) {
			}

			return key === undefined || hasOwn.call(obj, key);
		},
		extend : function(obj, extObj) {
			var _obj;
			if( typeof obj === "string") {
				_obj = ads[obj];
				var ret;
				if(_obj && _obj.extend) {//like ads["Banner"] == ads.Banner
					ret = _obj.extend(extObj);
					//return ads.Banner.extend(extobj)
				} else {
					ret = {
						dependence : obj,
						extObj : extObj
					};
				}
				if(extObj.required) {
					ret.required = extObj.required;
				}
				return ret;
			} else {
				var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;

				// Handle a deep copy situation
				if( typeof target === "boolean") {
					deep = target;
					target = arguments[1] || {};
					// skip the boolean and the target
					i = 2;
				}

				// Handle case when target is a string or something (possible in deep copy)
				if( typeof target !== "object" && !ads.isFunction(target)) {
					target = {};
				}

				// extend jQuery itself if only one argument is passed
				if(length === i) {
					target = this; --i;
				}

				for(; i < length; i++) {
					// Only deal with non-null/undefined values
					if(( options = arguments[i]) != null) {
						// Extend the base object
						for(name in options ) {
							src = target[name];
							copy = options[name];

							// Prevent never-ending loop
							if(target === copy) {
								continue;
							}

							// Recurse if we're merging plain objects or arrays
							if(deep && copy && (jQuery.isPlainObject(copy) || ( copyIsArray = jQuery.isArray(copy)) )) {
								if(copyIsArray) {
									copyIsArray = false;
									clone = src && jQuery.isArray(src) ? src : [];

								} else {
									clone = src && jQuery.isPlainObject(src) ? src : {};
								}

								// Never move original objects, clone them
								target[name] = jQuery.extend(deep, clone, copy);

								// Don't bring in undefined values
							} else if(copy !== undefined) {
								target[name] = copy;
							}
						}
					}
				}

				// Return the modified object
				return target;
			}
		},
		setStyle : function(el, styles) {
			var len = ads.vendors.length, prop;
			for(var x in styles) {
				var name = ads.cssProps[x] || x;
				if(ads.ie && name == 'opacity') {
					if(styles[x] > 0.99)
						el.style.removeAttribute('filter');
					else
						el.style.filter = 'alpha(opacity=' + (styles[x] * 100) + ')';
				} else if( name in el.style) {
					el.style[name] = styles[x];
				} else {
					prop = name.replace(/^[a-z]/, function(val) {
						return val.toUpperCase();
					});
					for(var i = 0; i < len; i++) {
						if(ads.vendors[i] + prop in el.style) {
							el.style[ads.vendors[i] + prop] = styles[x];
						}
					}
				}
			}
		},
		getNextSibling : function(el) {
			if(el.nextSibling.nodeType == 3) {
				return ads.getNextSibling(el.nextSibling);
			} else {
				return el.nextSibling;
			}
		},
		insertAfter : function(newEl, targetEl) {
			var parentEl = targetEl.parentNode;

			if(parentEl.lastChild == targetEl) {
				parentEl.appendChild(newEl);
			} else {
				parentEl.insertBefore(newEl, ads.getNextSibling(targetEl));
			}
		},
		createElement : function(tag, attrs, styles, target, action) {
			var el = document.createElement(tag);
			if(attrs) {
				ads.extend(el, attrs);
			};
			if(styles) {
				ads.setStyle(el, styles);
			};
			if(target) {
				switch(action){
					case 'before':
						target.parentNode.insertBefore(el, target)
						break
					case 'after':
						ads.insertAfter(el, target)
						break
					case 'prepend':
						target.insertBefore(el,target.firstChild)
						break
					default:
						target.appendChild(el);
				}
			};
			return el;
		},
		rotator : function(data, cookieName) {
			var ary = [];
			var data = data.data;
			for(var i = 0; i < data[0].length; i++) {
				if(ads.compareTime(data[0][i][2], data[0][i][3])) {
					ary.push(data[0][i]);
				}
			}
			if(data.length - 1) {
				var vnad = [];
				for(var i = 0; i < data[1].length; i++) {
					if(ads.compareTime(data[1][i][2], data[1][i][3])) {
						vnad.push(data[1][i]);
					}
				}
				//if(ary.length < data[0].length) {
				for(var i = 0; i < vnad.length; i++) {
					ary.push(vnad[i]);
				}
				//}
			}
			return ary;
		},
		setCookie : function(name, value, expires, path, domain, secure) {
			// set time, it's in milliseconds
			var today = new Date();
			today.setTime(today.getTime());

			/*
			 if the expires variable is set, make the correct
			 expires time, the current script below will set
			 it for x number of days, to make it for hours,
			 delete * 24, for minutes, delete * 60 * 24
			 */
			if(expires) {
				expires = expires * 1000 * 60 * 60 * 24;
			}
			var expires_date = new Date(today.getTime() + (expires));

			document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
		},
		getCookie : function(name) {
			var re = new RegExp(name + '=([^;]+)');
			var val = re.exec(document.cookie);
			return val == null || val == NaN ? null : val[1]
		},
		getIndex : function(times, name, length) {
			ads.setCookie(name, times);
			var index = times % length;
			return index;
		},
		compareTime : function(start, end) {
			if(!start && !end) {
				return true;
			}
			var date = new Date;
			var start = new Date(start + " 09:00:00");
			var end = new Date(new Date(end + " 09:00:00").getTime() + 1000 * 60 * 60 * 24);
			return date > start && date < end;
		},
		throttle : function(fn, delay) {//http://remysharp.com/2010/07/21/throttling-function-calls/
			var timer = null;
			return function() {
				var context = this, args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			};
		},
		getScript : function(url, callback) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(script.readyState) {
				script.onreadystatechange = function() {
					if(script.readyState == 'loaded' || script.readyState == 'complete') {
						script.onreadystatechange = null;
						if(callback)
							callback();
						script.parentNode.removeChild(script);
					}
				}
			} else {
				script.onload = function() {
					if(callback)
						callback();
					script.parentNode.removeChild(script);
				}
			}
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		},
		getSwfObject : function(id){
			var el = document.getElementById(id)
			return ads.ie?el.firstChild:el.getElementsByTagName('embed')[0];
		},
		getEventTarget:function(e){
			var evt = e || window.event;
			var target = evt.target || evt.srcElement;
			return target;
		},
		onVideoLoaded:function(id){
			document.getElementById(id).style.top = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - 260 + "px"
		},
		onVideoClosed:function(id){
			var player = document.getElementById(id)
			player.parentNode.removeChild(player)
		}
	};
	ads.cssProps = {
		// normalize float css property
		"float" : ads.supports.cssFloat ? "cssFloat" : "styleFloat"
	};
	ads.fx = function(elem, options, prop) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if(!options.orig)
			options.orig = {};
	};
	ads.fx.prototype = {
		update : function() {(ads.fx.step[this.prop] || ads.fx.step._default)(this);

			if(this.options.step)
				this.options.step.call(this.elem, this.now, this);

		},
		custom : function(from, to, unit) {
			this.startTime = (new Date()).getTime();
			this.start = from;
			this.end = to;
			this.unit = unit;
			// || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;

			var self = this;
			function t(gotoEnd) {
				return self.step(gotoEnd);
			}


			t.elem = this.elem;

			if(t() && ads.timers.push(t) == 1) {
				ads.timerId = setInterval(function() {
					var timers = ads.timers;

					for(var i = 0; i < timers.length; i++)
					if(!timers[i]())
						timers.splice(i--, 1);

					if(!timers.length) {
						clearInterval(ads.timerId);
					}
				}, 50);
			}
		},
		step : function(gotoEnd) {
			var t = (new Date()).getTime();
			if(gotoEnd || t >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();

				this.options.curAnim[this.prop] = true;

				var done = true;
				for(var i in this.options.curAnim)
				if(this.options.curAnim[i] !== true)
					done = false;

				if(done) {
					if(this.options.complete)
						this.options.complete.call(this.elem);
				}
				return false;
			} else {
				var n = t - this.startTime;
				this.state = n / this.options.duration;
				this.pos = this.options.easing(n, 0, 1, this.options.duration);
				this.now = this.start + ((this.end - this.start) * this.pos);
				this.update();
			}
			return true;
		}
	};

	ads.fx.step = {

		opacity : function(fx) {
			ads.setStyle(fx.elem, {
				opacity : fx.now
			});
		},
		_default : function(fx) {
			try {
				if(fx.elem.style && fx.elem.style[fx.prop] != null)
					fx.elem.style[fx.prop] = fx.now + fx.unit;
				else
					fx.elem[fx.prop] = fx.now;
			} catch (e) {
			}
		}
	}
	ads.init();
})(window);
