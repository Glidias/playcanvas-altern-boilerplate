// Enum: haxe.macro.TypeParam

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var TypeParam = $hxClasses["haxe.macro.TypeParam"] = { __ename__: ["haxe","macro","TypeParam"], __constructs__: ["TPType","TPExpr"] }

TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = TypeParam; $x.toString = $estr; return $x; }
TypeParam.TPExpr = function(e) { var $x = ["TPExpr",1,e]; $x.__enum__ = TypeParam; $x.toString = $estr; return $x; }

exports.default = TypeParam;