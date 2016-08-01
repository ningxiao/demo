function Ball(radius, color) {
	this.id;
	this.vx = 0;
	this.vy = 0;
	this.x = 0;
	this.y = 0;
	this.radius = radius || 40;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = Utils.ParseColor(color || "#ff0000");
	this.lineWidth = 1;
	this.visible = true;
};
Ball.prototype.draw = function(context) {
	if (context) {
		context.save();
		//context.transform(Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 0, 0);
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.scale(this.scaleX, this.scaleY);
		context.lineWidth = this.lineWidth;
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.fill();
		this.lineWidth > 0 && context.stroke();
		context.restore();
	}
};
Ball.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
};
