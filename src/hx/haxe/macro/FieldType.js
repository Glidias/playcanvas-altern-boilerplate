// Enum: haxe.macro.FieldType

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var FieldType = $hxClasses["haxe.macro.FieldType"] = { __ename__: ["haxe","macro","FieldType"], __constructs__: ["FVar","FFun","FProp"] }

FieldType.FFun = function(f) { var $x = ["FFun",1,f]; $x.__enum__ = FieldType; $x.toString = $estr; return $x; }
FieldType.FVar = function(t,e) { var $x = ["FVar",0,t,e]; $x.__enum__ = FieldType; $x.toString = $estr; return $x; }
FieldType.FProp = function(get,set,t,e) { var $x = ["FProp",2,get,set,t,e]; $x.__enum__ = FieldType; $x.toString = $estr; return $x; }

exports.default = FieldType;