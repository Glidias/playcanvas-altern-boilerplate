// Enum: haxe.macro.AnonStatus

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var AnonStatus = $hxClasses["haxe.macro.AnonStatus"] = { __ename__: ["haxe","macro","AnonStatus"], __constructs__: ["AClosed","AOpened","AConst","AExtend","AClassStatics","AEnumStatics","AAbstractStatics"] }

AnonStatus.AOpened = ["AOpened",1];
AnonStatus.AOpened.toString = $estr;
AnonStatus.AOpened.__enum__ = AnonStatus;

AnonStatus.AClassStatics = function(t) { var $x = ["AClassStatics",4,t]; $x.__enum__ = AnonStatus; $x.toString = $estr; return $x; }
AnonStatus.AConst = ["AConst",2];
AnonStatus.AConst.toString = $estr;
AnonStatus.AConst.__enum__ = AnonStatus;

AnonStatus.AEnumStatics = function(t) { var $x = ["AEnumStatics",5,t]; $x.__enum__ = AnonStatus; $x.toString = $estr; return $x; }
AnonStatus.AExtend = function(tl) { var $x = ["AExtend",3,tl]; $x.__enum__ = AnonStatus; $x.toString = $estr; return $x; }
AnonStatus.AClosed = ["AClosed",0];
AnonStatus.AClosed.toString = $estr;
AnonStatus.AClosed.__enum__ = AnonStatus;

AnonStatus.AAbstractStatics = function(t) { var $x = ["AAbstractStatics",6,t]; $x.__enum__ = AnonStatus; $x.toString = $estr; return $x; }

exports.default = AnonStatus;