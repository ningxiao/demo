(module
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $f64_=>_none (func (param f64)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $none_=>_f64 (func (result f64)))
 (type $none_=>_none (func))
 (import "env" "memory" (memory $0 (shared 1 80)))
 (data (i32.const 1036) "<\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e\00\00\00\00\00")
 (data (i32.const 1100) "<\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00s\00t\00u\00b\00.\00t\00s\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1164) ",\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h\00")
 (data (i32.const 1212) "<\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s\00\00\00\00\00\00\00")
 (data (i32.const 1276) "\1c\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\08\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1308) "<\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00$\00\00\00K\00e\00y\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1372) ",\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\16\00\00\00~\00l\00i\00b\00/\00m\00a\00p\00.\00t\00s\00\00\00\00\00\00\00")
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "Math" "random" (func $~lib/bindings/Math/random (result f64)))
 (import "worker" "consoleLog" (func $assembly/worker/consoleLog (param f64)))
 (import "worker" "sayHello" (func $assembly/worker/sayHello (param f64)))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $assembly/worker/DATA_MAP (mut i32) (i32.const 0))
 (global $assembly/worker/GET_THIS_CONSTANT_FROM_JAVASCRIPT i32 (i32.const 2424))
 (table $0 2 funcref)
 (elem $0 (i32.const 1) $start:assembly/worker~anonymous|0)
 (export "GET_THIS_CONSTANT_FROM_JAVASCRIPT" (global $assembly/worker/GET_THIS_CONSTANT_FROM_JAVASCRIPT))
 (export "add" (func $assembly/worker/add))
 (export "callMeFromJavascript" (func $assembly/worker/callMeFromJavascript))
 (export "utils.get_data_map" (func $assembly/worker/utils.get_data_map))
 (export "calculation" (func $assembly/worker/calculation))
 (export "colorAdjustProcess" (func $assembly/worker/colorAdjustProcess))
 (export "colorInvertProcess" (func $assembly/worker/colorInvertProcess))
 (export "memory" (memory $0))
 (start $~start)
 (func $~lib/rt/stub/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  i32.const 1073741804
  i32.gt_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 86
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 16
  i32.add
  local.tee $2
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 33
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/stub/offset
  local.tee $6
  i32.const 4
  i32.add
  local.tee $4
  local.get $2
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.tee $7
  i32.add
  local.tee $2
  memory.size
  local.tee $5
  i32.const 16
  i32.shl
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $3
  i32.gt_u
  if
   local.get $5
   local.get $2
   local.get $3
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $3
   local.get $3
   local.get $5
   i32.lt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $3
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $2
  global.set $~lib/rt/stub/offset
  local.get $6
  local.get $7
  i32.store
  local.get $4
  i32.const 4
  i32.sub
  local.tee $2
  i32.const 0
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  local.get $4
  i32.const 16
  i32.add
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1184
   i32.const 1232
   i32.const 49
   i32.const 43
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 0
  call $~lib/rt/stub/__new
  local.tee $3
  local.set $1
  block $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   local.tee $2
   i32.const 1
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8 offset=1
   local.get $1
   i32.const 0
   i32.store8 offset=2
   local.get $2
   i32.const 2
   i32.sub
   i32.const 0
   i32.store8
   local.get $2
   i32.const 3
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8 offset=3
   local.get $2
   i32.const 4
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   local.get $1
   i32.sub
   i32.const 3
   i32.and
   local.tee $2
   i32.add
   local.tee $1
   i32.const 0
   i32.store
   local.get $1
   local.get $0
   local.get $2
   i32.sub
   i32.const -4
   i32.and
   local.tee $2
   i32.add
   local.tee $0
   i32.const 4
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $0
   i32.const 12
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 8
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store offset=12
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $1
   i32.const 0
   i32.store offset=20
   local.get $1
   i32.const 0
   i32.store offset=24
   local.get $0
   i32.const 28
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 24
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 20
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 16
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   local.get $1
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $1
   i32.add
   local.set $0
   local.get $2
   local.get $1
   i32.sub
   local.set $1
   loop $while-continue|0
    local.get $1
    i32.const 32
    i32.ge_u
    if
     local.get $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     local.get $0
     i64.const 0
     i64.store offset=16
     local.get $0
     i64.const 0
     i64.store offset=24
     local.get $1
     i32.const 32
     i32.sub
     local.set $1
     local.get $0
     i32.const 32
     i32.add
     local.set $0
     br $while-continue|0
    end
   end
  end
  local.get $3
 )
 (func $start:assembly/worker~anonymous|0 (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
  i32.const 1
  i32.add
 )
 (func $assembly/worker/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/worker/callMeFromJavascript (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 1296
  i32.load
  call_indirect $0 (type $i32_i32_=>_i32)
 )
 (func $assembly/worker/utils.get_data_map (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $assembly/worker/DATA_MAP
  local.tee $2
  i32.load
  local.get $2
  i32.load offset=4
  local.get $0
  i32.const -1028477379
  i32.mul
  i32.const 374761397
  i32.add
  i32.const 17
  i32.rotl
  i32.const 668265263
  i32.mul
  local.tee $1
  local.get $1
  i32.const 15
  i32.shr_u
  i32.xor
  i32.const -2048144777
  i32.mul
  local.tee $1
  local.get $1
  i32.const 13
  i32.shr_u
  i32.xor
  i32.const -1028477379
  i32.mul
  local.tee $1
  local.get $1
  i32.const 16
  i32.shr_u
  i32.xor
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $1
  block $__inlined_func$~lib/map/Map<i32,~lib/string/String>#find
   loop $while-continue|0
    local.get $1
    if
     local.get $1
     i32.load offset=8
     local.tee $2
     i32.const 1
     i32.and
     if (result i32)
      i32.const 0
     else
      local.get $0
      local.get $1
      i32.load
      i32.eq
     end
     br_if $__inlined_func$~lib/map/Map<i32,~lib/string/String>#find
     local.get $2
     i32.const -2
     i32.and
     local.set $1
     br $while-continue|0
    end
   end
   i32.const 0
   local.set $1
  end
  local.get $1
  if (result i32)
   block $__inlined_func$~lib/map/Map<i32,~lib/string/String>#find0 (result i32)
    global.get $assembly/worker/DATA_MAP
    local.tee $2
    i32.load
    local.get $2
    i32.load offset=4
    local.get $0
    i32.const -1028477379
    i32.mul
    i32.const 374761397
    i32.add
    i32.const 17
    i32.rotl
    i32.const 668265263
    i32.mul
    local.tee $1
    local.get $1
    i32.const 15
    i32.shr_u
    i32.xor
    i32.const -2048144777
    i32.mul
    local.tee $1
    local.get $1
    i32.const 13
    i32.shr_u
    i32.xor
    i32.const -1028477379
    i32.mul
    local.tee $1
    local.get $1
    i32.const 16
    i32.shr_u
    i32.xor
    i32.and
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $1
    loop $while-continue|02
     local.get $1
     if
      local.get $1
      local.get $1
      i32.load offset=8
      local.tee $2
      i32.const 1
      i32.and
      if (result i32)
       i32.const 0
      else
       local.get $0
       local.get $1
       i32.load
       i32.eq
      end
      br_if $__inlined_func$~lib/map/Map<i32,~lib/string/String>#find0
      drop
      local.get $2
      i32.const -2
      i32.and
      local.set $1
      br $while-continue|02
     end
    end
    i32.const 0
   end
   local.tee $0
   i32.eqz
   if
    i32.const 1328
    i32.const 1392
    i32.const 105
    i32.const 17
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.load offset=4
  else
   i32.const 0
  end
 )
 (func $assembly/worker/calculation (param $0 i32) (param $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 10
  i32.add
  i32.const 65535
  i32.and
  local.set $2
  loop $for-loop|0
   local.get $0
   i32.const 65535
   i32.and
   local.get $2
   i32.lt_u
   if
    local.get $0
    i32.const 1
    i32.shl
    i32.const 65535
    i32.and
    local.get $1
    i32.store16
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
 )
 (func $assembly/worker/colorAdjustProcess (param $0 i32) (param $1 i32)
  (local $2 f64)
  (local $3 f64)
  (local $4 f64)
  local.get $0
  local.get $1
  i32.add
  local.set $1
  loop $for-loop|0
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $0
    local.get $0
    i32.load8_u
    f64.convert_i32_u
    local.tee $2
    f64.const 0.272
    f64.mul
    local.get $0
    i32.const 1
    i32.add
    i32.load8_u
    f64.convert_i32_u
    local.tee $3
    f64.const 0.534
    f64.mul
    f64.add
    local.get $0
    i32.const 2
    i32.add
    i32.load8_u
    f64.convert_i32_u
    local.tee $4
    f64.const 0.131
    f64.mul
    f64.add
    i32.trunc_f64_u
    i32.store8
    local.get $0
    local.get $2
    f64.const 0.349
    f64.mul
    local.get $3
    f64.const 0.686
    f64.mul
    f64.add
    local.get $4
    f64.const 0.168
    f64.mul
    f64.add
    i32.trunc_f64_u
    i32.store8 offset=1
    local.get $0
    local.get $2
    f64.const 0.393
    f64.mul
    local.get $3
    f64.const 0.769
    f64.mul
    f64.add
    local.get $4
    f64.const 0.189
    f64.mul
    f64.add
    i32.trunc_f64_u
    i32.store8 offset=2
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
 )
 (func $assembly/worker/colorInvertProcess (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  local.get $1
  i32.add
  local.set $1
  loop $for-loop|0
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $0
    i32.const 1
    i32.add
    i32.load8_u
    local.set $2
    local.get $0
    i32.const 2
    i32.add
    i32.load8_u
    local.set $3
    local.get $0
    i32.const 255
    local.get $0
    i32.load8_u
    i32.sub
    i32.store8
    local.get $0
    i32.const 255
    local.get $2
    i32.sub
    i32.store8 offset=1
    local.get $0
    i32.const 255
    local.get $3
    i32.sub
    i32.store8 offset=2
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
 )
 (func $~start
  (local $0 i32)
  i32.const 1420
  global.set $~lib/rt/stub/offset
  i32.const 24
  i32.const 3
  call $~lib/rt/stub/__new
  local.tee $0
  i32.const 16
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store
  local.get $0
  i32.const 3
  i32.store offset=4
  local.get $0
  i32.const 48
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store offset=8
  local.get $0
  i32.const 4
  i32.store offset=12
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
  local.get $0
  global.set $assembly/worker/DATA_MAP
  call $~lib/bindings/Math/random
  call $assembly/worker/consoleLog
  f64.const 12
  call $assembly/worker/sayHello
 )
)
