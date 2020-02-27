// Enum: haxe.macro.TypedExprDef

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var TypedExprDef = $hxClasses["haxe.macro.TypedExprDef"] = { __ename__: ["haxe","macro","TypedExprDef"], __constructs__: ["TConst","TLocal","TArray","TBinop","TField","TTypeExpr","TParenthesis","TObjectDecl","TArrayDecl","TCall","TNew","TUnop","TFunction","TVar","TBlock","TFor","TIf","TWhile","TSwitch","TTry","TReturn","TBreak","TContinue","TThrow","TCast","TMeta","TEnumParameter"] }

TypedExprDef.TBlock = function(el) { var $x = ["TBlock",14,el]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TBreak = ["TBreak",21];
TypedExprDef.TBreak.toString = $estr;
TypedExprDef.TBreak.__enum__ = TypedExprDef;

TypedExprDef.TEnumParameter = function(e1,ef,index) { var $x = ["TEnumParameter",26,e1,ef,index]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TMeta = function(m,e1) { var $x = ["TMeta",25,m,e1]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TNew = function(c,params,el) { var $x = ["TNew",10,c,params,el]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TSwitch = function(e,cases,edef) { var $x = ["TSwitch",18,e,cases,edef]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TUnop = function(op,postFix,e) { var $x = ["TUnop",11,op,postFix,e]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TArrayDecl = function(el) { var $x = ["TArrayDecl",8,el]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TCast = function(e,m) { var $x = ["TCast",24,e,m]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TFunction = function(tfunc) { var $x = ["TFunction",12,tfunc]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TContinue = ["TContinue",22];
TypedExprDef.TContinue.toString = $estr;
TypedExprDef.TContinue.__enum__ = TypedExprDef;

TypedExprDef.TFor = function(v,e1,e2) { var $x = ["TFor",15,v,e1,e2]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TTypeExpr = function(m) { var $x = ["TTypeExpr",5,m]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TLocal = function(v) { var $x = ["TLocal",1,v]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TCall = function(e,el) { var $x = ["TCall",9,e,el]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TReturn = function(e) { var $x = ["TReturn",20,e]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TThrow = function(e) { var $x = ["TThrow",23,e]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TParenthesis = function(e) { var $x = ["TParenthesis",6,e]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TWhile = function(econd,e,normalWhile) { var $x = ["TWhile",17,econd,e,normalWhile]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TField = function(e,fa) { var $x = ["TField",4,e,fa]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TObjectDecl = function(fields) { var $x = ["TObjectDecl",7,fields]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TTry = function(e,catches) { var $x = ["TTry",19,e,catches]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TConst = function(c) { var $x = ["TConst",0,c]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TVar = function(v,expr) { var $x = ["TVar",13,v,expr]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TArray = function(e1,e2) { var $x = ["TArray",2,e1,e2]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TBinop = function(op,e1,e2) { var $x = ["TBinop",3,op,e1,e2]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }
TypedExprDef.TIf = function(econd,eif,eelse) { var $x = ["TIf",16,econd,eif,eelse]; $x.__enum__ = TypedExprDef; $x.toString = $estr; return $x; }

exports.default = TypedExprDef;