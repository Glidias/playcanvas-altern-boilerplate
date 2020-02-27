// Enum: haxe.macro.ImportMode

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var ImportMode = $hxClasses["haxe.macro.ImportMode"] = { __ename__: ["haxe","macro","ImportMode"], __constructs__: ["INormal","IAsName","IAll"] }

ImportMode.IAsName = function(alias) { var $x = ["IAsName",1,alias]; $x.__enum__ = ImportMode; $x.toString = $estr; return $x; }
ImportMode.INormal = ["INormal",0];
ImportMode.INormal.toString = $estr;
ImportMode.INormal.__enum__ = ImportMode;

ImportMode.IAll = ["IAll",2];
ImportMode.IAll.toString = $estr;
ImportMode.IAll.__enum__ = ImportMode;


exports.default = ImportMode;