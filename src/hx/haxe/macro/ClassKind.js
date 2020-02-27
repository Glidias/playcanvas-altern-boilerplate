// Enum: haxe.macro.ClassKind

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var ClassKind = $hxClasses["haxe.macro.ClassKind"] = { __ename__: ["haxe","macro","ClassKind"], __constructs__: ["KNormal","KTypeParameter","KExtension","KExpr","KGeneric","KGenericInstance","KMacroType","KAbstractImpl","KGenericBuild"] }

ClassKind.KGeneric = ["KGeneric",4];
ClassKind.KGeneric.toString = $estr;
ClassKind.KGeneric.__enum__ = ClassKind;

ClassKind.KExtension = function(cl,params) { var $x = ["KExtension",2,cl,params]; $x.__enum__ = ClassKind; $x.toString = $estr; return $x; }
ClassKind.KMacroType = ["KMacroType",6];
ClassKind.KMacroType.toString = $estr;
ClassKind.KMacroType.__enum__ = ClassKind;

ClassKind.KAbstractImpl = function(a) { var $x = ["KAbstractImpl",7,a]; $x.__enum__ = ClassKind; $x.toString = $estr; return $x; }
ClassKind.KExpr = function(expr) { var $x = ["KExpr",3,expr]; $x.__enum__ = ClassKind; $x.toString = $estr; return $x; }
ClassKind.KGenericInstance = function(cl,params) { var $x = ["KGenericInstance",5,cl,params]; $x.__enum__ = ClassKind; $x.toString = $estr; return $x; }
ClassKind.KTypeParameter = function(constraints) { var $x = ["KTypeParameter",1,constraints]; $x.__enum__ = ClassKind; $x.toString = $estr; return $x; }
ClassKind.KGenericBuild = ["KGenericBuild",8];
ClassKind.KGenericBuild.toString = $estr;
ClassKind.KGenericBuild.__enum__ = ClassKind;

ClassKind.KNormal = ["KNormal",0];
ClassKind.KNormal.toString = $estr;
ClassKind.KNormal.__enum__ = ClassKind;


exports.default = ClassKind;