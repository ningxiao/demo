(function(){
	var name = "";
	Person = function(value){
		this.thname = value;//私有变量因为它作用域为Person对象里面，所以只要有新建实例就会保存
		name = value;
	}
	/**prototype指向原型数据所以只有一个对象当创建新的实例对象的时候会动态改变*/
	Person.prototype.getName=function(){
		return name;
	}
	Person.prototype.setName=function(value){
		name = value;
	}
	
})()
