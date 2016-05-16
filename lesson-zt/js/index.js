/**
 * @author ningxiao
 */
var util = {	
	getStyle:function(obj, name){
		if(obj.currentStyle){
			return obj.currentStyle[name]||obj.style[name];
		}else{
			return getComputedStyle(obj, document)[name]||obj.style[name];
		}
	},
	startMove:function(obj,json,tiem,fn){
        var tiem = tiem || 30;
        clearInterval(obj.timer);
        obj.isplay = false;
        obj.timer=setInterval(function (){
            obj.isplay = false;
            var attr='';
            var comp=true;
            for(attr in json){
                var iCur=0;
                if(attr=='opacity'){
                    iCur=Math.round(parseFloat(util.getStyle(obj, attr))*100);
                }else{
                    iCur=parseInt(util.getStyle(obj, attr));
                }
                if(iCur!=json[attr]){
                    comp=false;
                }
                var iSpeed=(json[attr]-iCur)/8;
                iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
                if(attr=='opacity'){
                    obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                    obj.style.opacity=(iCur+iSpeed)/100;
                }else{
                    obj.style[attr]=iCur+iSpeed+'px';
                }
            }
            obj.isplay = true;
            if(comp){
                obj.isplay = false;
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        }, tiem);
	},
	outerHeight:function(obj){
		return obj.offsetHeight + parseInt(util.getStyle(obj,"marginBottom")) + parseInt(util.getStyle(obj,"marginTop"));
	},
	outerWidth:function(obj){
		return obj.offsetWidth + parseInt(util.getStyle(obj,"marginLeft")) + parseInt(util.getStyle(obj,"marginRight"));	
	},
	scrollmember:function(json,direction){
		var memberul=json.memberul,marg=json.marg,menulw=json.menulw,rowheight=json.rowheight;
		var myjson = {};
		var parint = Math.abs(parseInt(util.getStyle(memberul,marg)));
		if(direction){
			if(parint>=menulw){
				memberul.style[marg] = "0px";
				parint = 0;
			}
	  		parint = -(parint+rowheight);
	  	}else{
	  		if(parint<=0){
				memberul.style[marg] = -menulw+"px";
				parint = menulw;
			}
	  		parint = -(parint-rowheight);
	  	}
	  	 myjson[marg]= parint;
	  	return myjson;	
	},
	addEvent:function(oTarget,sEventType,fhHandler){
		if(oTarget.attachEvent){
			oTarget.attachEvent('on'+sEventType,function(){
				fhHandler.apply(oTarget, arguments);
			});
		}else if(oTarget.addEventListener){
			oTarget.addEventListener(sEventType,fhHandler,false);
		}else{
			oTarget['on'+sEventType] = fhHandler;
		}
	},
	getTarget:function(event){//取得事件源对象
		event = event || window.event;
		return event.target || event.srcElement;
	},
	contains:function(p,c){
		return p.contains?p!=c&&p.contains(c):!!(p.compareDocumentPosition(c)&16);
	},
	fixedMouse:function(e,target){
        var related,type=e.type.toLowerCase();//这里获取事件名字
        if(type=='mouseover'){
            related=e.relatedTarget||e.fromElement
        }else if(type='mouseout'){
            related=e.relatedTarget||e.toElement
        }else return true;
        return related && related.prefix!='xul' && !util.contains(target,related) && related!==target;		
	},	
	main:function(a,b,c,d,e,f,g){
	  var rowheight,memberdiv = document.getElementById(a),memberul = document.getElementById(b);
	  var memberli = memberul.getElementsByTagName(c),move = false;
	    if(memberli.length>=g*f){
            memberul.innerHTML += memberul.innerHTML;
            memberli = memberul.getElementsByTagName(c);	
            move = true;	    	
	    }
	  if(e=="marginTop"){
	  	  rowheight = util.outerHeight(memberli[0]);
	  	}else{
	  	  rowheight = util.outerWidth(memberli[0]);
	  	}
	  var menulw = Math.ceil(memberli.length/f) * rowheight  - rowheight*d;
	  return {"memberdiv":memberdiv,"memberul":memberul,"menulw":menulw,"rowheight":rowheight,"marg":e,"move":move} ;	  	
	}
};
/**取得样式*/			
function getStyle(obj, name){
	if(obj.currentStyle){
		return obj.currentStyle[name]||obj.style[name];
	}else{
		return getComputedStyle(obj, document)[name]||obj.style[name];
	}
}
/**缓动公共方法*/
function startMove(obj, json,tiem,fn){
	var tiem = tiem || 30;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var attr='';
		var comp=true;
		for(attr in json){
			var iCur=0;
			if(attr=='opacity'){
				iCur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}else{
				iCur=parseInt(getStyle(obj, attr));
			}
			if(iCur!=json[attr]){
				comp=false;
			}
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		if(comp){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	}, tiem);
}
function ShowUl(showimg,showimgp,showul){
	var i=0;
	var len = 0;
	var imgw = parseInt(showimgp[0].offsetWidth);
	var itmes = null;
	for(i;i<showul.length;i++){
		showul[i].index = i;
		showul[i].onmouseover = function(){
			clearTimeout(itmes);
			if(len!=this.index){
				showul[len].className = '';
			}else{
				showul[this.index].className = 'select';
			}
			startMove(showimg,{'marginLeft':-imgw*this.index});
		}
		showul[i].onmouseout = function(){
			len = this.index;
			showul[len].className = 'select';
			itmes = window.setTimeout(leftimg,4000);
		}
	};
	itmes = window.setTimeout(leftimg,4000);
	function leftimg(){
		clearTimeout(itmes);
		showul[len].className = '';
		len++;
		if(len>showul.length-1){
			len = 0;
		}
		showul[len].className = 'select';
		startMove(showimg,{'marginLeft':-imgw*showul[len].index});
		itmes = window.setTimeout(leftimg,4000);
	}
}
