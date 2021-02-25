(module
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $f64_=>_none (func (param f64)))
 (type $none_=>_none (func))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $none_=>_i64 (func (result i64)))
 (type $none_=>_f64 (func (result f64)))
 (import "env" "memory" (memory $0 1))
 (data (i32.const 1036) "\1c\00\00\00\00\00\00\00\00\00\00\00\03\00\00\00\08\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00")
 (import "Math" "random" (func $~lib/bindings/Math/random (result f64)))
 (import "module" "consoleLog" (func $assembly/module/consoleLog (param f64)))
 (import "module" "sayHello" (func $assembly/module/sayHello (param f64)))
 (table $0 2 funcref)
 (elem (i32.const 1) $start:assembly/module~anonymous|0)
 (global $assembly/module/GET_THIS_CONSTANT_FROM_JAVASCRIPT i32 (i32.const 2424))
 (export "GET_THIS_CONSTANT_FROM_JAVASCRIPT" (global $assembly/module/GET_THIS_CONSTANT_FROM_JAVASCRIPT))
 (export "add" (func $assembly/module/add))
 (export "callMeFromJavascript" (func $assembly/module/callMeFromJavascript))
 (export "getGlobal" (func $assembly/module/getGlobal))
 (export "calculation" (func $assembly/module/calculation))
 (export "memory" (memory $0))
 (start $~start)
 (func $start:assembly/module~anonymous|0 (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
  i32.const 1
  i32.add
 )
 (func $assembly/module/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/module/callMeFromJavascript (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 1056
  i32.load
  call_indirect (type $i32_i32_=>_i32)
 )
 (func $assembly/module/getGlobal (result i64)
  i64.const 42
 )
 (func $assembly/module/calculation (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  loop $for-loop|1
   local.get $1
   i32.const 65535
   i32.and
   i32.const 10
   i32.lt_u
   if
    local.get $1
    i32.const 1
    i32.shl
    i32.const 65535
    i32.and
    local.tee $2
    local.get $2
    i32.load16_u
    i32.const 12
    i32.add
    i32.store16
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|1
   end
  end
  local.get $0
  i32.const 1
  i32.sub
  i32.const 1
  i32.shl
  i32.const 65535
  i32.and
  i32.load16_u
 )
 (func $~start
  call $~lib/bindings/Math/random
  call $assembly/module/consoleLog
  f64.const 12
  call $assembly/module/sayHello
 )
)
