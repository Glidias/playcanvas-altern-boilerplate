// Enum: haxe.macro.ComplexType

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var ComplexType = $hxClasses["haxe.macro.ComplexType"] = { __ename__: ["haxe","macro","ComplexType"], __constructs__: ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] }

ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = ComplexType; $x.toString = $estr; return $x; }
ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = ComplexType; $x.toString = $estr; return $x; }
ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = ComplexType; $x.toString = $estr; return $x; }
ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = ComplexType; $x.toString = $estr; return $x; }
ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = ComplexType; $x.toString = $estr; return $x; }
ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = ComplexType; $x.toString = $estr; return $x; }

exports.default = ComplexType;