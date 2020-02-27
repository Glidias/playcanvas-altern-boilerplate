// Enum: haxe.macro.Unop

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var Unop = $hxClasses["haxe.macro.Unop"] = { __ename__: ["haxe","macro","Unop"], __constructs__: ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] }

Unop.OpDecrement = ["OpDecrement",1];
Unop.OpDecrement.toString = $estr;
Unop.OpDecrement.__enum__ = Unop;

Unop.OpNeg = ["OpNeg",3];
Unop.OpNeg.toString = $estr;
Unop.OpNeg.__enum__ = Unop;

Unop.OpNot = ["OpNot",2];
Unop.OpNot.toString = $estr;
Unop.OpNot.__enum__ = Unop;

Unop.OpNegBits = ["OpNegBits",4];
Unop.OpNegBits.toString = $estr;
Unop.OpNegBits.__enum__ = Unop;

Unop.OpIncrement = ["OpIncrement",0];
Unop.OpIncrement.toString = $estr;
Unop.OpIncrement.__enum__ = Unop;


exports.default = Unop;