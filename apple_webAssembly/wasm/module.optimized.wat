(module
 (type $FUNCSIG$d (func (result f64)))
 (type $FUNCSIG$vd (func (param f64)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (import "env" "memory" (memory $0 0))
 (import "Math" "random" (func $~lib/bindings/Math/random (result f64)))
 (import "module" "consoleLog" (func $assembly/module/consoleLog (param f64)))
 (import "module" "sayHello" (func $assembly/module/sayHello (param f64)))
 (table $0 2 funcref)
 (elem (i32.const 0) $null $start:assembly/module~anonymous|0)
 (global $assembly/module/GET_THIS_CONSTANT_FROM_JAVASCRIPT i32 (i32.const 2424))
 (global $~lib/argc (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "GET_THIS_CONSTANT_FROM_JAVASCRIPT" (global $assembly/module/GET_THIS_CONSTANT_FROM_JAVASCRIPT))
 (export "add" (func $assembly/module/add))
 (export "callMeFromJavascript" (func $assembly/module/callMeFromJavascript))
 (export "calculation" (func $assembly/module/calculation))
 (start $start)
 (func $start:assembly/module~anonymous|0 (; 3 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
  i32.const 1
  i32.add
 )
 (func $assembly/module/add (; 4 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/module/callMeFromJavascript (; 5 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  i32.const 2
  global.set $~lib/argc
  local.get $0
  local.get $1
  i32.add
  i32.const 1
  i32.add
 )
 (func $assembly/module/calculation (; 6 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  loop $loop|0
   block $break|0
    local.get $1
    i32.const 10
    i32.ge_u
    br_if $break|0
    local.get $1
    i32.const 1
    i32.shl
    i32.const 65535
    i32.and
    local.tee $2
    i32.load16_u
    local.set $3
    local.get $2
    local.get $3
    i32.const 12
    i32.add
    i32.store16
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $loop|0
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
 (func $start (; 7 ;) (type $FUNCSIG$v)
  call $~lib/bindings/Math/random
  call $assembly/module/consoleLog
  f64.const 12
  call $assembly/module/sayHello
 )
 (func $null (; 8 ;) (type $FUNCSIG$v)
  unreachable
 )
)
