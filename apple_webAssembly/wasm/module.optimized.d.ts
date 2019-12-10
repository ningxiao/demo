declare module ASModule {
  type i8 = number;
  type i16 = number;
  type i32 = number;
  type u8 = number;
  type u16 = number;
  type u32 = number;
  type f32 = number;
  type f64 = number;
  type bool = any;
  export var GET_THIS_CONSTANT_FROM_JAVASCRIPT: i32;
  export function add(a: i32, b: i32): i32;
  export function callMeFromJavascript(a: i32, b: i32): i32;
}
export default ASModule;
