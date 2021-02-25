onmessage = ({ data }) => {
    const { id, mod, memory, config: { x, y, d } } = data;
    WebAssembly.instantiate(mod, {
        env: {
            memory,
            abort(_msg, _file, line, column) {
                console.error("abort called at main.ts:" + line + ":" + column);
            }
        }
    }).then(({ exports }) => {
        exports.run(x, y, d, id);
        postMessage("done");
    });
};
