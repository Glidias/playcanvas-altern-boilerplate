// Enum: haxe.macro.TConstant

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var TConstant = $hxClasses["haxe.macro.TConstant"] = { __ename__: ["haxe","macro","TConstant"], __constructs__: ["TInt","TFloat","TString","TBool","TNull","TThis","TSuper"] }

TConstant.TNull = ["TNull",4];
TConstant.TNull.toString = $estr;
TConstant.TNull.__enum__ = TConstant;

TConstant.TString = function(s) { var $x = ["TString",2,s]; $x.__enum__ = TConstant; $x.toString = $estr; return $x; }
TConstant.TInt = function(i) { var $x = ["TInt",0,i]; $x.__enum__ = TConstant; $x.toString = $estr; return $x; }
TConstant.TSuper = ["TSuper",6];
TConstant.TSuper.toString = $estr;
TConstant.TSuper.__enum__ = TConstant;

TConstant.TFloat = function(s) { var $x = ["TFloat",1,s]; $x.__enum__ = TConstant; $x.toString = $estr; return $x; }
TConstant.TThis = ["TThis",5];
TConstant.TThis.toString = $estr;
TConstant.TThis.__enum__ = TConstant;

TConstant.TBool = function(b) { var $x = ["TBool",3,b]; $x.__enum__ = TConstant; $x.toString = $estr; return $x; }

exports.default = TConstant;