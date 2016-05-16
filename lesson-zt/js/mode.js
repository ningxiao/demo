/**
 * @author ningxiao
 */
var Mode = new Object();
Mode.eventList = new Object();
/**
 * 注册自定义事件统一派发和处理
 */
Mode.addEvent = function(type,fun){
	if(Mode.eventList.hasOwnProperty(type)){
		Mode.eventList[type].push(fun);
	}else{
		Mode.eventList[type]=[fun];
	}
}
/***
 * 派发已经注册的事件
 */
Mode.dispatchEvent=function(type,arg){
	if(Mode.eventList.hasOwnProperty(type)){
		var funlist = Mode.eventList[type];
		var i =0;
		for(i in funlist){
			funlist[i].apply(this,arg);
		}
	}else{
		alert("没有注册事件");
	}	
}
/***
 * 删除自定义事件
 */
Mode.delEvent = function(type){
	delete Mode.eventList[type];
}
