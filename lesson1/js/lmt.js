(function(){
	ads.lmt = function(data){
		var obj = new ads.lmtfun(data.params);
	}
	ads.lmtfun = Class.extend({
		init:function(data) {
			this.data = data;
			this.largedata = {"params": {src:data.src[0],width:data.width,height:data.height,link:data.link}};
			this.smalldata = {"params": {src:data.src[1],width:data.mwidth,height:data.mheight,link:data.link}};
			this.create();
		},
		create:function(){
			    var data = this.data;
			    var cosbuttonh = 57;
			    var cosbuttonw = 20;
				var leftlength ;
				var idTime;
				var largdiv = ads.banner(this.largedata);
				var smalldiv = ads.banner(this.smalldata);
				    smalldiv.style.display='none';
				var contrdiv = document.createElement('div');
				    contrdiv.style.backgroundImage = 'url(swf/adb.png)';
				    contrdiv.style.backgroundPosition = '0px 0px';
				    contrdiv.style.height = cosbuttonw+'px';
				    contrdiv.style.width = cosbuttonh+'px';
				    contrdiv.style.top = '0px';
				    contrdiv.style.right = '0px';
				    contrdiv.style.position = 'absolute';
				    contrdiv.style.zIndex = '9999';
				var closediv = document.createElement('div');
				    closediv.style.backgroundImage = 'url(swf/adb.png)';
				    closediv.style.backgroundPosition = '-0px -65px';
				    closediv.style.height = '40px';
				    closediv.style.width = cosbuttonw +'px';
				    closediv.style.right = '0px';
				    closediv.style.position = 'absolute';
				    closediv.style.top = (this.data.mheight*1+20)+'px';
				    closediv.style.zIndex = '9999';
				    closediv.style.display='none';
				var media = document.createElement('div');
				    media.isclick = false;
					media.style.position = 'absolute';
					media.style.top = getheight(this.data.width);
					media.style.right = (document.body.clientWidth - this.data.width)/2 + 'px';
					media.style.cursor = 'pointer';
					media.appendChild(largdiv);
					media.appendChild(smalldiv);
					media.appendChild(closediv);
					media.appendChild(contrdiv);
				    document.body.appendChild(media);
				addEvent(window, 'scroll',ads.throttle(function(){
					divplay();
				}, 200));
				addEvent(window, 'resize', ads.throttle(function(){
					divplay();			
		        }, 10));
				addEvent(contrdiv, 'click', ads.throttle(function(){
		        	timefun();
				}, 20));
				addEvent(closediv, 'click',function(){
					media.parentNode.removeChild(media);
					});
				idTime = window.setTimeout(timefun,this.data.playtime*1000);
				function getheight(height){/**计算现在屏幕中间位置*/
					var toph = media.isclick?(document.documentElement.clientHeight - data.mbottom - height - cosbuttonh):(document.documentElement.clientHeight - height)/2;
					return (document.documentElement.scrollTop || document.body.scrollTop) +toph+'px';
				}
				function divplay(){
					leftlength = media.isclick?data.mright+'px':(document.body.clientWidth - data.width)/2+'px';
					ads.animate(media, {
						right:leftlength,
		                top:getheight(data.width)
		            },{
						duration: 500,
						easing: "easeOutCirc"
					});
				}
				function timefun(){/**定时器和单击执行关闭*/
					media.isclick = !media.isclick;
		            if(media.isclick){
			            window.clearTimeout(idTime);
			            idTime = null;
					    contrdiv.style.backgroundPosition = '0px -46px';
					    contrdiv.style.height = '20px';
					    contrdiv.style.width = cosbuttonw+'px';
					    contrdiv.style.top = data.mheight+'px';
			            largdiv.style.display='none';
			            smalldiv.style.display='block';
			            closediv.style.display='block';
		            }else{
					    contrdiv.style.backgroundPosition = '0px 0px';
					    contrdiv.style.height = cosbuttonw+'px';
					    contrdiv.style.width = cosbuttonh+'px';
					    contrdiv.style.top = '0px';
		            	largdiv.style.display='block';
			            smalldiv.style.display='none';
			            closediv.style.display='none';
		            	idTime = window.setTimeout(timefun,data.playtime*1000);
		            }
		            divplay();
				}				
		}
	})
})()
