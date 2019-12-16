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
  export function __alloc(size: u32, id: u32): u32;
  export function __retain(ptr: u32): u32;
  export function __release(ptr: u32): void;
  export function __collect(): void;
  export var __rtti_base: u32;
  export function sum(array: u32, len: i32): f64;
  export function init(width: i32, height: i32): void;
  export function test(array: u32): f64;
}
export default ASModule;
