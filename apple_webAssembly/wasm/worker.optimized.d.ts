declare module ASModule {
  type i8 = number;
  type i16 = number;
  type i32 = number;
  type i64 = bigint;
  type isize = number;
  type u8 = number;
  type u16 = number;
  type u32 = number;
  type u64 = bigint;
  type usize = number;
  type f32 = number;
  type f64 = number;
  type bool = boolean | number;
  export var GET_THIS_CONSTANT_FROM_JAVASCRIPT: i32;
  export function add(a: i32, b: i32): i32;
  export function callMeFromJavascript(a: i32, b: i32): i32;
  export function get_data_map(key: i32): usize;
  export function calculation(index: u16, value: u16): void;
  export function colorAdjustProcess(index: u32, size: u32): void;
  export function colorInvertProcess(index: u32, size: u32): void;
}
export default ASModule;
