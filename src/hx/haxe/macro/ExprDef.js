// Enum: haxe.macro.ExprDef

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var ExprDef = $hxClasses["haxe.macro.ExprDef"] = { __ename__: ["haxe","macro","ExprDef"], __constructs__: ["EConst","EArray","EBinop","EField","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType","EMeta"] }

ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",5,fields]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EVars = function(vars) { var $x = ["EVars",10,vars]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EBreak = ["EBreak",20];
ExprDef.EBreak.toString = $estr;
ExprDef.EBreak.__enum__ = ExprDef;

ExprDef.EFor = function(it,expr) { var $x = ["EFor",13,it,expr]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.ENew = function(t,params) { var $x = ["ENew",8,t,params]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.ECall = function(e,params) { var $x = ["ECall",7,e,params]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.ECheckType = function(e,t) { var $x = ["ECheckType",28,e,t]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EContinue = ["EContinue",21];
ExprDef.EContinue.toString = $estr;
ExprDef.EContinue.__enum__ = ExprDef;

ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",17,e,cases,edef]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",25,e,isCall]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EIn = function(e1,e2) { var $x = ["EIn",14,e1,e2]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",4,e]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",27,econd,eif,eelse]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",26,t]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EMeta = function(s,e) { var $x = ["EMeta",29,s,e]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",15,econd,eif,eelse]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",9,op,postFix,e]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EBlock = function(exprs) { var $x = ["EBlock",12,exprs]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.ECast = function(e,t) { var $x = ["ECast",24,e,t]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EFunction = function(name,f) { var $x = ["EFunction",11,name,f]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EReturn = function(e) { var $x = ["EReturn",19,e]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",16,econd,e,normalWhile]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",6,values]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EThrow = function(e) { var $x = ["EThrow",23,e]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.ETry = function(e,catches) { var $x = ["ETry",18,e,catches]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }
ExprDef.EUntyped = function(e) { var $x = ["EUntyped",22,e]; $x.__enum__ = ExprDef; $x.toString = $estr; return $x; }

exports.default = ExprDef;