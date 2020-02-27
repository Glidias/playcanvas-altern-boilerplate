// Enum: haxe.macro.FieldAccess

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var FieldAccess = $hxClasses["haxe.macro.FieldAccess"] = { __ename__: ["haxe","macro","FieldAccess"], __constructs__: ["FInstance","FStatic","FAnon","FDynamic","FClosure","FEnum"] }

FieldAccess.FAnon = function(cf) { var $x = ["FAnon",2,cf]; $x.__enum__ = FieldAccess; $x.toString = $estr; return $x; }
FieldAccess.FClosure = function(c,cf) { var $x = ["FClosure",4,c,cf]; $x.__enum__ = FieldAccess; $x.toString = $estr; return $x; }
FieldAccess.FStatic = function(c,cf) { var $x = ["FStatic",1,c,cf]; $x.__enum__ = FieldAccess; $x.toString = $estr; return $x; }
FieldAccess.FDynamic = function(s) { var $x = ["FDynamic",3,s]; $x.__enum__ = FieldAccess; $x.toString = $estr; return $x; }
FieldAccess.FInstance = function(c,params,cf) { var $x = ["FInstance",0,c,params,cf]; $x.__enum__ = FieldAccess; $x.toString = $estr; return $x; }
FieldAccess.FEnum = function(e,ef) { var $x = ["FEnum",5,e,ef]; $x.__enum__ = FieldAccess; $x.toString = $estr; return $x; }

exports.default = FieldAccess;