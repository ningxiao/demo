var Controller = {
	eventList:new Object(),
	addEvent:function(ev,fun){
		if(this.eventList.hasOwnProperty(ev)){
			this.eventList[ev].push(fun);
		}else{
			this.eventList[ev] = [fun];
		}
		return this;
	},dispatchEvent:function(){
		var i,l,arges = Array.prototype.slice.call(arguments,0),ev = arges.shift();
		if(!(this.eventList.hasOwnProperty(ev))){
		   alert("没有注册事件,无法执行");	
		   return this;
		};
		var funlist = this.eventList[ev];
		for(i=0,l=funlist.length;i<l;i++){
			funlist[i].apply(this,arges);
		}
	}
};