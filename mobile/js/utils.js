/**
 * @class: baofeng 暴风云视频工具类
 * @author: ningxiao
 * @version: 1.1
 * @namespace: baofeng.utils
 */
var baofeng = {}; 
baofeng.utils = {
    xmlHttp: null,
    prefixes: ["", "-ms-", "-moz-", "-webkit-", "-o-"],
    pfx: ["", "MS", "moz", "webkit", "o"],
    pfxfil:['transform'],
    pfxname:null,
    cssMap:{},   
    createXMLHttpRequest: function () {
        if (window.ActiveXObject) {
            this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            this.xmlHttp = new XMLHttpRequest();
        }
    },
    createURL: function (url, callback) {
        var type = url.indexOf(".xml") != -1, data;
        this.createXMLHttpRequest();
        this.xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    if (callback) {
                        if (type) {
                            data = this.responseXML;
                        } else {
                            data = eval('(' + this.responseText + ')');
                        }
                        callback(data);
                    }
                }
            }
        }
        this.xmlHttp.open("GET", url, "true");
        this.xmlHttp.send(null);
    },
    provide: function (str) {  //创建空间
        var spas = str.split('.'), space = window, obj = null;
        for (var i = 0, len = spas.length; i < len; i++) {
            if (space[spas[i]]) {
                space = space[spas[i]];
            } else {
                space = space[spas[i]] = new Object();
            }
        }
    },
    require:function(){

    },
    loadScript:function(src,success){
        var script,head= document.getElementsByTagName('head')[0];  
        script= document.createElement('script');  
        script.type= 'text/javascript';  
        script.onload = script.onreadystatechange = function() {  
            if (!this.readyState || this.readyState === "loaded" ||    this.readyState === "complete" ) {   
                script.onload = script.onreadystatechange = null;  
                success();
            } 
        };  
        script.src= src;  
        head.appendChild(script);  
    },
    debug:function(deps,namespace,runfun){
        var walk,unique,loadin,loadlen,loadwalk,data,depslist;
        unique = function(arr){
            var n = {},r=[]; //n为hash表，r为临时数组
            for(var i = 0; i < arr.length; i++){//遍历当前数组
                if (!n[arr[i]]){ //如果hash表中没有当前项
                    n[arr[i]] = true; //存入hash表
                    r.push(arr[i]); //把当前数组的当前项push到临时数组里面
                }
            }
            return r;
        };   
        walk = function(namespace){ 
          var obj = data[namespace],src =  obj[0],list = obj[1];
          if(list.length !=0){
              for(var i= 0, length = list.length; i<length; i++){
                walk(list[i]);
              }
          }
          depslist.push(src)
        };
        loadwalk = function(){
            baofeng.utils.loadScript(depslist[loadin],function(){
                loadin++;
                if(loadin<loadlen){
                    loadwalk(); 
                }else{
                   runfun && runfun(); 
                }              
            });
        };  
        baofeng.utils.createURL(deps,function(json){
            data = json;
            depslist = [];
            if(!(namespace in data)){
                depslist = null;
            }
            if(depslist){
                walk(namespace);
                depslist = unique(depslist);
                loadlen = depslist.length;    
                loadin = 0;            
            }            
            depslist && loadwalk();                     
        });        
    },
    bind: function (fn, selfObj) { //修改指定函数作用域
        if (fn.bind) {
            return fn.bind(selfObj);
        } else {
            return function () {
                fn.apply(selfObj, arguments);
            }
        }
    },
    charlen:function(str){
        return str?str.replace(/[^\x00-\xff]/g,"xx").length:0;  
    },
    inherits: function (child, parent) { //继承
        child.prototype = new parent();
        child.prototype.constructor = child;
    },
    analyzetpl: function(str, data) {
        if(data){
            return str.replace(/\{(.*?)\}/ig, function() {
                var arr;
                if(arguments[1].indexOf(".")!=-1){
                    arr = arguments[1].split(".");
                    return data[arr[0]][arr[1]] || "";
                }
                return data[arguments[1]] || "";
            });
        }
        return str;
    },
    sizechange:function(data){
        data = data/(1024*1024);
        if(parseInt(data)>0){
            return data.toFixed(1)+"MB";
        }else{
            return data.toFixed(2)+"MB";
        }
    },
    locationjson:function(str,key){
        var data,arr,json;
        if(str){
            json = {};
            data = str.split("&");
            for(var i=0,l=data.length;i<l;i++){
                arr = data[i].split("=");
                json[arr[0]] = arr[1];
            }            
        }
        if(json){
            if(key && key in json){
                return json[key];
            }
           return json; 
        }
        return null;
    },
    getType: function (obj) {//取得对象的类型
        return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
    },
    ajax:function(url,data,success,error,header,timeout){
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            xhr.onreadystatechange = function(event) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 308) {
                        success(xhr.responseText);
                    }
                }
            }
            xhr.upload.onerror = xhr.upload.ontimeout = error;          
            xhr.timeout = timeout || 3000;
            xhr.withCredentials = false;
            xhr.open("POST",url,true);
            if(header){
                for(var key in header){
                    xhr.setRequestHeader(key,header[key]);
                }                
            }
            xhr.send(data || null);    
        }
    },
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
            this.pfxname = css = this.prefixes[i];
            test = (css + name).replace(/-([a-z])/g, this.upperCase);
            if (test in target) {
                this.cssName = function(name){
                    test = this.cssMap[name];
                    if(!test){
                        if(name in target){
                            this.cssMap[name] = test = name;
                        }else{
                            this.cssMap[name] = test = (css + name).replace(/-([a-z])/g, this.upperCase);
                        }
                    }            
                    return test;                 
                }
                return test;
            }
        }
        return null;
    },
    setStyle: function (obj, json) {
        var str,name;
        for (var i in json) {
            str = json[i];
            if(this.pfxname){
                for(var k=0,l=this.pfxfil.length;k<l;k++){
                    name = this.pfxfil[k];
                    if(str.indexOf(name)!=-1){
                       str = str.replace(name,this.pfxname+name);
                       break;
                    }
                }
            }
            obj.style[this.cssName(i)] = str;
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
    },
    getObjectById:function(id) {
        var swf,embed,element = document.getElementById(id) || null;
        if (element && element.nodeName.toUpperCase() == 'OBJECT') {
                if (typeof element.SetVariable != 'undefined') {
                    swf = element;
                }
                else {
                    embed = element.getElementsByTagName('object')[0];
                    if (embed) {
                        swf = embed;
                    }
                }
        }
        return swf;
    },
    setCookie: function(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
    },
    getCookie: function(c_name){
        var c_start,c_end;
        if(document.cookie.length > 0){
            c_start=document.cookie.indexOf(c_name + "=");
            if(c_start!=-1){ 
                c_start=c_start + c_name.length+1; 
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1){
                    c_end=document.cookie.length
                };
                return unescape(document.cookie.substring(c_start,c_end));
            } 
        }
        return "";
    },
    removeCookie: function(c_name){
        this.setCookie(c_name,'',-1);
    }
}