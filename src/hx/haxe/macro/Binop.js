// Enum: haxe.macro.Binop

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var Binop = $hxClasses["haxe.macro.Binop"] = { __ename__: ["haxe","macro","Binop"], __constructs__: ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] }

Binop.OpShr = ["OpShr",17];
Binop.OpShr.toString = $estr;
Binop.OpShr.__enum__ = Binop;

Binop.OpUShr = ["OpUShr",18];
Binop.OpUShr.toString = $estr;
Binop.OpUShr.__enum__ = Binop;

Binop.OpLte = ["OpLte",10];
Binop.OpLte.toString = $estr;
Binop.OpLte.__enum__ = Binop;

Binop.OpAdd = ["OpAdd",0];
Binop.OpAdd.toString = $estr;
Binop.OpAdd.__enum__ = Binop;

Binop.OpEq = ["OpEq",5];
Binop.OpEq.toString = $estr;
Binop.OpEq.__enum__ = Binop;

Binop.OpInterval = ["OpInterval",21];
Binop.OpInterval.toString = $estr;
Binop.OpInterval.__enum__ = Binop;

Binop.OpMult = ["OpMult",1];
Binop.OpMult.toString = $estr;
Binop.OpMult.__enum__ = Binop;

Binop.OpShl = ["OpShl",16];
Binop.OpShl.toString = $estr;
Binop.OpShl.__enum__ = Binop;

Binop.OpBoolAnd = ["OpBoolAnd",14];
Binop.OpBoolAnd.toString = $estr;
Binop.OpBoolAnd.__enum__ = Binop;

Binop.OpDiv = ["OpDiv",2];
Binop.OpDiv.toString = $estr;
Binop.OpDiv.__enum__ = Binop;

Binop.OpAnd = ["OpAnd",11];
Binop.OpAnd.toString = $estr;
Binop.OpAnd.__enum__ = Binop;

Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = Binop; $x.toString = $estr; return $x; }
Binop.OpGte = ["OpGte",8];
Binop.OpGte.toString = $estr;
Binop.OpGte.__enum__ = Binop;

Binop.OpGt = ["OpGt",7];
Binop.OpGt.toString = $estr;
Binop.OpGt.__enum__ = Binop;

Binop.OpXor = ["OpXor",13];
Binop.OpXor.toString = $estr;
Binop.OpXor.__enum__ = Binop;

Binop.OpNotEq = ["OpNotEq",6];
Binop.OpNotEq.toString = $estr;
Binop.OpNotEq.__enum__ = Binop;

Binop.OpOr = ["OpOr",12];
Binop.OpOr.toString = $estr;
Binop.OpOr.__enum__ = Binop;

Binop.OpSub = ["OpSub",3];
Binop.OpSub.toString = $estr;
Binop.OpSub.__enum__ = Binop;

Binop.OpBoolOr = ["OpBoolOr",15];
Binop.OpBoolOr.toString = $estr;
Binop.OpBoolOr.__enum__ = Binop;

Binop.OpMod = ["OpMod",19];
Binop.OpMod.toString = $estr;
Binop.OpMod.__enum__ = Binop;

Binop.OpLt = ["OpLt",9];
Binop.OpLt.toString = $estr;
Binop.OpLt.__enum__ = Binop;

Binop.OpArrow = ["OpArrow",22];
Binop.OpArrow.toString = $estr;
Binop.OpArrow.__enum__ = Binop;

Binop.OpAssign = ["OpAssign",4];
Binop.OpAssign.toString = $estr;
Binop.OpAssign.__enum__ = Binop;


exports.default = Binop;