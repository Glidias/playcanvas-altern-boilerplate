// Class: Type

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $import = require("./import_stub").default;
function js_Boot() {return require("./js/Boot");}
function js__$Boot_HaxeError() {return require("./js/_Boot/HaxeError");}
function Reflect() {return require("./Reflect");}
function HxOverrides() {return require("./HxOverrides");}
function ValueType() {return require("./ValueType");}

// Constructor

class Type {
	constructor(){}
	static getClass(o) {
		if(o == null) {
			return null;
		} else {
			return (js_Boot().default).getClass(o);
		}
	}
	static getEnum(o) {
		if(o == null) {
			return null;
		}
		return o.__enum__;
	}
	static getSuperClass(c) {
		return c.__super__;
	}
	static getClassName(c) {
		var a = c.__name__;
		if(a == null) {
			return null;
		}
		return a.join(".");
	}
	static getEnumName(e) {
		var a = e.__ename__;
		return a.join(".");
	}
	static resolveClass(name) {
		var cl = $hxClasses[name];
		if(cl == null || !cl.__name__) {
			return null;
		}
		return cl;
	}
	static resolveEnum(name) {
		var e = $hxClasses[name];
		if(e == null || !e.__ename__) {
			return null;
		}
		return e;
	}
	static createInstance(cl,args) {
		var _g = args.length;
		switch(_g) {
		case 0:
			return new cl();
		case 1:
			return new cl(args[0]);
		case 2:
			return new cl(args[0],args[1]);
		case 3:
			return new cl(args[0],args[1],args[2]);
		case 4:
			return new cl(args[0],args[1],args[2],args[3]);
		case 5:
			return new cl(args[0],args[1],args[2],args[3],args[4]);
		case 6:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
		case 7:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
		case 8:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
		case 9:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8]);
		case 10:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9]);
		case 11:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10]);
		case 12:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11]);
		case 13:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12]);
		case 14:
			return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12],args[13]);
		default:
			throw new (js__$Boot_HaxeError().default)("Too many arguments");
		}
	}
	static createEmptyInstance(cl) {
		function empty() {}; empty.prototype = cl.prototype;
		return new empty();
	}
	static createEnum(e,constr,params) {
		var f = (Reflect().default).field(e,constr);
		if(f == null) {
			throw new (js__$Boot_HaxeError().default)("No such constructor " + constr);
		}
		if((Reflect().default).isFunction(f)) {
			if(params == null) {
				throw new (js__$Boot_HaxeError().default)("Constructor " + constr + " need parameters");
			}
			return f.apply(e,params);
		}
		if(params != null && params.length != 0) {
			throw new (js__$Boot_HaxeError().default)("Constructor " + constr + " does not need parameters");
		}
		return f;
	}
	static createEnumIndex(e,index,params) {
		var c = e.__constructs__[index];
		if(c == null) {
			throw new (js__$Boot_HaxeError().default)(index + " is not a valid enum constructor index");
		}
		return Type.createEnum(e,c,params);
	}
	static getInstanceFields(c) {
		var a = [];
		for(var i in c.prototype) a.push(i);
		(HxOverrides().default).remove(a,"__class__");
		(HxOverrides().default).remove(a,"__properties__");
		return a;
	}
	static getClassFields(c) {
		var a = (Reflect().default).fields(c);
		(HxOverrides().default).remove(a,"__name__");
		(HxOverrides().default).remove(a,"__interfaces__");
		(HxOverrides().default).remove(a,"__properties__");
		(HxOverrides().default).remove(a,"__super__");
		(HxOverrides().default).remove(a,"__meta__");
		(HxOverrides().default).remove(a,"prototype");
		return a;
	}
	static getEnumConstructs(e) {
		return e.__constructs__.slice();
	}
	static typeof(v) {
		var _g = typeof(v);
		switch(_g) {
		case "boolean":
			return (ValueType().default).TBool;
		case "function":
			if(v.__name__ || v.__ename__) {
				return (ValueType().default).TObject;
			}
			return (ValueType().default).TFunction;
		case "number":
			if(Math.ceil(v) == v % 2147483648.0) {
				return (ValueType().default).TInt;
			}
			return (ValueType().default).TFloat;
		case "object":
			if(v == null) {
				return (ValueType().default).TNull;
			}
			var e = v.__enum__;
			if(e != null) {
				return (ValueType().default).TEnum(e);
			}
			var c = (js_Boot().default).getClass(v);
			if(c != null) {
				return (ValueType().default).TClass(c);
			}
			return (ValueType().default).TObject;
		case "string":
			return (ValueType().default).TClass(String);
		case "undefined":
			return (ValueType().default).TNull;
		default:
			return (ValueType().default).TUnknown;
		}
	}
	static enumEq(a,b) {
		if(a == b) {
			return true;
		}
		try {
			if(a[0] != b[0]) {
				return false;
			}
			var _g1 = 2;
			var _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Type.enumEq(a[i],b[i])) {
					return false;
				}
			}
			var e = a.__enum__;
			if(e != b.__enum__ || e == null) {
				return false;
			}
		} catch( e1 ) {
			return false;
		}
		return true;
	}
	static enumConstructor(e) {
		return e[0];
	}
	static enumParameters(e) {
		return e.slice(2);
	}
	static enumIndex(e) {
		return e[1];
	}
	static allEnums(e) {
		return e.__empty_constructs__;
	}
}


// Meta

Type.__name__ = ["Type"];
Type.prototype.__class__ = Type.prototype.constructor = $hxClasses["Type"] = Type;

// Init



// Statics



// Export

exports.default = Type;