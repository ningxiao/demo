const { readFileSync, writeFileSync } = require("fs");
const wabt = require("wabt")();
const inputWat = "./wasm/demo.wat";
const outputWasm = "./wasm/demo.wasm";
const wasmModule = wabt.parseWat(inputWat, readFileSync(inputWat, "utf8"));
const { buffer } = wasmModule.toBinary({});
writeFileSync(outputWasm, Buffer.from(buffer));
