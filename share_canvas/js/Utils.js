/*********************************************************************************
 * Utils.js
 * webgl帮助类
 *
 * @version v1.0
 * @copyright 2001-2015 nxiao
 * @author nxiao <363305175@qq.com>
 * @license {@link https://github.com/ningxiao}
 *********************************************************************************/
var Utils = {};
/**
 * 检测是否支持touch事件
 * @param bool true 支持 false 不支持
 */
Utils.IsTouch = "ontouchend" in document ? true : false;
/**
 * 获取cavans的2D绘制对象
 * @param {[type]} canvas [description]
 */
Utils.GetContext = function (canvas) {
    if (canvas) {
        return canvas.getContext('2d');
    }
    return null;
};
/**
 * 获取canvas的webgl持有对象
 * @param {canvas} canvas 页面渲染对象
 * @param {boolean} opt_debug  是否开启调试模式
 * @param {function} opt_onerror 获取webgl异常是否存在回调函数
 * @return {context} 成功返回 canvas 的webgl对象 失败返回 null
 */
Utils.GetWebGlContext = function (canvas, opt_debug, opt_onerror) {
    var context, config = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    opt_onerror = opt_onerror || function (event) {
        console.log(event.statusMessage);
    };
    canvas.addEventListener("webglcontextcreationerror", opt_onerror, false);
    for (var i = 0, len = config.length; i < len; i++) {
        try {
            context = canvas.getContext(config[i]);
        } catch (err) { }
        if (context) {
            break;
        }
    }
    if (!context) {
        if (!window.WebGLRenderingContext) {
            opt_onerror("");
        } else {
            opt_onerror("");
        }
        return null;
    }
    context.viewport(0, 0, context.drawingBufferWidth, context.drawingBufferHeight);
    return context;
};

/**
 * 获取GPU定义的变量引用
 * @param {webgl} gl      webgl对象
 * @param {program} program  渲染引用
 * @param {String} name    获取对象名称
 * @param {boolean} isbool   false获取顶点片段变量 true获取片源着色器片段域
 * @return {object} 成功返回 object 域里面变量对应的js引用 失败返回 null
 */
Utils.GetGpuLocation = function (gl, program, name, isbool) {
    if (program) {
        if (isbool) {
            return gl.getUniformLocation(program, name);
        }
        return gl.getAttribLocation(program, name);
    }
    return null;
};

/**
 * 初始化渲染着色器
 * @param {webgl} gl             webgl对象
 * @param {[type]} vertexshader   初始化的顶点着色器
 * @param {[type]} fragmentshader 初始化的片段着色器
 * @return {program} program  成功返回 在js里面的渲染引用 失败返回 null
 */
Utils.InitShaders = function (gl, vertexshader, fragmentshader) {
    var program, linked;
    if (!vertexshader || !fragmentshader) {
        return null;
    }
    //创建 GPU在js的控制对象 program
    program = gl.createProgram();
    if (!program) {
        return null;
    }
    //把着顶点色器传递给program
    gl.attachShader(program, vertexshader);
    //把着片源色器传递给program
    gl.attachShader(program, fragmentshader);
    //将program 对象链接到GPU
    gl.linkProgram(program);
    //获取链接并且进行验证
    linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        console.log('无法链接WEBGL程序: ' + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    //开始运行program
    gl.useProgram(program);
    return program;
};

/**
 * 读取webgl片段渲染出着色器
 * @param {canvas} webgl canvas的webgl持有对象
 * @param {element} id   页面编写着色器代码的元素对象
 * @return {shader} shader  成功返回 对应着色器对象 失败返回 null
 */
Utils.GetShader = function (webgl, id) {
    var child, shader, text = "",
        shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }
    child = shaderScript.firstChild;
    while (child) {
        if (child.nodeType == 3) {
            text += child.textContent;
        }
        child = child.nextSibling;
    }
    switch (shaderScript.type) {
        case "x-shader/x-fragment": //片源着色器
            shader = webgl.createShader(webgl.FRAGMENT_SHADER);
            break;
        case "x-shader/x-vertex": //顶点着色器
            shader = webgl.createShader(webgl.VERTEX_SHADER);
            break;
        default:
            return null;
    }
    //绑定着色器字符串到到着色器
    webgl.shaderSource(shader, text);
    //编译着色器,并且生成着色器
    webgl.compileShader(shader);
    //验证着色器创建是否成功
    if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS) && !webgl.isContextLost()) {
        webgl.deleteShader(shader);
        return null;
    }
    return shader;
};

/**
 * 生成一个指定范围的随机数
 * @param {number} min 最小范围
 * @param {number} max 最小范围
 */
Utils.Random = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
};
/**
 * 传统鼠标的坐标转换为webgl坐标
 * @param  {int} cw   画布中心点
 * @param  {int} ch   画布中心点
 * @param  {int]} rect 画布的坐标
 * @param  {int} cx   鼠标点击x
 * @param  {int} cy   鼠标点击y
 * @return {int}      新的xy坐标
 */
Utils.LocalToGobal = function (cw, ch, rect, cx, cy) {
    var x = rect.left;
    var y = rect.top;
    x = ((cx - x) - cw) / cw;
    y = (ch - (cy - y)) / ch;
    return new Float32Array([x, y]);
};
/**
 * 获取鼠标在当前canvas的坐标
 * @param  {canvas} element [description]
 * @return {[type]}         [description]
 */
Utils.CaptureMouse = function (element) {
    var mouse = {
        x: 0,
        y: 0,
        event: null
    },
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;
    element.addEventListener('mousemove', function (event) {
        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + body_scrollLeft + element_scrollLeft;
            y = event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;
        mouse.x = x;
        mouse.y = y;
        mouse.event = event;
    }, false);
    return mouse;
};
/**
 * 在移动端进行坐标监听
 * @param  {canvas} element [description]
 * @return {[type]}         [description]
 */
Utils.CaptureTouch = function (element) {
    var touch = {
        x: null,
        y: null,
        isPressed: false,
        event: null
    },
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('touchstart', function (event) {
        touch.isPressed = true;
        touch.event = event;
    }, false);

    element.addEventListener('touchend', function (event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    element.addEventListener('touchmove', function (event) {
        var x, y, touch_event = event.touches[0];
        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);

    return touch;
};
/**
 * [parseColor description]
 * @param  {[type]} color    [description]
 * @param  {[type]} toNumber [description]
 * @return {[type]}          [description]
 */
Utils.ParseColor = function (color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0);
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return window.parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
        }
        return color;
    }
};
/**
 * 将颜色转为rgba
 * @param  {[type]} color [description]
 * @param  {[type]} alpha [description]
 * @return {[type]}       [description]
 */
Utils.ColorToRGB = function (color, alpha) {
    var r, g, b, a;
    if (typeof color === 'string' && color[0] === '#') {
        color = window.parseInt(color.slice(1), 16);
    };
    alpha = (alpha === undefined) ? 1 : alpha;
    r = color >> 16 & 0xff;
    g = color >> 8 & 0xff;
    b = color & 0xff;
    a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
    if (a === 1) {
        return "rgb(" + r + "," + g + "," + b + ")";
    } else {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
};
/**
 * 检测某个点是否在指定矩形区域内
 * @param {object} rect {x:0,y:0,width:50,height:50}
 * @param {int} x
 * @param {int} y
 */
Utils.ContainsPoint = function (rect, x, y) {
    return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
};
/**
 * 浏览器帧频对象 获取
 * @return {requestAnimationFrame}           requestAnimationFrame
 */
window.requestAnimationFrame || (window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1000 / 60);
});

/**
 * 浏览器帧频对象 关闭
 */
window.cancelAnimationFrame || (window.cancelAnimationFrame = window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || window.clearTimeout);