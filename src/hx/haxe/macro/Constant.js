// Enum: haxe.macro.Constant

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var Constant = $hxClasses["haxe.macro.Constant"] = { __ename__: ["haxe","macro","Constant"], __constructs__: ["CInt","CFloat","CString","CIdent","CRegexp"] }

Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = Constant; $x.toString = $estr; return $x; }
Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = Constant; $x.toString = $estr; return $x; }
Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = Constant; $x.toString = $estr; return $x; }
Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = Constant; $x.toString = $estr; return $x; }
Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",4,r,opt]; $x.__enum__ = Constant; $x.toString = $estr; return $x; }

exports.default = Constant;