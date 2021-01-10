onmessage = ({ data }) => {
    const { id,memory,config: { x, y, d }} = data;
    fetch("../wasm/mandelbrot.wasm").then(response => response.arrayBuffer())
        .then(bytes =>
            WebAssembly.instantiate(bytes, {
                env: {
                    memory
                }
            })
        )
        .then(({ module, instance }) => {
            instance.exports.run(x, y, d, id);
            postMessage("done");
        });
};
