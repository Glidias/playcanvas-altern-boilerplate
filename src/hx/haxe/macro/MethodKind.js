// Enum: haxe.macro.MethodKind

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var MethodKind = $hxClasses["haxe.macro.MethodKind"] = { __ename__: ["haxe","macro","MethodKind"], __constructs__: ["MethNormal","MethInline","MethDynamic","MethMacro"] }

MethodKind.MethInline = ["MethInline",1];
MethodKind.MethInline.toString = $estr;
MethodKind.MethInline.__enum__ = MethodKind;

MethodKind.MethNormal = ["MethNormal",0];
MethodKind.MethNormal.toString = $estr;
MethodKind.MethNormal.__enum__ = MethodKind;

MethodKind.MethDynamic = ["MethDynamic",2];
MethodKind.MethDynamic.toString = $estr;
MethodKind.MethDynamic.__enum__ = MethodKind;

MethodKind.MethMacro = ["MethMacro",3];
MethodKind.MethMacro.toString = $estr;
MethodKind.MethMacro.__enum__ = MethodKind;


exports.default = MethodKind;