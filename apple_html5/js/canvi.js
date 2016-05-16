/**
 * @author ningxiao
 */
function Canvi(x,y,ofx,ofy,w,h,data,canvas,z){
	this.x = x || 0;
	this.y = y || 0;
	this.ofX = ofx || 0;//位移X
	this.ofY = ofy || 0;//位移Y
	this.width = w;
	this.height = h;
	this.data = data;
	this.hit = false;
	this.ofL = 0;
	this.ofR = 0;
	this.ctxcanvas =canvas;	
	this.ex = 0;
	this.ey = 0;
	this.zindex = z || 0;	
};
Canvi.prototype.init = function(){//初始化添加与创建对象
	this.ctxcanvas.save();//保存画笔状态  
	this.ofW = this.ofX + this.width;
	this.ofH = this.ofY + this.height;		
	if(this.hit){
        this.ofX = this.ex - this.ofL;		
	    this.ofY = this.ey - this.ofR;	    		
	};
	this.draw();
	this.ctxcanvas.restore();//绘制结束以后，恢复画笔状态  
};
Canvi.prototype.draw = function(){//绘制对象
	this.ctxcanvas.drawImage(this.data,this.x,this.y,this.width,this.height,this.ofX,this.ofY,this.width,this.height);		
};
Canvi.prototype.hitTestObject = function(ex,ey){//检测是否区域碰撞
	if(this.ofX<ex && ex<this.ofW && this.ofY<ey && ey<this.ofH){
		this.ofL = ex - this.ofX;
		this.ofR = ey - this.ofY;
		return true;
	}
	return false;
}
