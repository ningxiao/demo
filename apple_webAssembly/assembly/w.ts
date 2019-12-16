let w: i32;
let h: i32;
let s: i32;
// import "allocator/arena";

@inline
function geti(len: u32): i32 {
    return load<u32>((len) << 2);
}

@inline
function seti(len: u32, v: u32): void {
    store<u32>((len) << 2, v);
}

@inline
function get(x: u32, y: u32): u32 {
    return load<u32>((y * w + x) << 2);
}

@inline
function set(x: u32, y: u32, v: u32): void {
    store<u32>((y * w + x) << 2, v);
}

@inline
function getOff(x: u32, y: u32, off: u32): u32 {
    return load<u32>((y * w + x + off) << 2);
}

@inline
function setOff(x: u32, y: u32, off: u32, v: u32): void {
    store<u32>((y * w + x + off) << 2, v);
}

// 区分小端和大端
@inline
function getR(x: u32): i32 {
    return (x & 0x000000ff) / 0x00000001
}

@inline
function getG(x: u32): i32 {
    return (x & 0x0000ff00) / 0x00000100
}

@inline
function getB(x: u32): i32 {
    return (x & 0x00ff0000) / 0x00010000
}

@inline
function getA(x: u32): i32 {
    return (x & 0xff000000) / 0x01000000
}

export function sum(array: f64[], len: i32): f64 {
    let sum: f64 = 0.0;
    for (let i: i32 = 0; i < len; i++) {
        sum += array[i];
    }
    return sum;
}

export function init(width: i32, height: i32): void {
    w = width;
    h = height;
    s = width * height;
    // convolutionMatrix(width, height, 0);
    let d = 1;


    // Start by filling output with random live cells.
    for (let y: i32 = 1; y < height - 1; y += 1) {
        for (let x: i32 = 1; x < width - 1; x += 1) {

            let result: u32;
            let resultR: i32 = 0, resultG: i32 = 0, resultB: i32 = 0, resultA: i32;
            let beginX: i32 = x - 1, beginY: i32 = y - 1;

            d = geti(width * height) + geti(width * height + 1) + geti(width * height + 2) +
                geti(width * height + 3) + geti(width * height + 4) + geti(width * height + 5) +
                geti(width * height + 6) + geti(width * height + 7) + geti(width * height + 8);

            if (d <= 0) d = 1;

            for (let i: i32 = 0; i < 9; i += 1) {
                resultR += getR(get(x + i % 3 - 1, y + i / 3 - 1)) * geti(width * height + i) / d;
                resultG += getG(get(x + i % 3 - 1, y + i / 3 - 1)) * geti(width * height + i) / d;
                resultB += getB(get(x + i % 3 - 1, y + i / 3 - 1)) * geti(width * height + i) / d;
            }
            resultA = getA(get(x, y)); // alpha 不参与卷积
            resultR = resultR < 0 ? 0 : (resultR > 255 ? 255 : resultR);
            resultG = resultG < 0 ? 0 : (resultG > 255 ? 255 : resultG);
            resultB = resultB < 0 ? 0 : (resultB > 255 ? 255 : resultB);

            result = resultR * 0x00000001 + resultG * 0x00000100 + resultB * 0x00010000 + resultA * 0x01000000;

            setOff(x, y, width * height + 9, result);
        }
    }

}

export function test(array: f64[]): f64 {
    let sum: f64 = 0.0;
    for (let i: i32 = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}
