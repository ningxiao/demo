const ADD_CONSTANT: i32 = 1;
const SUM_CONSTANT: u16 = 12;
const TEST_CONSTANT: u8 = 12;
const DATA_MAP = new Map<i32, string>();
declare function sayHello(num: number): void;
declare function consoleLog(arg0: number): void;
consoleLog(Math.random());
sayHello(12);
const addIntegerWithConstant = (a: i32, b: i32): i32 => {
    return a + b + ADD_CONSTANT;
}
export const GET_THIS_CONSTANT_FROM_JAVASCRIPT: i32 = 2424;
export function add(a: i32, b: i32): i32 {
    return a + b;
}
export function callMeFromJavascript(a: i32, b: i32): i32 {
    return addIntegerWithConstant(a, b);
}
/**
 * 工具集合
 */
export namespace utils {
    export function get_data_map(key: i32): string | null {
        return DATA_MAP.has(key) ? DATA_MAP.get(key) : null;
    }
}
/**
 * 写入内存最小8位
 * 16位移2格 index<<1;
 * 32位移4格 index<<2;
 * 对像素进行加工然后返回数据
 * 编译加入共享内存--sharedMemory
 */
export function calculation(index: u16, value: u16): void {
    // 填充数据
    for (let i: u16 = index; i < index + 10; i++) {
        // 写入内存数据
        store<u16>(i << 1, value);
    }
}
export function colorAdjustProcess(index: u32, size: u32): void {
    // 填充数据
    const length = index + size;
    for (let i = index; i < length; i += 4) {
        const r = load<u8>(i);
        const g = load<u8>(i + 1);
        const b = load<u8>(i + 2);
        store<u8>(i, <u8>((r * 0.272) + (g * 0.534) + (b * 0.131)));
        store<u8>(i + 1, <u8>((r * 0.349) + (g * 0.686) + (b * 0.168)));
        store<u8>(i + 2, <u8>((r * 0.393) + (g * 0.769) + (b * 0.189)));
    }
}
export function colorInvertProcess(index: u32, size: u32): void {
    // 填充数据
    const length = index + size;
    for (let i = index; i < length; i += 4) {
        const r = load<u8>(i);
        const g = load<u8>(i + 1);
        const b = load<u8>(i + 2);
        store<u8>(i, 255 - r);
        store<u8>(i + 1, 255 - g);
        store<u8>(i + 2, 255 - b);
    }
}
