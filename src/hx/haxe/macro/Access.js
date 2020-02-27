// Enum: haxe.macro.Access

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../../estr_stub").default;
var $hxClasses = require("./../../hxClasses_stub").default;

// Definition

var Access = $hxClasses["haxe.macro.Access"] = { __ename__: ["haxe","macro","Access"], __constructs__: ["APublic","APrivate","AStatic","AOverride","ADynamic","AInline","AMacro"] }

Access.ADynamic = ["ADynamic",4];
Access.ADynamic.toString = $estr;
Access.ADynamic.__enum__ = Access;

Access.AMacro = ["AMacro",6];
Access.AMacro.toString = $estr;
Access.AMacro.__enum__ = Access;

Access.APublic = ["APublic",0];
Access.APublic.toString = $estr;
Access.APublic.__enum__ = Access;

Access.AStatic = ["AStatic",2];
Access.AStatic.toString = $estr;
Access.AStatic.__enum__ = Access;

Access.AInline = ["AInline",5];
Access.AInline.toString = $estr;
Access.AInline.__enum__ = Access;

Access.APrivate = ["APrivate",1];
Access.APrivate.toString = $estr;
Access.APrivate.__enum__ = Access;

Access.AOverride = ["AOverride",3];
Access.AOverride.toString = $estr;
Access.AOverride.__enum__ = Access;


exports.default = Access;