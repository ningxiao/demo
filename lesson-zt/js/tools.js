/**
 * 具体处理方法
 * @author leju
 */
var Tools = new Object();
Tools.myClick = function(a,b){
	alert("单击事件"+a+"-*-"+b);
}
Tools.myDclick = function(a,b){
    alert("双击事件"+a+"-*-"+b);		
}
Tools.myMOUSE = function(){
	alert("鼠标事件");
}
