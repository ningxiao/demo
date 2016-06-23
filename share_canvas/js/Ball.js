function Ball(radius, color) {
	this.x = 0;
	this.y = 0;
	this.radius = radius || 40;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = Utils.ParseColor(color || "#ff0000");
	this.lineWidth = 1;
}
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
}