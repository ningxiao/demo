class Walker {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    update(x, y) {
        this.x = x;
        this.y = y;
    }
}
let ctx;
let canvas;
let width;
let height;
const walkers = [];
const colors = [
    "rgba(255, 0, 126, .1)",
    "rgba(86, 180, 255, .1)",
    "rgba(255, 165, 20, .1)"
];
const rand = (max) => {
    return Math.floor((max) * Math.random());
}
const draw = () => {
    ctx.lineWidth = 3;
    walkers.forEach((walker) => {
        let x = walker.x;
        let y = walker.y;
        switch (rand(4)) {
            case 0:
                if (walker.x < width) x += 5;
                break;
            case 1:
                if (walker.x > 0) x -= 5;
                break;
            case 2:
                if (walker.y < height) y += 5;
                break;
            case 3:
                if (walker.y > 0) y -= 5;
                break;
        }
        ctx.strokeStyle = walker.color;
        ctx.beginPath();
        ctx.moveTo(walker.x, walker.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        walker.update(x, y); y = walker.y;
    });
};
const Init = (mode, data) => {
    if (mode === "transfer") {
        let x = 0;
        let y = 0;
        width = data.width;
        height = data.height;
        canvas = new OffscreenCanvas(width, height);
        // canvas.toBlob(blob => {
        //     console.log(URL.createObjectURL(blob));
        //  });
    } else if (mode === "commit") {
        canvas = data.canvas;
        width = canvas.width;
        height = canvas.height;
    }
    x = Math.floor(width / 2);
    y = Math.floor(height / 2);
    for (let i = 0; i < 500; i++) {
        walkers.push(new Walker(x, y, colors[rand(3)]));
    }
    console.log("Render init canvas size:" + canvas.width + "x" + canvas.height);
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext('2d');
        const transferLoop = () => {
            draw();
            const bitmap = canvas.transferToImageBitmap();
            postMessage(
                {
                    name: "TransferBuffer",
                    buffer: bitmap
                },
                [bitmap]
            );
            requestAnimationFrame(transferLoop);
        }
        let x = 0;
        const commitLoop = () => {
            draw();
            ctx.commit();
            requestAnimationFrame(() => {
                commitLoop()
            });
        }
        switch (mode) {
            case "transfer":
                transferLoop();
                break;
            case "commit":
                commitLoop();
                break;
            default:
                break;
        }
    }
}
self.addEventListener('message', (ev) => {
    const { name, mode } = ev.data;
    console.log('Window post:' + name + ", mode:" + mode);
    if (name === "Init") {
        Init(mode, ev.data);
    }
}, false);
