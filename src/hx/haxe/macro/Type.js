// Enum: haxe.macro.Type

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var Type = $hxClasses["haxe.macro.Type"] = { __ename__: ["haxe","macro","Type"], __constructs__: ["TMono","TEnum","TInst","TType","TFun","TAnonymous","TDynamic","TLazy","TAbstract"] }

Type.TDynamic = function(t) { var $x = ["TDynamic",6,t]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TAbstract = function(t,params) { var $x = ["TAbstract",8,t,params]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TType = function(t,params) { var $x = ["TType",3,t,params]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TEnum = function(t,params) { var $x = ["TEnum",1,t,params]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TFun = function(args,ret) { var $x = ["TFun",4,args,ret]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TInst = function(t,params) { var $x = ["TInst",2,t,params]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TLazy = function(f) { var $x = ["TLazy",7,f]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TAnonymous = function(a) { var $x = ["TAnonymous",5,a]; $x.__enum__ = Type; $x.toString = $estr; return $x; }
Type.TMono = function(t) { var $x = ["TMono",0,t]; $x.__enum__ = Type; $x.toString = $estr; return $x; }

exports.default = Type;