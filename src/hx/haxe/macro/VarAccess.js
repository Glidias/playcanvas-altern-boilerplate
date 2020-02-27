// Enum: haxe.macro.VarAccess

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var VarAccess = $hxClasses["haxe.macro.VarAccess"] = { __ename__: ["haxe","macro","VarAccess"], __constructs__: ["AccNormal","AccNo","AccNever","AccResolve","AccCall","AccInline","AccRequire"] }

VarAccess.AccCall = ["AccCall",4];
VarAccess.AccCall.toString = $estr;
VarAccess.AccCall.__enum__ = VarAccess;

VarAccess.AccRequire = function(r,msg) { var $x = ["AccRequire",6,r,msg]; $x.__enum__ = VarAccess; $x.toString = $estr; return $x; }
VarAccess.AccNormal = ["AccNormal",0];
VarAccess.AccNormal.toString = $estr;
VarAccess.AccNormal.__enum__ = VarAccess;

VarAccess.AccNever = ["AccNever",2];
VarAccess.AccNever.toString = $estr;
VarAccess.AccNever.__enum__ = VarAccess;

VarAccess.AccNo = ["AccNo",1];
VarAccess.AccNo.toString = $estr;
VarAccess.AccNo.__enum__ = VarAccess;

VarAccess.AccInline = ["AccInline",5];
VarAccess.AccInline.toString = $estr;
VarAccess.AccInline.__enum__ = VarAccess;

VarAccess.AccResolve = ["AccResolve",3];
VarAccess.AccResolve.toString = $estr;
VarAccess.AccResolve.__enum__ = VarAccess;


exports.default = VarAccess;