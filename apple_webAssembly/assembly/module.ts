const ADD_CONSTANT: i32 = 1;
const SUM_CONSTANT: u16 = 12;
const TEST_CONSTANT: u8 = 12;
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
export function getGlobal(): i64 {
    return 42;
}
/**
 * 写入内存最小8位
 * 16位移2格 index<<1;
 * 32位移4格 index<<2;
 * 对像素进行加工然后返回数据
 */
export function calculation(index: u16): u16 {
    // 填充数据
    for (let i: u16 = 0; i < 10; i++) {
        const ptr = i << 1;
        // 获取内存数据
        const data: u16 = load<u16>(ptr);
        // 写入内存数据
        store<u16>(ptr, SUM_CONSTANT + data);
    }
    // 获取知道索引数据
    return load<u16>((index - 1) << 1);
}
