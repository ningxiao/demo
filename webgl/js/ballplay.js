(function(exports) {
    var vertex = [];
    var ind = [];
    var step = 2;
    var radius = 400;
    var pi = Math.PI;
    var jstep = 360 / step + 1;
    var sinj, cosj, sini, cosi, sum, sumji;
    var clientrect = document.documentElement.getBoundingClientRect();
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    });
    //计算球型的顶点数据 x y z s t
    for (var j = -90, jl = 90; j <= jl; j += step) {
        for (var i = 0, il = 360; i <= il; i += step) {
            sini = Math.sin(i / 180 * pi);
            cosi = Math.cos(i / 180 * pi);
            sinj = Math.sin(j / 180 * pi);
            cosj = Math.cos(j / 180 * pi);
            // 动态计算球型三维坐标 x y z
            vertex.push(radius * cosj * cosi, radius * sinj, radius * cosj * sini);
            // 动态计算球型贴图纹理坐标 uv 或者 st
            vertex.push(i / 360, (j / 90) / 2 + 0.5);
        };
    };
    //计算球型的顶点数据索引
    for (i = 0, il = 360 / step; i < il; ++i) {
        for (j = 0, jl = 180 / step; j < jl; j++) {
            sumji = j * jstep + i;
            sum = (j + 1) * jstep + i + 1;
            if (j == 0) {
                ind.push(sumji, sum, (j + 1) * jstep + i);
            } else if (j == jl - 1) {
                ind.push(sumji, sumji + 1, sum);
            } else {
                ind.push(sumji, sumji + 1, sum);
                ind.push(sumji, sum, (j + 1) * jstep + i);
            };
        };
    };
    exports.config = {
        'width': clientrect.width,
        'height': clientrect.height,
        'indices': new Uint16Array(ind),
        'vertices': new Float32Array(vertex)
    };
})(typeof exports === 'object' ? exports : window);
var gl, dots, video, bitmapdata, canvas = document.getElementById('canvas');
var gltexture, AMORTIZATION = 0.95;
var dY = 0;
var dX = 0;
var old_x, old_y, drag = false;
var rotationX = 0;
var rotationY = 0;
var v_matrix, m_matrix, p_matrix;
var distance = 70;
var rotx = 0;
var roty = 0;

function createplay() {
    var videodata, mp4source;
    video = document.createElement("video");
    video.autoplay = "autoplay";
    video.controls = "controls";
    video.setAttribute("webkit-playsinline", "true"); //解决微信可以不用全屏播放
    mp4source = document.createElement("source");
    mp4source.type = "video/mp4";
    mp4source.src = "./video/utvr.mp4";
    video.appendChild(mp4source);
    video.load();
    videodata = {
        win: {
            start: 0,
            length: 10
        }
    };

    function timeupdatefun() {
        if (this.currentTime > 0) {
            video.removeEventListener("timeupdate", timeupdatefun);
            createpgl();
        };
    };
    video.addEventListener("play", function(event) {
        videodata["win"]["length"] = this.duration - 31;
    });
    video.addEventListener("ended", function(event) {
        // video.load();
        // video.play();
    });
    video.addEventListener("timeupdate", timeupdatefun);
    video.play();
};

function initvertexbuffers(gl, program, vertices, indices, size) {
    var n, uv, fsize, position, indexbuffer, vertexbuffer;
    if (!(gl && vertices.length > 0 && indices.length > 0)) {
        console.log("传入参数错误");
        return 0;
    };
    n = indices.length;
    //获取元素字节大小
    fsize = vertices.BYTES_PER_ELEMENT;
    //创建一个gl的顶点坐标与颜色缓冲区
    vertexbuffer = gl.createBuffer();
    //创建一个gl顶点索引缓冲区
    indexbuffer = gl.createBuffer();
    if (!vertexbuffer || !indexbuffer) {
        console.log("创建缓冲区对象失败");
        return 0;
    };
    //将顶点坐标与颜色缓冲区对象绑定到gl
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexbuffer);
    //将顶点坐标与颜色写入缓冲区对象
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //获取顶点着色器变量
    position = Utils.GetGpuLocation(gl, program, "a_position");
    uv = Utils.GetGpuLocation(gl, program, "uv");
    if (position < 0 || uv < 0) {
        gl.deleteBuffer(vertexbuffer);
        gl.deleteBuffer(indexbuffer);
        console.log("获取WebGl顶点变量失败");
        return 0;
    };
    //将缓冲区对象分配给着色器变量 坐标数据
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, fsize * size, 0);
    //将顶点变量与分配的缓冲区对象连接起来
    gl.enableVertexAttribArray(position);
    //将缓冲区对象分配给着色器变量
    gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, fsize * size, fsize * 3);
    //将顶点变量与分配的缓冲区对象连接起来
    gl.enableVertexAttribArray(uv);
    //将顶点索引缓冲区对象绑定到gl
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexbuffer);
    //将顶点索引写入缓冲区对象
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return n;
};

function inittextures(gl, program, name, bitmap, index) {
    //创建纹理对象
    var u_sampler, texture = gl.createTexture();
    var index = index || 0;
    if (!texture) {
        console.log("创建纹理对象失败");
        return;
    };
    u_sampler = Utils.GetGpuLocation(gl, program, name, true);
    if (u_sampler < 0) {
        gl.deleteTexture(texture);
        console.log("获取WebGl片源变量u_Sampler失败");
        return;
    };
    //将纹理图片反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //开启0号纹理单元
    gl.activeTexture(gl["TEXTURE" + index]);
    //将创建的纹理单元绑定
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //将img绑定到纹理
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
    //将0号纹理传递给着色器
    gl.uniform1i(u_sampler, index);
    return texture;
};

function drawgl() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //清理之前颜色和深度模型
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    video.paused || gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    mat4.identity(mmatrix); //重置模型矩阵
    mat4.rotateX(mmatrix, mmatrix, roty);
    mat4.rotateY(mmatrix, mmatrix, rotx);

    mat4.identity(vmatrix); //视图模型矩阵
    mat4.lookAt(vmatrix, new Float32Array([0, 0, distance]), new Float32Array([0, 0, 1000]), new Float32Array([0, 1, 0]));

    gl.uniformMatrix4fv(v_matrix, false, vmatrix);

    gl.uniformMatrix4fv(m_matrix, false, mmatrix);
    //绘制一个点
    gl.drawElements(gl.TRIANGLES, dots, gl.UNSIGNED_SHORT, 0);
    //清除马上执行
    gl.flush();
    requestAnimationFrame(drawgl, canvas);
};

function mousecall() {
    var beta, old_beta = 0;

    function mousedown(ev) {
        drag = true;
        event.preventDefault();
        ev = (ev.touches && ev.touches[0]) || ev;
        old_x = ev.clientX, old_y = ev.clientY;
        return false;
    };

    function mouseup(ev) {
        drag = false;
    };

    function mousemove(ev) {
        if (!drag) return false;
        ev.preventDefault();
        ev = (ev.touches && ev.touches[0]) || ev;
        dX = ev.clientX;
        dY = ev.clientY;
        rotationX += (old_x - dX) / 4;
        rotationY -= (old_y - dY) / 4;
        if (rotationX >= 360) rotationX -= 360;
        if (rotationX < 0) rotationX += 360;
        rotationY = Math.min(rotationY, 90);
        rotationY = Math.max(rotationY, -90);
        rotx = rotationX * Math.PI / 180;
        roty = rotationY * Math.PI / 180;
        old_x = dX;
        old_y = dY;
    };

    function mousewheel(ev) {
        var delta = ev.detail ? -ev.detail / 3 : ev.wheelDelta / 120;
        distance -= delta * 4;
        distance = Math.min(distance, 900);
        distance = Math.max(distance, -300);
    };

    function resizecall(ev) {
        var clientrect = document.documentElement.getBoundingClientRect();
        canvas.setAttribute('width', clientrect.width);
        canvas.setAttribute('height', clientrect.height);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    function orientationhandler(ev) {
        if (ev.beta != null) {
            beta = ev.beta.toFixed(2);
            if (Math.abs(Math.abs(beta) - Math.abs(old_beta)) > 0.98) {
                rotationY = old_beta = beta - 90;
            };
            rotx = rotationX * Math.PI / 180;
            roty = rotationY * Math.PI / 180;
        };
    };
    canvas.addEventListener("mousedown", mousedown, false);
    canvas.addEventListener("mouseup", mouseup, false);
    canvas.addEventListener("mouseout", mouseup, false);
    canvas.addEventListener("mousemove", mousemove, false);
    canvas.addEventListener("mousewheel", mousewheel, false);
    canvas.addEventListener('DOMMouseScroll', mousewheel, false);

    canvas.addEventListener("touchstart", mousedown, false);
    canvas.addEventListener("touchend", mouseup, false);
    canvas.addEventListener("touchmove", mousemove, false);
    window.addEventListener("resize", resizecall, false);
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", orientationhandler, false);
    };
};

function createpgl() {
    //获取顶点着色代码并且编译生成
    var shadervs = Utils.GetShader(gl, 'shader-vs');
    //获取片元着色代码并且编译生成
    var shaderfs = Utils.GetShader(gl, 'shader-fs');
    //将顶点着色与片元着色交由着色器生成
    var program = Utils.InitShaders(gl, shadervs, shaderfs);
    if (!program) {
        console.log("生成着色器失败！");
        return;
    };
    //返回渲染顶点数量
    dots = initvertexbuffers(gl, program, config.vertices, config.indices, 5);
    //渲染视频纹理
    gltexture = inittextures(gl, program, "sampler", video, 0);
    if (!gltexture) {
        console.log("设置纹理0号失败");
        return;
    };
    v_matrix = Utils.GetGpuLocation(gl, program, 'v_matrix', true);
    m_matrix = Utils.GetGpuLocation(gl, program, 'm_matrix', true);
    p_matrix = Utils.GetGpuLocation(gl, program, 'p_matrix', true);
    if (v_matrix < 0 || m_matrix < 0 || p_matrix < 0) {
        console.log("获取WebGl顶点矩阵变量失败");
        return;
    };
    vmatrix = mat4.create(); //视图矩阵
    mmatrix = mat4.create(); //模型矩阵
    pmatrix = mat4.create(); //投影矩阵
    mat4.rotateY(mmatrix, mmatrix, rotx);
    mat4.rotateX(mmatrix, mmatrix, roty);
    mat4.lookAt(vmatrix, new Float32Array([0, 0, distance]), new Float32Array([0, 0, 1000]), new Float32Array([0, 1, 0]));
    mat4.perspective(pmatrix, Math.PI * 60 / 180, config.width / config.height, 1, 800);

    gl.uniformMatrix4fv(v_matrix, false, vmatrix);
    gl.uniformMatrix4fv(m_matrix, false, mmatrix);
    gl.uniformMatrix4fv(p_matrix, false, pmatrix);

    //开启隐藏面消除
    gl.enable(gl.DEPTH_TEST);
    mousecall();
    drawgl();
};
canvas.setAttribute('width', config.width);
canvas.setAttribute('height', config.height);
gl = Utils.GetWebGlContext(canvas);
if (gl) {
    createplay();
} else {
    console.log("开始webgl失败");
};