/**
 * 开始多线程进行像素与寻路密集运算
 * User: ningxiao
 * Date: 13-7-2
 * Time: 上午10:23
 */
var rs,stageHeight,stageWidth,bitmapdata,last,json = {},pi = 180/Math.PI;;
function analysis(data) {
    var obj,x,y,index,bitmap,rgba,stop = true,maps = [];
    bitmapdata = data.bitmapdata;
    stageWidth = data.stageWidth;
    stageHeight = data.stageHeight;
    rs = stageWidth*4;
    for(var i=0;i<stageWidth;i++){
        for(var k=0;k<stageHeight;k++){
            index = k * rs + i * 4;
            if(bitmapdata[index] == 255 && bitmapdata[index+1] == 0){
                x = i;
                y = k;
                json[index] = true;
                maps.push({"x":x, "y":y});
                last = {"x":i, "y":k};
                break;
            }
        }
        if (maps.length) {
            break;
        }        
    }
    i = 0;
    //利用九宫格算法顺序取得绘制路线坐标生产线性数组
    while (stop) {
        if (maps[i]) {
            obj = getPath(maps[i].x, maps[i].y);
            if (obj) {
                maps.push(obj);
                i++;
                obj.rotate = pi * Math.atan2(obj.y - maps[i-1].y, obj.x -  maps[i-1].x);
            } else {
                stop = false;
            }
        }
    }    
     return maps;
}
function getPath(r, l) {
    var y, x, index,data;
    for (var i = 0; i < 9; i++) {
        x = r + (i % 3 - 1);
        y = l + (parseInt(i / 3) - 1);
        index = y * rs + x * 4 + 3;
        if(bitmapdata[index] && !json[index]){
            json[index] = true;
            data = {"x":x, "y":y};
            if(bitmapdata[index-3] == 255 && bitmapdata[index-2] == 255){
                data.pause = true;
            }
            return data;
            break;
        }
    }
    return false;
}
this.addEventListener("message", function (event) {
    this.postMessage(analysis(event.data));
}, false);