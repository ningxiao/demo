/**
 * 视图处理方法
 * @author leju
 */
var View = {
	addView:function(data){
		var h6 = "",div = document.getElementById("datadiv");
		if(div == null){
         div = document.createElement("div");
         div.id = "datadiv";
         document.body.appendChild(div);			
		}
		for(var i in data){
			h6 += "<h6>"+data[i].name +"---" + data[i].sex+"</h6>";	
		};
		div.innerHTML = h6; 
	}
};