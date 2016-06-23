function Arrow() {
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.color = '#ffff00';
}
Arrow.prototype.draw = function(context) {
    context.save(); //保存画布的状态
    context.translate(this.x, this.y); //重新映射画布上的 (0,0) 位置
    context.rotate(this.rotation); //旋转当前绘图
    context.lineWidth = 2; //设置当前的线条宽度
    context.fillStyle = this.color //设置或返回用于填充绘画的颜色、渐变或模式
    context.beginPath(); //起始一条路径，或重置当前路径
    context.moveTo(-50, -25); //把路径移动到画布中的指定点，不创建线条
    context.lineTo(0, -25); //添加一个新点，然后在画布中创建从该点到最后指定点的线条
    context.lineTo(0, -50);
    context.lineTo(50, 0);
    context.lineTo(0, 50);
    context.lineTo(0, 25);
    context.lineTo(-50, 25);
    context.lineTo(-50, -25);
    context.closePath(); //创建从当前点回到起始点的路径
    context.fill(); //填充当前绘图（路径）
    context.stroke(); //绘制已定义的路径
    context.restore(); //返回之前保存过的路径状态和属性
};