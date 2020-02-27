// Enum: haxe.macro.TypeDefKind

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var TypeDefKind = $hxClasses["haxe.macro.TypeDefKind"] = { __ename__: ["haxe","macro","TypeDefKind"], __constructs__: ["TDEnum","TDStructure","TDClass","TDAlias","TDAbstract"] }

TypeDefKind.TDAlias = function(t) { var $x = ["TDAlias",3,t]; $x.__enum__ = TypeDefKind; $x.toString = $estr; return $x; }
TypeDefKind.TDEnum = ["TDEnum",0];
TypeDefKind.TDEnum.toString = $estr;
TypeDefKind.TDEnum.__enum__ = TypeDefKind;

TypeDefKind.TDClass = function(superClass,interfaces,isInterface) { var $x = ["TDClass",2,superClass,interfaces,isInterface]; $x.__enum__ = TypeDefKind; $x.toString = $estr; return $x; }
TypeDefKind.TDAbstract = function(tthis,from,to) { var $x = ["TDAbstract",4,tthis,from,to]; $x.__enum__ = TypeDefKind; $x.toString = $estr; return $x; }
TypeDefKind.TDStructure = ["TDStructure",1];
TypeDefKind.TDStructure.toString = $estr;
TypeDefKind.TDStructure.__enum__ = TypeDefKind;


exports.default = TypeDefKind;