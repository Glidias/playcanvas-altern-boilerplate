// Enum: haxe.macro.FieldKind

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var FieldKind = $hxClasses["haxe.macro.FieldKind"] = { __ename__: ["haxe","macro","FieldKind"], __constructs__: ["FVar","FMethod"] }

FieldKind.FVar = function(read,write) { var $x = ["FVar",0,read,write]; $x.__enum__ = FieldKind; $x.toString = $estr; return $x; }
FieldKind.FMethod = function(k) { var $x = ["FMethod",1,k]; $x.__enum__ = FieldKind; $x.toString = $estr; return $x; }

exports.default = FieldKind;