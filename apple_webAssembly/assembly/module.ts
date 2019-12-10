const ADD_CONSTANT: i32 = 1;
declare function sayHello(num: number): void;
declare function consoleLog(arg0: number): void;
consoleLog(Math.random());
sayHello(12);
function addIntegerWithConstant(a: i32, b: i32): i32 {
    return a + b + ADD_CONSTANT;
}
export const GET_THIS_CONSTANT_FROM_JAVASCRIPT: i32 = 2424;
export function add(a: i32, b: i32): i32 {
    return a + b;
}
export function callMeFromJavascript(a: i32, b: i32): i32 {
    return addIntegerWithConstant(a, b);
}
