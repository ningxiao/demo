/**
 * @author ningxiao
 */
	function Mode(key){
	   this.modedata = {};
	   this.dataType = key;
	   this.init.call(this,key);
	};
	Mode.prototype = {
		add:function(data){
			var dataid = parseInt(Math.random()*1000);
			this.modedata[dataid] = data;
			return dataid;
		},update:function(id,data){
			if(arguments.length<1){
				return "参数不符合";
		}else{
			this.modedata[dataid] = data;
		};
	},deldata:function(id){
		if(id){
			if(this.select(id)==null){
				return alert("数据ID不存在");
			};
			delete this.modedata[id];
			console.log(Mode.prototype,this.modedata);
		}else{							
			this.modedata[id] = (this.modedata[id].constructor === Array) ? [] : {};						
		};					
	},select:function(id){
		if(id){
			 return this.modedata[id] || null;
		}else{
		  return Util.deepCopy(this.modedata);						
		};
	},init:function(key){
		this.dataList[key] = this.modedata;
	},dataList:new Object()
 };	
