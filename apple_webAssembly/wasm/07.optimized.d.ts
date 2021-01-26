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
  export var offset: u32;
  export function update(tick: f32): void;
  export function resize(w: i32, h: i32): void;
}
export default ASModule;
