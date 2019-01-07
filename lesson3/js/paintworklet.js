registerPaint('ripple', class {
    static get inputProperties() {
        return ['background-color', '--ripple-color', '--animation-tick', '--ripple-x', '--ripple-y'];
    }
    paint(ctx, geom, properties) {
        const bgColor = properties.get('background-color').toString();
        const rippleColor = properties.get('--ripple-color').toString();
        const x = parseFloat(properties.get('--ripple-x').toString());
        const y = parseFloat(properties.get('--ripple-y').toString());
        let tick = parseFloat(properties.get('--animation-tick').toString());
        if (tick < 0) {
            tick = 0;
        }
        if (tick > 1000) {
            tick = 1000;
        }
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, geom.width, geom.height);
        ctx.fillRect(0, 0, geom.width, geom.height);
        ctx.fillStyle = rippleColor;
        ctx.globalAlpha = 1 - tick / 1000;
        ctx.arc(x, y, geom.width * tick / 1000, 0, 2 * Math.PI);
        ctx.fill();
    }
});
