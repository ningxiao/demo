/**
 * 具体处理方法
 * @author leju
 */
var AMode = new Mode("AMode");
var Tools = {
	getdata:function(){
		var data = AMode.select();
		View.addView(data);
	},setdata:function(val){
		AMode.add(val);
		View.addView(AMode.select());
	}
};
