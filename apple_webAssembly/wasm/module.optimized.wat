(module
 (type $FUNCSIG$d (func (result f64)))
 (type $FUNCSIG$vd (func (param f64)))
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (import "Math" "random" (func $~lib/bindings/Math/random (result f64)))
 (import "module" "consoleLog" (func $assembly/module/consoleLog (param f64)))
 (import "module" "sayHello" (func $assembly/module/sayHello (param f64)))
 (memory $0 0)
 (global $assembly/module/GET_THIS_CONSTANT_FROM_JAVASCRIPT i32 (i32.const 2424))
 (export "memory" (memory $0))
 (export "GET_THIS_CONSTANT_FROM_JAVASCRIPT" (global $assembly/module/GET_THIS_CONSTANT_FROM_JAVASCRIPT))
 (export "add" (func $assembly/module/add))
 (export "callMeFromJavascript" (func $assembly/module/callMeFromJavascript))
 (start $start)
 (func $assembly/module/add (; 3 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/module/callMeFromJavascript (; 4 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
  i32.const 1
  i32.add
 )
 (func $start (; 5 ;) (type $FUNCSIG$v)
  call $~lib/bindings/Math/random
  call $assembly/module/consoleLog
  f64.const 12
  call $assembly/module/sayHello
 )
 (func $null (; 6 ;) (type $FUNCSIG$v)
  unreachable
 )
)
