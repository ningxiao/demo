function getBroswerType()
{
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
    var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
}

function getCss(obj, attr)
{
		if(attr=="rotate")
		{
			return obj.rotate;
		}
		var i=parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
		var val=i?i:0;
		if(attr=="opacity")
		{
			val*=100;
		}
		return val;
}
function setCss(obj,oAttr)
{
	var sAttr="";
	var arr=["Webkit","Moz","O","ms",""];
	for(sAttr in oAttr)
	{
		
		if(sAttr.charAt(0)=="$")
		{
			for(var i=0;i<arr.length;i++)
			{
				obj.style[arr[i]+sAttr.substring(1)]=oAttr[sAttr];
			}
		}
		else if(sAttr=="rotate")
		{
			obj.rotate=oAttr[sAttr];
			var a=Math.cos(obj.rotate/180*Math.PI); 
			var b=Math.sin(obj.rotate/180*Math.PI);
			var c=-Math.sin(obj.rotate/180*Math.PI);
			var d=Math.cos(obj.rotate/180*Math.PI);
			for(var i=0;i<arr.length;i++)
			{
				obj.style[arr[i]+"Transform"]="matrix("+a+","+b+","+c+","+d+","+0+","+0+")";
			}
			obj.style.filter="progid:DXImageTransform.Microsoft.Matrix( M11="+a+", M12="+c+", M21="+b+", M22="+d+",SizingMethod='auto expand')";
		}
		else
		{
			var value=oAttr[sAttr];
			switch(sAttr)
			{
				case 'width':
				case 'height':
				case 'paddingLeft':
				case 'paddingTop':
				case 'paddingRight':
				case 'paddingBottom':
					value=Math.max(value,0);
				case 'left':
				case 'top':
				case 'marginLeft':
				case 'marginTop':
				case 'marginRight':
				case 'marginBottom':
					obj.style[sAttr]=value+'px';
					break;
				case 'opacity':
					if(value<0)
					{
						value=0;
					}
					obj.style.filter="alpha(opacity:"+value+")";
					
					obj.style.opacity=value/100;
					break;
				default:
					obj.style[sAttr]=value;
			}
		}
	}
}