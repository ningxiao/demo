let width = 320;
let height = 200;
export const offset = __heap_base;
const set = (x: i32, y: i32, v: f32): void => {
    let vi = <i32>v;
    store<i32>(offset + ((width * y + x) << 2), ~vi << 24 | vi << 8);
}
const distance = (x1: i32, y1: i32, x2: f32, y2: f32): f32 => {
    const dx = <f32>x1 - x2;
    const dy = <f32>y1 - y2;
    return Mathf.sqrt(dx * dx + dy * dy);
}
export function update(tick: f32): void {
    const w = <f32>width;
    const h = <f32>height;
    const hw = w * 0.5;
    const hh = h * 0.5;
    const cx1 = (Mathf.sin(tick * 2) + Mathf.sin(tick)) * hw * 0.3 + hw;
    const cy1 = (Mathf.cos(tick)) * hh * 0.3 + hh;
    const cx2 = (Mathf.sin(tick * 4) + Mathf.sin(tick + 1.2)) * hw * 0.3 + hw;
    const cy2 = (Mathf.sin(tick * 3) + Mathf.cos(tick + 0.1)) * hh * 0.3 + hh;
    const res = <f32>48 / Mathf.max(w, h);
    let y = 0;
    do {
        let x = 0;
        do {
            set(x, y, Mathf.abs(Mathf.sin(distance(x, y, cx1, cy1) * res) + Mathf.sin(distance(x, y, cx2, cy2) * res)) * 120);
        } while (++x != width);
    } while (++y != height);
}

export function resize(w: i32, h: i32): void {
    width = w; height = h;
    const needed = <i32>((offset + (w * h * sizeof<i32>() + 0xffff)) & ~0xffff) >>> 16;
    const actual = memory.size();
    if (needed > actual) memory.grow(needed - actual);
}
