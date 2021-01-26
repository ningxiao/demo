(module
 (type $FUNCSIG$viif (func (param i32 i32 f32)))
 (type $FUNCSIG$fiiff (func (param i32 i32 f32 f32) (result f32)))
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$vf (func (param f32)))
 (type $FUNCSIG$ff (func (param f32) (result f32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (memory $0 1)
 (data (i32.const 8) " \00\00\00\01\00\00\00\00\00\00\00 \00\00\00)\15DNn\83\f9\a2\c0\dd4\f5\d1W\'\fcA\90C<\99\95b\dba\c5\bb\de\abcQ\fe")
 (data (i32.const 56) "\10\00\00\00\01\00\00\00\03\00\00\00\10\00\00\00\18\00\00\00\18\00\00\00 \00\00\00\04")
 (table $0 3 funcref)
 (elem (i32.const 0) $null $start:assembly/07~anonymous|0 $start:assembly/07~anonymous|1)
 (global $assembly/07/width (mut i32) (i32.const 320))
 (global $assembly/07/height (mut i32) (i32.const 200))
 (global $assembly/07/offset (mut i32) (i32.const 0))
 (global $~lib/math/rempio2f_y (mut f64) (f64.const 0))
 (global $~lib/argc (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "offset" (global $assembly/07/offset))
 (export "update" (func $assembly/07/update))
 (export "resize" (func $assembly/07/resize))
 (start $start)
 (func $start:assembly/07~anonymous|0 (; 0 ;) (type $FUNCSIG$viif) (param $0 i32) (param $1 i32) (param $2 f32)
  global.get $assembly/07/offset
  global.get $assembly/07/width
  local.get $1
  i32.mul
  local.get $0
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.trunc_f32_s
  local.tee $0
  i32.const -1
  i32.xor
  i32.const 24
  i32.shl
  local.get $0
  i32.const 8
  i32.shl
  i32.or
  i32.store
 )
 (func $start:assembly/07~anonymous|1 (; 1 ;) (type $FUNCSIG$fiiff) (param $0 i32) (param $1 i32) (param $2 f32) (param $3 f32) (result f32)
  local.get $0
  f32.convert_i32_s
  local.get $2
  f32.sub
  local.tee $2
  local.get $2
  f32.mul
  local.get $1
  f32.convert_i32_s
  local.get $3
  f32.sub
  local.tee $2
  local.get $2
  f32.mul
  f32.add
  f32.sqrt
 )
 (func $~lib/math/NativeMathf.sin (; 2 ;) (type $FUNCSIG$ff) (param $0 f32) (result f32)
  (local $1 f64)
  (local $2 f64)
  (local $3 i32)
  (local $4 f64)
  (local $5 i64)
  (local $6 i32)
  (local $7 i64)
  (local $8 i32)
  (local $9 i32)
  (local $10 i64)
  (local $11 i64)
  (local $12 i64)
  local.get $0
  i32.reinterpret_f32
  local.tee $3
  i32.const 31
  i32.shr_u
  local.set $6
  block $folding-inner0
   local.get $3
   i32.const 2147483647
   i32.and
   local.tee $3
   i32.const 1061752794
   i32.le_u
   if
    local.get $3
    i32.const 964689920
    i32.lt_u
    if
     local.get $0
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $2
    local.get $2
    f64.mul
    local.tee $1
    local.get $2
    f64.mul
    local.set $4
    br $folding-inner0
   end
   local.get $3
   i32.const 1081824209
   i32.le_u
   if
    local.get $3
    i32.const 1075235811
    i32.le_u
    if
     local.get $6
     if (result f32)
      local.get $0
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.add
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      f64.const 1
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      f64.const -0.001388676377460993
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
      f32.neg
     else
      local.get $0
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.sub
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      f64.const 1
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      f64.const -0.001388676377460993
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
     end
     return
    end
    local.get $0
    f64.promote_f32
    f64.const 3.141592653589793
    f64.add
    local.get $0
    f64.promote_f32
    f64.const 3.141592653589793
    f64.sub
    local.get $6
    select
    f64.neg
    local.tee $2
    local.get $2
    f64.mul
    local.tee $1
    local.get $2
    f64.mul
    local.set $4
    br $folding-inner0
   end
   local.get $3
   i32.const 1088565717
   i32.le_u
   if
    local.get $3
    i32.const 1085271519
    i32.le_u
    if
     local.get $6
     if (result f32)
      local.get $0
      f64.promote_f32
      f64.const 4.71238898038469
      f64.add
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      f64.const 1
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      f64.const -0.001388676377460993
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
     else
      local.get $0
      f64.promote_f32
      f64.const 4.71238898038469
      f64.sub
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      f64.const 1
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      f64.const -0.001388676377460993
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
      f32.neg
     end
     return
    end
    local.get $0
    f64.promote_f32
    f64.const 6.283185307179586
    f64.add
    local.get $0
    f64.promote_f32
    f64.const 6.283185307179586
    f64.sub
    local.get $6
    select
    local.tee $1
    local.get $1
    local.get $1
    f64.mul
    local.tee $2
    local.get $1
    f64.mul
    local.tee $4
    f64.const -0.16666666641626524
    local.get $2
    f64.const 0.008333329385889463
    f64.mul
    f64.add
    f64.mul
    f64.add
    local.get $4
    local.get $2
    local.get $2
    f64.mul
    f64.mul
    f64.const -1.9839334836096632e-04
    local.get $2
    f64.const 2.718311493989822e-06
    f64.mul
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
    return
   end
   local.get $3
   i32.const 2139095040
   i32.ge_u
   if
    local.get $0
    local.get $0
    f32.sub
    return
   end
   block $~lib/math/rempio2f|inlined.0 (result i32)
    local.get $3
    i32.const 1305022427
    i32.lt_u
    if
     local.get $0
     f64.promote_f32
     local.tee $2
     f64.const 0.6366197723675814
     f64.mul
     f64.nearest
     local.set $1
     local.get $2
     local.get $1
     f64.const 1.5707963109016418
     f64.mul
     f64.sub
     local.get $1
     f64.const 1.5893254773528196e-08
     f64.mul
     f64.sub
     global.set $~lib/math/rempio2f_y
     local.get $1
     i32.trunc_f64_s
     br $~lib/math/rempio2f|inlined.0
    end
    i32.const 76
    i32.load
    local.get $3
    i32.const 23
    i32.shr_s
    i32.const 152
    i32.sub
    local.tee $9
    i32.const 6
    i32.shr_s
    i32.const 3
    i32.shl
    i32.add
    local.tee $8
    i64.load
    local.set $10
    local.get $8
    i64.load offset=8
    local.set $7
    local.get $9
    i32.const 63
    i32.and
    i64.extend_i32_s
    local.tee $5
    i64.const 32
    i64.gt_u
    if (result i64)
     local.get $7
     local.get $5
     i64.const 32
     i64.sub
     i64.shl
     local.get $8
     i64.load offset=16
     i64.const 96
     local.get $5
     i64.sub
     i64.shr_u
     i64.or
    else
     local.get $7
     i64.const 32
     local.get $5
     i64.sub
     i64.shr_u
    end
    local.set $11
    f64.const 8.515303950216386e-20
    local.get $0
    f64.promote_f32
    f64.copysign
    local.get $3
    i32.const 8388607
    i32.and
    i32.const 8388608
    i32.or
    i64.extend_i32_s
    local.tee $12
    local.get $10
    local.get $5
    i64.shl
    local.get $7
    i64.const 64
    local.get $5
    i64.sub
    i64.shr_u
    i64.or
    i64.mul
    local.get $11
    local.get $12
    i64.mul
    i64.const 32
    i64.shr_u
    i64.add
    local.tee $5
    i64.const 2
    i64.shl
    local.tee $7
    f64.convert_i64_s
    f64.mul
    global.set $~lib/math/rempio2f_y
    i32.const 0
    local.get $5
    i64.const 62
    i64.shr_u
    local.get $7
    i64.const 63
    i64.shr_u
    i64.add
    i32.wrap_i64
    local.tee $3
    i32.sub
    local.get $3
    local.get $6
    select
   end
   local.set $3
   global.get $~lib/math/rempio2f_y
   local.set $1
   local.get $3
   i32.const 1
   i32.and
   if (result f32)
    local.get $1
    local.get $1
    f64.mul
    local.tee $1
    local.get $1
    f64.mul
    local.set $2
    f64.const 1
    local.get $1
    f64.const -0.499999997251031
    f64.mul
    f64.add
    local.get $2
    f64.const 0.04166662332373906
    f64.mul
    f64.add
    local.get $2
    local.get $1
    f64.mul
    f64.const -0.001388676377460993
    local.get $1
    f64.const 2.439044879627741e-05
    f64.mul
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   else
    local.get $1
    local.get $1
    local.get $1
    f64.mul
    local.tee $2
    local.get $1
    f64.mul
    local.tee $1
    f64.const -0.16666666641626524
    local.get $2
    f64.const 0.008333329385889463
    f64.mul
    f64.add
    f64.mul
    f64.add
    local.get $1
    local.get $2
    local.get $2
    f64.mul
    f64.mul
    f64.const -1.9839334836096632e-04
    local.get $2
    f64.const 2.718311493989822e-06
    f64.mul
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   end
   local.set $0
   local.get $3
   i32.const 2
   i32.and
   if
    local.get $0
    f32.neg
    local.set $0
   end
   local.get $0
   return
  end
  local.get $2
  local.get $4
  f64.const -0.16666666641626524
  local.get $1
  f64.const 0.008333329385889463
  f64.mul
  f64.add
  f64.mul
  f64.add
  local.get $4
  local.get $1
  local.get $1
  f64.mul
  f64.mul
  f64.const -1.9839334836096632e-04
  local.get $1
  f64.const 2.718311493989822e-06
  f64.mul
  f64.add
  f64.mul
  f64.add
  f32.demote_f64
 )
 (func $~lib/math/NativeMathf.cos (; 3 ;) (type $FUNCSIG$ff) (param $0 f32) (result f32)
  (local $1 f64)
  (local $2 f64)
  (local $3 i32)
  (local $4 f64)
  (local $5 i64)
  (local $6 i32)
  (local $7 i64)
  (local $8 i32)
  (local $9 i32)
  (local $10 i64)
  (local $11 i64)
  (local $12 i64)
  local.get $0
  i32.reinterpret_f32
  local.tee $3
  i32.const 31
  i32.shr_u
  local.set $6
  block $folding-inner0
   local.get $3
   i32.const 2147483647
   i32.and
   local.tee $3
   i32.const 1061752794
   i32.le_u
   if
    local.get $3
    i32.const 964689920
    i32.lt_u
    if
     f32.const 1
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $1
    local.get $1
    f64.mul
    local.tee $1
    local.get $1
    f64.mul
    local.set $2
    br $folding-inner0
   end
   local.get $3
   i32.const 1081824209
   i32.le_u
   if
    local.get $3
    i32.const 1075235811
    i32.gt_u
    if
     local.get $0
     f64.promote_f32
     f64.const 3.141592653589793
     f64.add
     local.get $0
     f64.promote_f32
     f64.const 3.141592653589793
     f64.sub
     local.get $6
     select
     local.tee $1
     local.get $1
     f64.mul
     local.tee $1
     local.get $1
     f64.mul
     local.set $2
     f64.const 1
     local.get $1
     f64.const -0.499999997251031
     f64.mul
     f64.add
     local.get $2
     f64.const 0.04166662332373906
     f64.mul
     f64.add
     local.get $2
     local.get $1
     f64.mul
     f64.const -0.001388676377460993
     local.get $1
     f64.const 2.439044879627741e-05
     f64.mul
     f64.add
     f64.mul
     f64.add
     f32.demote_f64
     f32.neg
     return
    else
     local.get $6
     if
      local.get $0
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.add
      local.tee $2
      local.get $2
      f64.mul
      local.tee $1
      local.get $2
      f64.mul
      local.set $4
     else
      f64.const 1.5707963267948966
      local.get $0
      f64.promote_f32
      f64.sub
      local.tee $2
      local.get $2
      f64.mul
      local.tee $1
      local.get $2
      f64.mul
      local.set $4
     end
     local.get $2
     local.get $4
     f64.const -0.16666666641626524
     local.get $1
     f64.const 0.008333329385889463
     f64.mul
     f64.add
     f64.mul
     f64.add
     local.get $4
     local.get $1
     local.get $1
     f64.mul
     f64.mul
     f64.const -1.9839334836096632e-04
     local.get $1
     f64.const 2.718311493989822e-06
     f64.mul
     f64.add
     f64.mul
     f64.add
     f32.demote_f64
     return
    end
    unreachable
   end
   local.get $3
   i32.const 1088565717
   i32.le_u
   if
    local.get $3
    i32.const 1085271519
    i32.gt_u
    if
     local.get $0
     f64.promote_f32
     f64.const 6.283185307179586
     f64.add
     local.get $0
     f64.promote_f32
     f64.const 6.283185307179586
     f64.sub
     local.get $6
     select
     local.tee $1
     local.get $1
     f64.mul
     local.tee $1
     local.get $1
     f64.mul
     local.set $2
     br $folding-inner0
    else
     local.get $6
     if
      local.get $0
      f32.neg
      f64.promote_f32
      f64.const 4.71238898038469
      f64.sub
      local.tee $2
      local.get $2
      f64.mul
      local.tee $1
      local.get $2
      f64.mul
      local.set $4
     else
      local.get $0
      f64.promote_f32
      f64.const 4.71238898038469
      f64.sub
      local.tee $2
      local.get $2
      f64.mul
      local.tee $1
      local.get $2
      f64.mul
      local.set $4
     end
     local.get $2
     local.get $4
     f64.const -0.16666666641626524
     local.get $1
     f64.const 0.008333329385889463
     f64.mul
     f64.add
     f64.mul
     f64.add
     local.get $4
     local.get $1
     local.get $1
     f64.mul
     f64.mul
     f64.const -1.9839334836096632e-04
     local.get $1
     f64.const 2.718311493989822e-06
     f64.mul
     f64.add
     f64.mul
     f64.add
     f32.demote_f64
     return
    end
    unreachable
   end
   local.get $3
   i32.const 2139095040
   i32.ge_u
   if
    local.get $0
    local.get $0
    f32.sub
    return
   end
   block $~lib/math/rempio2f|inlined.1 (result i32)
    local.get $3
    i32.const 1305022427
    i32.lt_u
    if
     local.get $0
     f64.promote_f32
     local.tee $2
     f64.const 0.6366197723675814
     f64.mul
     f64.nearest
     local.set $1
     local.get $2
     local.get $1
     f64.const 1.5707963109016418
     f64.mul
     f64.sub
     local.get $1
     f64.const 1.5893254773528196e-08
     f64.mul
     f64.sub
     global.set $~lib/math/rempio2f_y
     local.get $1
     i32.trunc_f64_s
     br $~lib/math/rempio2f|inlined.1
    end
    i32.const 76
    i32.load
    local.get $3
    i32.const 23
    i32.shr_s
    i32.const 152
    i32.sub
    local.tee $9
    i32.const 6
    i32.shr_s
    i32.const 3
    i32.shl
    i32.add
    local.tee $8
    i64.load
    local.set $10
    local.get $8
    i64.load offset=8
    local.set $7
    local.get $9
    i32.const 63
    i32.and
    i64.extend_i32_s
    local.tee $5
    i64.const 32
    i64.gt_u
    if (result i64)
     local.get $7
     local.get $5
     i64.const 32
     i64.sub
     i64.shl
     local.get $8
     i64.load offset=16
     i64.const 96
     local.get $5
     i64.sub
     i64.shr_u
     i64.or
    else
     local.get $7
     i64.const 32
     local.get $5
     i64.sub
     i64.shr_u
    end
    local.set $11
    f64.const 8.515303950216386e-20
    local.get $0
    f64.promote_f32
    f64.copysign
    local.get $3
    i32.const 8388607
    i32.and
    i32.const 8388608
    i32.or
    i64.extend_i32_s
    local.tee $12
    local.get $10
    local.get $5
    i64.shl
    local.get $7
    i64.const 64
    local.get $5
    i64.sub
    i64.shr_u
    i64.or
    i64.mul
    local.get $11
    local.get $12
    i64.mul
    i64.const 32
    i64.shr_u
    i64.add
    local.tee $5
    i64.const 2
    i64.shl
    local.tee $7
    f64.convert_i64_s
    f64.mul
    global.set $~lib/math/rempio2f_y
    i32.const 0
    local.get $5
    i64.const 62
    i64.shr_u
    local.get $7
    i64.const 63
    i64.shr_u
    i64.add
    i32.wrap_i64
    local.tee $3
    i32.sub
    local.get $3
    local.get $6
    select
   end
   local.set $3
   global.get $~lib/math/rempio2f_y
   local.set $1
   local.get $3
   i32.const 1
   i32.and
   if (result f32)
    local.get $1
    local.get $1
    local.get $1
    f64.mul
    local.tee $2
    local.get $1
    f64.mul
    local.tee $1
    f64.const -0.16666666641626524
    local.get $2
    f64.const 0.008333329385889463
    f64.mul
    f64.add
    f64.mul
    f64.add
    local.get $1
    local.get $2
    local.get $2
    f64.mul
    f64.mul
    f64.const -1.9839334836096632e-04
    local.get $2
    f64.const 2.718311493989822e-06
    f64.mul
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   else
    local.get $1
    local.get $1
    f64.mul
    local.tee $1
    local.get $1
    f64.mul
    local.set $2
    f64.const 1
    local.get $1
    f64.const -0.499999997251031
    f64.mul
    f64.add
    local.get $2
    f64.const 0.04166662332373906
    f64.mul
    f64.add
    local.get $2
    local.get $1
    f64.mul
    f64.const -0.001388676377460993
    local.get $1
    f64.const 2.439044879627741e-05
    f64.mul
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   end
   local.set $0
   local.get $3
   i32.const 1
   i32.add
   i32.const 2
   i32.and
   if
    local.get $0
    f32.neg
    local.set $0
   end
   local.get $0
   return
  end
  f64.const 1
  local.get $1
  f64.const -0.499999997251031
  f64.mul
  f64.add
  local.get $2
  f64.const 0.04166662332373906
  f64.mul
  f64.add
  local.get $2
  local.get $1
  f64.mul
  f64.const -0.001388676377460993
  local.get $1
  f64.const 2.439044879627741e-05
  f64.mul
  f64.add
  f64.mul
  f64.add
  f32.demote_f64
 )
 (func $assembly/07/update (; 4 ;) (type $FUNCSIG$vf) (param $0 f32)
  (local $1 f32)
  (local $2 f32)
  (local $3 f32)
  (local $4 i32)
  (local $5 i32)
  (local $6 f32)
  (local $7 f32)
  (local $8 f32)
  global.get $assembly/07/height
  f32.convert_i32_s
  local.set $1
  global.get $assembly/07/width
  f32.convert_i32_s
  local.tee $6
  f32.const 0.5
  f32.mul
  local.set $2
  local.get $0
  f32.const 2
  f32.mul
  call $~lib/math/NativeMathf.sin
  local.get $0
  call $~lib/math/NativeMathf.sin
  f32.add
  local.get $2
  f32.mul
  f32.const 0.30000001192092896
  f32.mul
  local.get $2
  f32.add
  local.set $7
  local.get $0
  call $~lib/math/NativeMathf.cos
  local.get $1
  f32.const 0.5
  f32.mul
  local.tee $3
  f32.mul
  f32.const 0.30000001192092896
  f32.mul
  local.get $3
  f32.add
  local.set $8
  local.get $0
  f32.const 4
  f32.mul
  call $~lib/math/NativeMathf.sin
  local.get $0
  f32.const 1.2000000476837158
  f32.add
  call $~lib/math/NativeMathf.sin
  f32.add
  local.get $2
  f32.mul
  f32.const 0.30000001192092896
  f32.mul
  local.get $2
  f32.add
  local.set $2
  local.get $0
  f32.const 3
  f32.mul
  call $~lib/math/NativeMathf.sin
  local.get $0
  f32.const 0.10000000149011612
  f32.add
  call $~lib/math/NativeMathf.cos
  f32.add
  local.get $3
  f32.mul
  f32.const 0.30000001192092896
  f32.mul
  local.get $3
  f32.add
  local.set $3
  f32.const 48
  local.get $6
  local.get $1
  f32.max
  f32.div
  local.set $0
  loop $continue|0
   i32.const 0
   local.set $4
   loop $continue|1
    i32.const 3
    global.set $~lib/argc
    i32.const 4
    global.set $~lib/argc
    local.get $4
    f32.convert_i32_s
    local.get $7
    f32.sub
    local.tee $1
    local.get $1
    f32.mul
    local.get $5
    f32.convert_i32_s
    local.get $8
    f32.sub
    local.tee $1
    local.get $1
    f32.mul
    f32.add
    f32.sqrt
    local.get $0
    f32.mul
    call $~lib/math/NativeMathf.sin
    local.set $1
    i32.const 4
    global.set $~lib/argc
    local.get $4
    local.get $5
    local.get $1
    local.get $4
    f32.convert_i32_s
    local.get $2
    f32.sub
    local.tee $1
    local.get $1
    f32.mul
    local.get $5
    f32.convert_i32_s
    local.get $3
    f32.sub
    local.tee $1
    local.get $1
    f32.mul
    f32.add
    f32.sqrt
    local.get $0
    f32.mul
    call $~lib/math/NativeMathf.sin
    f32.add
    f32.abs
    f32.const 120
    f32.mul
    call $start:assembly/07~anonymous|0
    local.get $4
    i32.const 1
    i32.add
    local.tee $4
    global.get $assembly/07/width
    i32.ne
    br_if $continue|1
   end
   local.get $5
   i32.const 1
   i32.add
   local.tee $5
   global.get $assembly/07/height
   i32.ne
   br_if $continue|0
  end
 )
 (func $assembly/07/resize (; 5 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $0
  global.set $assembly/07/width
  local.get $1
  global.set $assembly/07/height
  global.get $assembly/07/offset
  local.get $0
  local.get $1
  i32.mul
  i32.const 2
  i32.shl
  i32.const 65535
  i32.add
  i32.add
  i32.const -65536
  i32.and
  i32.const 16
  i32.shr_u
  local.tee $0
  memory.size
  local.tee $1
  i32.gt_s
  if
   local.get $0
   local.get $1
   i32.sub
   memory.grow
   drop
  end
 )
 (func $start (; 6 ;) (type $FUNCSIG$v)
  i32.const 88
  global.set $assembly/07/offset
 )
 (func $null (; 7 ;) (type $FUNCSIG$v)
  unreachable
 )
)
