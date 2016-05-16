/**
 * 具体处理方法
 * @author leju
 */
var Tools = {
	getdata:function(key){
		var data = this.getdata(key);
		View.addView(data);
	},setdata:function(key,val){
		this.setdata(key,val);
		View.addView(this.getdata(key));
	}
};

