onmessage = ({ data }) => {
    const { type, index, size, mod, memory } = data;
    WebAssembly.instantiate(mod, {
        Math,
        env: {
            memory,
            abort(_msg, _file, line, column) {
                console.error("abort called at main.ts:" + line + ":" + column);
            }
        },
        worker: {
            sayHello(num) {
                console.log('WebAssembly', Array(num).fill("*").join(""))
            },
            consoleLog(value) {
                console.log(value);
            }
        },
    }).then(({ exports }) => {
        switch (type) {
            case 'colorInvertProcess':
                exports.colorInvertProcess(index, size);
                break;
            case 'colorAdjustProcess':
                exports.colorAdjustProcess(index, size);
                break;
            default:
                break;
        }
        // console.log(id, exports.add(1, 2));
        // console.log(id, exports.callMeFromJavascript(24, 24));
        // console.log(id, exports.GET_THIS_CONSTANT_FROM_JAVASCRIPT.valueOf());
        // console.log(id, '返回内存大小', exports.calculation(id, id));
        postMessage("done");
    });
};
