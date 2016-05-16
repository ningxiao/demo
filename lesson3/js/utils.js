/**
 * 工具类
 * User: ningxiao
 * Date: 2013-10-29 10:26
 */
var utils = {
    prefixes: ["", "-ms-", "-moz-", "-webkit-", "-o-"],
    pfx: ["", "MS", "moz", "webkit", "o"],
    cssMap:{},
    getStyle: function (obj, name) {
        if(obj.currentStyle){
            this.getStyle = function(obj, name){
                return obj.currentStyle[this.cssName(name)];              
            }
        }else{
            this.getStyle = function(obj, name){
                return document.defaultView.getComputedStyle(obj, null)[this.cssName(name)];              
            }            
        }
        return this.getStyle(obj, name);
    },
    upperCase: function ($0, $1) {
        return $1.toUpperCase();
    },
    cssName: function (name) {
        var target = document.documentElement.style,test,css;
        for (var i = 0, l = this.prefixes.length; i < l; i++) {
            css = this.prefixes[i];
            test = (css + name).replace(/-([a-z])/g, this.upperCase);
            if (test in target) {
                this.cssName = function(name){
                    test = this.cssMap[name];
                    if(!test){
                        this.cssMap[name] = test = (name in target)?name:(css + name).replace(/-([a-z])/g, this.upperCase);
                    }            
                    return test;                 
                }
                return test;
            }
        }
        return null;
    },
    setStyle: function (obj, json) {
        for (var i in json) {
            obj.style[this.cssName(i)] = json[i];
        }
    },
    prefixedEvent: function (element, type, callback) {
        var type_s;
        for (var p = 0; p < this.pfx.length; p++) {
            type_s = type;
            if (!this.pfx[p]) {
                type_s = type.toLowerCase();
            }
            element.addEventListener(this.pfx[p] + type_s, callback, false);
        }
    }
}