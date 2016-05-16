/**
 * @author nttdocomo
 */
(function() {
	ads.banner = function(data){
		var text = new ads.Banner(data.params);
		return text.el;
		/*var grid = document.getElementById(data.grid);
		grid.appendChild(text.el);*/
	}
	ads.Banner = Class.extend({
		init : function(data) {
			var isSwf = (/\.swf$/i).test(data.src);
			this.el = document.createElement('div');
			this.el.className="leju-ads";
			ads.setStyle(this.el,{width:data.width ? data.width+"px" : 0,height:data.height ? data.height+"px":0})
			if(isSwf){
				this.swf(data);
			} else {
				this.image(data);
			}
		},
		swf:function(data){
			var swfUrl = data.src, id = data.id || "", width = data.width || "100%", height = data.height || "100%", version = data.version || "7", flashvars = data.flashvars || "", params = data.params || {wmode:'opaque'}, attributes = data.attributes || "", bgcolor = data.bgcolor || "", quality = data.quality || "high", useExpressInstall = data.useExpressInstall || false
			var swf = new sinaFlash(swfUrl, id, width, height, version, useExpressInstall, bgcolor, quality);
			if (flashvars) {
                for (var i in flashvars) {
                    if ("adlink" == i) {
                        swf.addVariable(i, escape(flashvars[i]));
                    }
                    else {
                        swf.addVariable(i, flashvars[i]);
                    }
                }
            }
            if (params) {
                for (var i in params) {
                    swf.addParam(i, params[i]);
                }
            }
            swf.__forSetAttribute("width","100%")
            swf.__forSetAttribute("height","100%");
            this.el.className += " banner-" + width;
			this.el.innerHTML = swf.getFlashHtml();
		},
		image:function(data){
			var width = data.width || "100%",src = data.src ||"" ,link = data.link ||"";
            this.el.className += " banner-" + width;
			this.el.innerHTML = "<a href="+link+" style='border:none;'><img alt='' style='border:none;' src="+src+" /></a>";
		}
	});
})()