// Enum: haxe.macro.ModuleType

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var ModuleType = $hxClasses["haxe.macro.ModuleType"] = { __ename__: ["haxe","macro","ModuleType"], __constructs__: ["TClassDecl","TEnumDecl","TTypeDecl","TAbstract"] }

ModuleType.TEnumDecl = function(e) { var $x = ["TEnumDecl",1,e]; $x.__enum__ = ModuleType; $x.toString = $estr; return $x; }
ModuleType.TAbstract = function(a) { var $x = ["TAbstract",3,a]; $x.__enum__ = ModuleType; $x.toString = $estr; return $x; }
ModuleType.TClassDecl = function(c) { var $x = ["TClassDecl",0,c]; $x.__enum__ = ModuleType; $x.toString = $estr; return $x; }
ModuleType.TTypeDecl = function(t) { var $x = ["TTypeDecl",2,t]; $x.__enum__ = ModuleType; $x.toString = $estr; return $x; }

exports.default = ModuleType;