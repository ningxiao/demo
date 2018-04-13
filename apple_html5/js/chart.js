/*********************************************************************************
 * chart.js
 * 图表案例
 *
 * @version: 1.1
 * @author: 363305175@qq.com
 * @namespace: chart
 *********************************************************************************/

//对所有绘制点的坐标，鼠标滑过添加事件；并绘制弹框，显示相应坐标的信息。
var draw_model = {
	get_dt:{
		"0":"weeks",
		"1":"months",
		"2":"years"
	},
	oCanvas:null,
	oPainter:null,
	default_dt:[],
	iTab:0,
	init:function(){
		//设计数据格式
		var	json = {
					years:{
						x:["2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"],
						y:[0,200000,400000,600000,800000,1000000],
						points:[
							{year:"2013",flow:"0.00"},
							{year:"2014",flow:"57477.31"},
							{year:"2015",flow:"537074.88"},
							{year:"2016",flow:"917361.11"}
						]
					},
					months:{
						x:["9月","10月","11月","12月","1月","2月","3月","4月","5月","6月"],
						y:[360000,480000,600000,720000,840000,960000,1080000],
						points:[
							{year:"2015",month:"9月",flow:"412750.24"},
							{year:"2015",month:"10月",flow:"444049.20"},
							{year:"2015",month:"11月",flow:"483031.78"},
							{year:"2015",month:"12月",flow:"537074.88"},
							{year:"2016",month:"1月",flow:"588571.68"},
							{year:"2016",month:"2月",flow:"604838.18"},
							{year:"2016",month:"3月",flow:"887516.53"},
							{year:"2016",month:"4月",flow:"917361.11"},
							{year:"2016",month:"5月",flow:"917361.11"},
							{year:"2016",month:"6月",flow:"917361.11"}
						]
					},
					weeks:{
						x:["第一周","第二周","第三周","第四周","第五周","第六周","第七周","第八周","第九周","第十周"],
						y:[900000,904000,908000,912000,916000,920000],
						points:[
							{year:"2016",month:"4月",week:"第3周",flow:"902608.53"},
							{year:"2016",month:"4月",week:"第4周",flow:"909989.83"},
							{year:"2016",month:"4月",week:"第5周",flow:"917361.11"},
							{year:"2016",month:"5月",week:"第1周",flow:"917361.11"},
							{year:"2016",month:"5月",week:"第2周",flow:"917361.11"},
							{year:"2016",month:"5月",week:"第3周",flow:"917361.11"},
							{year:"2016",month:"5月",week:"第4周",flow:"917361.11"},
							{year:"2016",month:"6月",week:"第1周",flow:"917361.11"},
							{year:"2016",month:"6月",week:"第2周",flow:"917361.11"},
							{year:"2016",month:"6月",week:"第3周",flow:"917361.11"}
						]
					}
			};

		var _this = this,         //定义this指向。
			oCanvas = document.getElementById("canvas"),  //找到画布
			oPointer = oCanvas.getContext("2d");          //并创建绘制接口对象

		//初始化--------------------------------------------------------
		//存储画布
		this.oCanvas = oCanvas;
		//存储绘制对象
		this.oPainter = oPointer;

		//记录当前处于哪个类型上年？月？周？
		this.iTab = $("input:checked").parent().index();
		
		//处理相关数据，划分为各自相应的坐标
		this.deal_dt(json,this.iTab);

		//tab切换(周、月、年)------------------------------------------
		$("#check_t li").click(function(){
			var oCur_input = $(this).find("input")[0];
			$(this).parents("ul").find("input").each(function(){
				if(this==oCur_input){
					this.checked = true;
				}else{
					this.checked = false;
				}
			});
			//设置当前为哪个类型
			_this.iTab = $(this).index();
			//处理相关数据，划分为各自相应的坐标
			_this.deal_dt(json,_this.iTab);
		});
		//鼠标划出画布。
		oCanvas.onmouseout = function(){
			_this.deal_dt(json,_this.iTab);
		};
		//在画布上移动，模拟点的滑入事件。
		oCanvas.onmousemove = function(ev){
			var ev = ev || window.event,
				iL = ev.pageX-_this.oCanvas.offsetLeft,
				iT = ev.pageY-_this.oCanvas.offsetTop,
				aCur_points = _this.default_dt[_this.iTab].cirs_arr;  //取某个类型上相应的数据（某个类型所有点）
			//找出最近点
			_this.close_point(aCur_points,this,ev,function(cur_arr){
				//碰撞检测
				 var isEnter = _this.trigger_event({
					 	cir_x:cur_arr.x,
					 	cir_y:cur_arr.y,
					 	cur_x:iL,
					 	cur_y:iT,
					 	cir_r:5
			     });
				 //如果鼠标移入该点
				 if(isEnter=="enter"){
				 	 _this.deal_dt(json,_this.iTab,function(){
						 draw_unit.cir_hover(_this.oPainter,cur_arr);
				 	 });
				 }else{
				 	//鼠标移出该点。
				 	_this.deal_dt(json,_this.iTab);
					
				 }
			});
		};
	},
	//解析数据，并绘制。
	deal_dt:function(json,n,callback){
		//周 月 年 tab切换，这里暂时先默认为0，表示周。
		var itab = n || 0;		
		//处理数据
		if(!this.default_dt[n] || this.default_dt[n].length==0){
			//匹配数据（x轴上的文本坐标，y轴上的文本坐标，以及背景上的矩形方块绘制坐标，所有点的横纵坐标数据匹配。）
			//（1）x轴上的文本坐标-----计算数据
			var arr_x = draw_translate_dt.deal_dt_x(json[this.get_dt[itab]].x,this.oCanvas);  
			
			//（2）y轴上的文本坐标-----计算数据
			var arr_y = draw_translate_dt.deal_dt_y(json[this.get_dt[itab]].y); 
		
			//（3）获取背景色块的坐标-----计算数据
			var back_arr = draw_translate_dt.deal_back_dt(arr_x,arr_y,this.oCanvas); 
		
			// (4) 取所有点上的横纵坐标，以及相应的text值拼凑-----计算数据
			var cirs_arr = draw_translate_dt.deal_allCir_dt(arr_x,arr_y,json[this.get_dt[itab]],this.get_dt[itab],this.oCanvas);

			//存储所有的数据
			this.default_dt[n] = {
				arr_x:arr_x,
				arr_y:arr_y,
				back_arr:back_arr,
				cirs_arr:cirs_arr
			}
		}

		//如果存在数据的话，那么不必再去解析数据，只需绘制。
			
		//清除画布。
		this.oPainter.clearRect(0,0,this.oCanvas.offsetWidth,this.oCanvas.offsetHeight);
		
		//（1）绘制 x轴上的文本坐标
		draw_unit.x_dt(this.oPainter,this.default_dt[n].arr_x);  

		//（2）绘制 y轴上的文本坐标
		draw_unit.y_dt(this.oPainter,this.default_dt[n].arr_y);   

		//（3）获取背景色块的坐标
		draw_unit.back_rect(this.oPainter,this.default_dt[n].back_arr); //绘制

		// (4) 取所有点上的横纵坐标，以及相应的text值拼凑。
		draw_unit.all_cirs(this.oPainter,this.default_dt[n].cirs_arr);	 //绘制点
		draw_unit.default_line(this.oPainter,this.default_dt[n].cirs_arr);  //绘制线
		//回调
		callback && callback();
	},
	//鼠标在画布上移动，找出最近点，并返回该点的数据
	close_point:function(aPoints,obj,ev,callback){
		//存储点的数据
		var aStance = [],
			aStance_key = {};

		//鼠标在画布上的横纵坐标
		var	iL = ev.pageX-obj.offsetLeft,
			iT = ev.pageY-obj.offsetTop;
		for(var i=0;i<aPoints.length;i++){
			(function(cur_arr,index){
				var cir_x = cur_arr.x,
					cir_y = cur_arr.y,
					iDistance = Math.sqrt((cir_x-iL)*(cir_x-iL)+(cir_y-iT)*(cir_y-iT));
				aStance_key[iDistance]=index;
				aStance.push(iDistance);
			})(aPoints[i],i);
		}

		//对存储的数据进行排列
		aStance.sort(function(n1,n2){
			return n1-n2;
		});
		//将离鼠标最近的点的数据返回
		callback && callback(aPoints[aStance_key[aStance[0]]]);

	},
	//碰撞检测（判断点与点之间的）
	trigger_event:function(json){
		//确定的某点
		var iCir_x = json.cir_x || 0;
		var iCir_y = json.cir_y || 0;
		//当前鼠标在画布上的位置
		var iCur_x = json.cur_x || 0;
		var iCur_y = json.cur_y || 0;

		//原点的半径
		var R = json.cir_r || 0; 

		if(iCir_x==0 || iCir_y==0)return "move";

		if(R==0) return "move";

		//碰撞检测，进行计算----------------------------------------
		//计算两点之间的距离：
    	var iStance = Math.sqrt((iCur_x-iCir_x)*(iCur_x-iCir_x)+(iCur_y-iCir_y)*(iCur_y-iCir_y));

		//表示鼠标滑入某一点
		if(iStance<R || iStance==R){
			return "enter";
		}else{
		//表示鼠标滑出某一点
			return "out";
		}
	}
};


//解析数据-------------------------------------------------------------------------------------------------
var draw_translate_dt = {
	origin_x:95,                 //坐标轴原点横坐标
	origin_y:197,                //坐标轴原点纵坐标
	iRight:20,                   //图表距离画布右端的距离
	iTop:15,                     //图表距离画布顶端的距离
	iLeft:10,                    //图表距离画布左端的距离
	space:2,                     //背景方块之间的间距
	back_w:0,                    //背景方块的宽度
	back_h:0,                    //背景方块的高度
	r:10,                        //点滑过的状态，半径为10
	shdow_r:8,                   //弹框阴影大小，需记录，需要计算弹框位置所在，要将阴影包含在内。
	//获取x轴的文本坐标,第一个参数表示x轴上的文本数据；第二个参数表示canvas DOM元素
	deal_dt_x:function(data,obj){
		var _this = this,
			arr = [];  //[{x:"",y:"",text:""}]
		for(var i=0;i<data.length;i++){
			(function(index){
					arr.push({
						x:_this.origin_x+parseInt(((obj.offsetWidth-_this.origin_x-_this.iRight)/data.length)*index),
						y:_this.origin_y,
						text:data[index]
					});
			})(i);
		}
		return arr;
	},
	//获取y轴上的文本坐标。
	deal_dt_y:function(data,obj){
		var _this = this,
			arr = [];           //{x:"",y:"",text:""}
		for(var w=0;w<data.length;w++){
			(function(index){
				arr.push({
					x:_this.iLeft,
					y:_this.origin_y-parseInt((_this.origin_y-_this.iTop)/data.length*index),
					text:data[index]
				});
			})(w);
		}
		return arr;
	},
	//处理背景方块的位置。y轴决定列，x轴决定行。（本次处理数据的逻辑是，循环列，处理行，得到每个色块的背景色。）
	deal_back_dt:function(x_dt,y_dt,obj){
		var _this = this;
		var arr = [];   //{x:,y:};
		var back_w = parseInt((obj.offsetWidth-_this.origin_x-_this.iRight)/x_dt.length-_this.space);  //计算方块的宽度。
		var back_h = parseInt((_this.origin_y-_this.iTop)/y_dt.length);                    //计算方块的高度。

		//存储方块的宽度和高度。
		this.back_w = back_w;
		this.back_h = back_h;
		
		for(var i=1;i<y_dt.length;i++){
			(function(index){
				for(var w=0;w<x_dt.length;w++){
					var iX = x_dt[w].x,
						iY = y_dt[index].y-_this.space*index;
					arr.push({
						x:iX,
						y:iY,
						w:back_w,
						h:back_h
					});
				}
			})(i);
		}
		return arr;
	},
	//处理所有点的数据。（得到这些数据：点的横纵坐标、文本的横纵坐标、弹框的上的所有连接点坐标、点相应的弹框信息展示）
	//参数说明：x_dt:表示x轴上文本的坐标；y_dt:表示y轴上文本的坐标；aCirs: 表示所有点的数据；type表示：当前数据为年？月？日类型？; obj表示画布
	deal_allCir_dt:function(x_dt,y_dt,all_dt,type,obj){

		var _this = this;      
		var aCirs = all_dt.points;   //所有点的相关信息
		var y_text_dt = all_dt.y;    //y轴的文本数据
		var arr = [];    //{x:,y:,text:,text_x:,text_y:,line:[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x5,y5],[x6,y6],[x7,y7]]}
		var tkBox_w = 155;    //弹框的宽度
		var tkBox_h = 60;     //弹框的高度
		var sType = type || "";   //当前属于哪类？ 年 ？ 月 ？ 日？
		var y_middle = Number(y_text_dt[y_text_dt.length-1]-y_text_dt[0]);

		if(sType=="")return false;

		for(var i=0;i<aCirs.length;i++){
			(function(key,index){
				 
				 var iPercent = (Number(key.flow)-y_text_dt[0])/y_middle;
				 //点的横纵坐标
				 var iCir_left = x_dt[index].x+_this.back_w/2;
	             var iCir_top = parseInt(Number(y_dt[0].y)-(Number(y_dt[0].y)-_this.iTop-_this.space*y_dt.length)*iPercent);
				 
				 //处理点的纵坐标问题-----
				 var aPer_arr = [];
				 //存储所有行的百分比
	             for(var q=0;q<y_dt.length;q++){
	             	(function(iPer,index){
	             		aPer_arr.push([iPer,index-1]);
	             	})(q/(y_dt.length-1),q);
	             }
	             //根据行的百分比，决定当前的百分比加多少间距差来求值。
	             for(var a=0;a<aPer_arr.length;a++){
	             	if(iPercent<aPer_arr[a][0] || iPercent==aPer_arr[a][0]){
	             		iCir_top+=_this.space*a;
	             		break;
	             	}
	             }


				 //如果弹框的顶端位置距离画布小于5px，那么让画布居于点的下面；反之居于点的上面。(信息弹框点的查询，起始点从左上角的点开始。)
				 if(iCir_top-tkBox_h-_this.r<5){
				 	//弹框在点的下面

					 //文本的横纵坐标。
					 var text_left = iCir_left - parseInt(tkBox_w/2)+10;
					 var text_top = iCir_top + _this.r*3;

					 //计算信息弹框的所有点的坐标
					 var cir_one = [iCir_left-parseInt(tkBox_w/2),iCir_top+_this.r*2];        					//左上角
					 var cir_two = [iCir_left-_this.r,iCir_top+(_this.r*2)];            						//尖角的左边点
					 var cir_three = [iCir_left,iCir_top+(_this.r)];            			 					//尖角的中间点
					 var cir_four = [iCir_left+_this.r,iCir_top+(_this.r*2)];             						//尖角的右边点  
					 var cir_five = [iCir_left+parseInt(tkBox_w/2),iCir_top+(_this.r*2)];         				//右上角
					 var cir_six = [iCir_left+parseInt(tkBox_w/2),iCir_top+(_this.r+tkBox_h)];            //右下角
					 var cir_seven = [iCir_left-parseInt(tkBox_w/2),iCir_top+(_this.r+tkBox_h)];          //左下角	


					 //确保弹框位置必须在画布内（检测，如果不在画布内，那么需要重新设置弹框的点，让它在画布内，最多只能到画布的右边去，不能超出。）
					 var iLast_w = (obj.offsetWidth-iCir_left-_this.shdow_r)-parseInt(tkBox_w/2);
					 //若已超出画布
					 if(iLast_w<0){					 	
					 	cir_one[0] = obj.offsetWidth-tkBox_w-_this.shdow_r;
					 	cir_five[0] = obj.offsetWidth-_this.shdow_r;
					 	cir_six[0] = obj.offsetWidth-_this.shdow_r;
					 	cir_seven[0] = obj.offsetWidth-tkBox_w-_this.shdow_r;
					 	text_left = obj.offsetWidth-tkBox_w+10;
					 }
				 }else{
				 	//弹框在点的上面
					 //文本的横纵坐标。
					 var text_left = iCir_left - parseInt(tkBox_w/2)+10;
					 var text_top = iCir_top - tkBox_h;

					 //计算信息弹框的所有点的坐标
					 var cir_one = [iCir_left-parseInt(tkBox_w/2),iCir_top-(tkBox_h+_this.r)];        //左上角
					 var cir_two = [iCir_left+parseInt(tkBox_w/2),iCir_top-(tkBox_h+_this.r)];        //右上角
					 var cir_three = [iCir_left+parseInt(tkBox_w/2),iCir_top-(_this.r*2)];            //右下角
					 var cir_four = [iCir_left+_this.r,iCir_top-(_this.r*2)];            			  //尖角的右边点
					 var cir_five = [iCir_left,iCir_top-(_this.r)];            						  //尖角的中间点
					 var cir_six = [iCir_left-_this.r,iCir_top-(_this.r*2)];            			  //尖角的左边点
					 var cir_seven = [iCir_left-parseInt(tkBox_w/2),iCir_top-(_this.r*2)];            //左下角
					 //确保弹框位置必须在画布内（检测，如果不在画布内，那么需要重新设置弹框的点，让它在画布内，最多只能到画布的右边去，不能超出。）
					 var iLast_w = (obj.offsetWidth-iCir_left-_this.shdow_r)-parseInt(tkBox_w/2);
					 //若已超出画布
					 if(iLast_w<0){			 	
					 	cir_one[0] = obj.offsetWidth-tkBox_w-_this.shdow_r;   //左上角
					 	cir_two[0] = obj.offsetWidth-_this.shdow_r;          //右上角
					 	cir_three[0] = obj.offsetWidth-_this.shdow_r;           //右下角
					 	cir_seven[0] = obj.offsetWidth-tkBox_w-_this.shdow_r;   //左下角
					 	text_left = obj.offsetWidth-tkBox_w+10;               //文本的横坐标
					 }
				 }
				 //点上的相关信息拼凑
				 switch(sType){
				 	case "weeks":
				 		var text_one = key.year+"年"+key.month+"月"+key.week;
				 		var text_two = "累计流量："+key.flow+"万";
				 	break;
				 	case "months":
				 		var text_one = key.year+"年"+key.month+"月";
  		 		    	var text_two = "累计流量："+key.flow+"万";
				 	break;
				 	case "years":
				 		var text_one = key.year+"年";
				 		var text_two = "累计流量："+key.flow+"万";
				 	break;
				 }
				 //弹框上的所有点的坐标设置。
				  arr.push({
				  	x:iCir_left,
				  	y:iCir_top,
				  	text_x:text_left,
				  	text_y:text_top,
				  	line:[cir_one,cir_two,cir_three,cir_four,cir_five,cir_six,cir_seven],
				  	text_t:text_one,
				  	text_detail:text_two
				  });
			})(aCirs[i],i);
		}
		return arr;   //返回计算的数据。
	}
};



//绘制x轴和y轴以及背景方块分割（依据本公司需求的样子来修改,绘制所有小单元的数据。）--------------------
var draw_unit = {
	//绘制x轴的文本值
	x_dt:function(obj,arr){
		for(var w=0;w<arr.length;w++){
			(function(key,index){
				draw_basic.text({
					oPainter: obj,       //获取绘制接口对象
					font_size:10,        //字体大小
					//font_color:"red",    //字体颜色
					point:[key.x,key.y],   //字体的位置
					text:key.text,         //设置文字
					align:"left"           //对齐方式
				});
			})(arr[w],w);
		}
	},
	//绘制y轴的文本值
	y_dt:function(obj,arr){
		for(var w=0;w<arr.length;w++){
			(function(key){
				draw_basic.text({
					oPainter: obj,       //获取绘制接口对象
					font_size:12,        //字体大小
					//font_color:"red",  //字体颜色
					point:[key.x+75,key.y-15], //字体的位置
					text:key.text+"万",      //设置文字
					align:"right"           //对齐方式
				});
			})(arr[w]);
		}
	},
	//绘制背景的方块
	back_rect:function(obj,arr){
		for(var i=0;i<arr.length;i++){
			(function(key){
				draw_basic.rect({
					iL:key.x,     //矩形的左上角顶点在画布上的横坐标,
					iT:key.y,	   //矩形的左上角顶点在画布上的纵坐标,
					rect_w:key.w,  //矩形的宽度
					rect_h:key.h,  //矩形的高度
					//fillColor:"red",//矩形填充的颜色
					opainter:obj,
					rect_btn:true
				});
			})(arr[i]);
		}
	},
	//绘制所有的点(默认状态的样子)
	all_cirs:function(obj,arr){
		for(var i=0;i<arr.length;i++){
			(function(key){
				draw_basic.circle({
					oPointer:obj,        //获取绘制接口对象。
					point:[key.x,key.y],  //获取绘制圆的圆心。
					R:4,		          //获取圆的半径
					cir_color:"#7CB5EC",  //获取圆的填充颜色，默认为蓝色。
					arcbtn:true           //填充圆的背景色
				});
			})(arr[i]);
		}
	},
	default_line:function(obj,arr){
		//提取当前所有点的坐标
		var aPoints = [];
		for(var i=0;i<arr.length;i++){
			(function(key){
				aPoints.push([key.x,key.y])
			})(arr[i]);
		}
		//绘制线
		draw_basic.line({
			oPinter:obj, //获取绘制接口对象。
			points:aPoints  //获取所有的点的数据。
		});
	},
	//绘制---点滑过的状态（相应的弹框信息，以及点选中的状态）
	cir_hover:function(obj,json){	

		//绘制弹框面以及阴影	
		draw_basic.line({
			oPinter:obj, 	  				//获取绘制接口对象。
			shadow_btn:true,                 //可以绘制阴影
			fill_btn:true,					 //可以填充背景色
			shadow_x:3,						  //阴影x轴上的偏移
			shadow_y:3,                       //阴影y轴上的偏移
			shadow_color:"rgba(0,0,0,0.1)",   //阴影颜色
			points:json.line,  				 //获取所有的点的数据。
			fill_btn:true,
			fillColor:"rgba(255,255,255,0.8)"
		});
		
		//绘制弹框线
		draw_basic.line({
			oPinter:obj, 	  //获取绘制接口对象。
			points:json.line,  //获取所有的点的数据。
			lineWidth:1,
			close_btn:true     //确定线闭合
		});
		
		//绘制弹框文本
		//标题
		draw_basic.text({
			oPainter: obj,       //获取绘制接口对象
			font_size:12,        //字体大小
			point:[json.text_x,json.text_y], //字体的位置
			text:json.text_t,      //设置文字
			align:"left"           //对齐方式
		});

		//详情
		draw_basic.text({
			oPainter: obj,       //获取绘制接口对象
			font_size:12,        //字体大小
			point:[json.text_x,json.text_y+20], //字体的位置
			text:json.text_detail,    //设置文字
			align:"left"           	  //对齐方式
		});

		//绘制点选中状态-------------------------
		//先画背景，后画圆圈以及模糊度。
		//背景
		draw_basic.circle({
			oPointer:obj,        //获取绘制接口对象。
			point:[json.x,json.y],  //获取绘制圆的圆心。
			R:5,		          //获取圆的半径
			cir_color:"#7CB5EC",  //获取圆的填充颜色，默认为蓝色。
			arcbtn:true           //填充圆的背景色
		});
		//白色圆圈
		draw_basic.circle({
			oPointer:obj,        //获取绘制接口对象。
			point:[json.x,json.y],  //获取绘制圆的圆心。
			R:5,		          //获取圆的半径
			lineWidth:2,          //边框宽度
			lineColor:"#F7FAFD"   //边框颜色
		});
		//蓝色圆圈，透明度为0.5
		draw_basic.circle({
			oPointer:obj,        //获取绘制接口对象。
			point:[json.x,json.y],  //获取绘制圆的圆心。
			R:7,		          //获取圆的半径
			lineWidth:4,          //边框宽度
			lineColor:"rgba(124,181,236,0.2)"  //边框颜色
		});
	}
};

//绘图基本点(圆，线，点，文本绘制)-------------------------------------------------------------------------------------------
var draw_basic = {
	//绘制线
	line:function(json){

		//获取相关属性。
		var lineColor = json.lineColor || "#7CB5EC",        //默认线的颜色为蓝色。
			lineWidth = json.lineWidth || 2,                //默认线的宽度为2。
			oCanvas = json.oPinter || null,                 //获取绘制接口对象。
			aPoints = json.points || [],                    //获取所有的点的数据。
			shadow_r = json.shadow_r || 5,                  //阴影的模糊大小，默认为5
			shadow_color = json.shadow_color || "black",    //阴影的颜色
			shadow_x = json.shadow_x || 0,                  //阴影水平方向的偏移
			shadow_y = json.shadow_y || 0;                  //阴影竖直方向的偏移
			fillColor = json.fillColor || "rgba(255,255,255,0.5)";   //填充色。
			fill_btn = json.fill_btn || false;               //默认不填充背景色。
			shadow_btn = json.shadow_btn || false;           //默认没有阴影，true时，需要设置阴影。
			closePath = json.close_btn || false;             //判断线是否闭合，默认状态不闭合。

			//若没有绘制接口，那么将不再继续绘制。
			if(!oCanvas)return false;
			//如果点少于两个，那么将不再进行绘制。
			if(aPoints.length<1)return false;

			oCanvas.beginPath();  //新起一点，独立于其它，开始绘制

			//设置线的颜色和宽度。
			oCanvas.lineWidth = lineWidth;
			oCanvas.strokeStyle = lineColor;

			oCanvas.fillStyle = fillColor;     //填充色

			for(var w=0;w<aPoints.length;w++){
				(function(index){
					if(index==0){
						oCanvas.moveTo(aPoints[index][0],aPoints[index][1]);   //起点
					}else{
						oCanvas.lineTo(aPoints[index][0],aPoints[index][1]);   //连接后面的点
					}
				})(w);
			}
			//定义阴影的模糊大小、阴影的颜色、水平方向的便宜，右为正，左为负；竖直方向的便宜，上为负；下为正；
			if(shadow_btn){
				oCanvas.shadowBlur=shadow_r;
				oCanvas.shadowColor=shadow_color;
				oCanvas.shadowOffsetX = shadow_x;
				oCanvas.shadowOffsetY = shadow_y;				
			}else{
				oCanvas.shadowBlur=0;
				oCanvas.shadowColor="";
				oCanvas.shadowOffsetX = 0;
				oCanvas.shadowOffsetY = 0;
			}

			//绘制以上定义好的路径---------------------------

			if(closePath){
				oCanvas.closePath();
			}
			//填充封闭路径的颜色
			if(fill_btn){
				oCanvas.closePath();
				oCanvas.fill();  
			}else{
				//仅填充线条，不封闭路径
				oCanvas.stroke();   
			}


	},
	//绘制圆
	circle:function(json){
		//获取绘制圆的各种属性
		var oCanvas = json.oPointer || null;           //获取绘制接口对象。
		var oPint = json.point || [];                  //获取绘制圆的圆心。
		var iR = json.R || 5;                         //获取圆的半径，默认半径为5。
		var cir_color = json.cir_color || "#7CB5EC";   //获取圆的填充颜色，默认为蓝色。
		var lineWidth = json.lineWidth || 0;           //获取圆的边框宽度，默认边框没有。
		var lineColor = json.lineColor || "rgba(124,181,236,0.5)";     //边框颜色，默认为透明度为0.5的蓝色；
		var arc_btn = json.arcbtn || false;       //确定此圆是否填充背景色的按钮开关，默认无背景填充。
        var shadow_btn = json.shadow_btn || false;  //默认为没有阴影。

		if(!oCanvas)return false;    //若没有绘制接口对象，那么便不再往下进行绘制。
		if(oPint.length==0)return false;  //若圆心不存在，那么便不再进行绘制。

		oCanvas.beginPath();      //新起一点，独立于其它，

		//设置弧的边框，以及边框颜色，边框透明度问题。
		oCanvas.fillStyle = cir_color;
		oCanvas.strokeStyle = lineColor;
		oCanvas.lineWidth = lineWidth;
		//oCanvas.arc(x,y,r,sAngle,eAngle,counterclockwise);  
		// x表示：圆心横坐标； y表示：圆心纵坐标；r表示：圆的半径；sAngle表示起始角度；eAngle表示结尾角度；
		//counterclockwise表示：逆时针还是顺时针；false为顺时针；true为逆时针；默认是逆时针状态；此参数可以省略。

		//定义弧的圆心位置，以及半径大小，弧度大小问题。
		oCanvas.arc(oPint[0],oPint[1],iR,0,2*Math.PI);  
		
		if(!shadow_btn){
	        oCanvas.shadowBlur=0;
			oCanvas.shadowColor="";
			oCanvas.shadowOffsetX = 0;
			oCanvas.shadowOffsetY = 0;        
        }

		//绘制以上定义的圆。
		if(arc_btn){
			//填充背景色
			oCanvas.fill();	
		}else{
			//只填充线条颜色
			oCanvas.stroke();
		}		
	},
	//绘制矩形
	rect:function(json){
		var iL = json.iL || 0;   //矩形的左上角顶点在画布上的横坐标
		var iT = json.iT || 0;   //矩形的左上角顶点在画布上的纵坐标
		var iW = json.rect_w || 0;   //矩形的宽度
		var iH = json.rect_h || 0;   //矩形的高度
		var lineColor = json.lineColor || "#FFF";   //边框的颜色
		var lineWidth = json.lineWidth || 0;   //边框的宽度
		var fillColor = json.fillColor || "#F1F1F1";   //矩形填充的颜色
		var oCanvas = json.opainter || null;   //绘制接口对象
		var rect_btn = json.rect_btn || false;  //确定此矩形是否需要填充背景色的按钮开关，默认为有背景色填充。
		var shadow_btn = json.shadow_btn || false;  //默认为没有阴影。
        
		if(!oCanvas)return false;         //若没有提供绘制接口对象，那么不绘制。
		if(iW==0 || iH==0)return false;   //若没设置宽度和高度，那么不绘制；

		oCanvas.beginPath();

		//设置相关属性
		oCanvas.lineWidth = lineWidth;
		oCanvas.strokeStyle = lineColor;
		oCanvas.fillStyle = fillColor;
	
		//定义路径		
		oCanvas.rect(iL,iT,iW,iH);

		//默认没有阴影
		if(!shadow_btn){
	        oCanvas.shadowBlur=0;
			oCanvas.shadowColor="";
			oCanvas.shadowOffsetX = 0;
			oCanvas.shadowOffsetY = 0;        
        }

		//绘制定义的路径
		if(rect_btn){
			  oCanvas.fill();
		}else{
			oCanvas.stroke();		  
		}
	},
	//绘制文字
	text:function(json){
		//获取相关属性
		var oCanvas = json.oPainter || null;    //获取绘制接口对象
		var iSize = json.font_size || 12;   //字体大小
		var sFont_Color = json.font_color || "#606060";  //字体颜色，默认会深灰色。
		var aPoint = json.point || [];    //字体的位置，默认位置不存在
		var sFont_text = json.text || "";  //若没有文字，默认为空。
		var sFont_type = json.font_type || "Microsoft yahei";   //设置文本字体，默认为微软雅黑；
		var sDirection = json.align || "center";  //默认字体居中。
		var shadow_btn = json.shadow_btn || false;  //默认为没有阴影。

		if(!oCanvas)return false;    //若绘制接口对象不存在，那么就不需要再往下走去绘制。
		if(aPoint.length==0)return false; //若字体位置没有设置，那么不再往下走去绘制。
		if(sFont_text=="")return false;

		//设置相关属性（文字的大小、字体、颜色、位置、对齐方式）
		oCanvas.font = iSize+"px "+sFont_type;       //字体、大小
		oCanvas.fillStyle = sFont_Color;             //字体颜色
		oCanvas.textAlign=sDirection;                //对齐方式

		//默认没有阴影
		if(!shadow_btn){
	        oCanvas.shadowBlur=0;
			oCanvas.shadowColor="";
			oCanvas.shadowOffsetX = 0;
			oCanvas.shadowOffsetY = 0;        
        }

		//绘制文本
		oCanvas.fillText(sFont_text,aPoint[0],aPoint[1]+iSize);
	}
};