// Class: haxe.macro.TypeTools

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe_macro_ComplexType() {return require("./../../haxe/macro/ComplexType");}
function haxe_macro_TypeParam() {return require("./../../haxe/macro/TypeParam");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function haxe_macro_Access() {return require("./../../haxe/macro/Access");}
function haxe_macro_FieldType() {return require("./../../haxe/macro/FieldType");}
function Lambda() {return require("./../../Lambda");}

// Constructor

class TypeTools {
	constructor(){}
	static nullable(complexType) {
		return (haxe_macro_ComplexType().default).TPath({ pack : [], name : "Null", params : [(haxe_macro_TypeParam().default).TPType(complexType)]});
	}
	static toField(cf) {
		var varAccessToString = function(va,getOrSet) {
			switch(va[1]) {
			case 0:
				return "default";
			case 1:
				return "null";
			case 2:
				return "never";
			case 3:
				throw new (js__$Boot_HaxeError().default)("Invalid TAnonymous");
				break;
			case 4:
				return getOrSet;
			case 5:
				return "default";
			case 6:
				return "default";
			}
		};
		if(cf.params.length == 0) {
			var cf1 = cf.name;
			var cf2 = cf.doc;
			var tmp = cf.isPublic ? [(haxe_macro_Access().default).APublic] : [(haxe_macro_Access().default).APrivate];
			var tmp1;
			var _g = cf.type;
			var _g1 = cf.kind;
			switch(_g1[1]) {
			case 0:
				var ret = _g;
				var write = _g1[3];
				var read = _g1[2];
				tmp1 = (haxe_macro_FieldType().default).FProp(varAccessToString(read,"get"),varAccessToString(write,"set"),TypeTools.toComplexType(ret),null);
				break;
			case 1:
				if(_g[1] == 4) {
					var ret1 = _g[3];
					var args = _g[2];
					var _g2 = [];
					var _g11 = 0;
					while(_g11 < args.length) {
						var a = args[_g11];
						++_g11;
						_g2.push({ name : a.name, opt : a.opt, type : TypeTools.toComplexType(a.t)});
					}
					tmp1 = (haxe_macro_FieldType().default).FFun({ args : _g2, ret : TypeTools.toComplexType(ret1), expr : null});
				} else {
					throw new (js__$Boot_HaxeError().default)("Invalid TAnonymous");
				}
				break;
			}
			return { name : cf1, doc : cf2, access : tmp, kind : tmp1, pos : cf.pos, meta : cf.meta.get()};
		} else {
			throw new (js__$Boot_HaxeError().default)("Invalid TAnonymous");
		}
	}
	static toComplexType(type) {
		if(type == null) {
			return null;
		} else {
			switch(type[1]) {
			case 0:
				var _hx_tmp = type[2].get();
				var t = _hx_tmp;
				if(t == null) {
					return null;
				} else {
					return TypeTools.toComplexType(t);
				}
				break;
			case 1:
				var _hx_tmp1;
				var params = type[3];
				_hx_tmp1 = type[2].get();
				var baseType = _hx_tmp1;
				return (haxe_macro_ComplexType().default).TPath(TypeTools.toTypePath(baseType,params));
			case 2:
				var _hx_tmp2;
				var params1 = type[3];
				_hx_tmp2 = type[2].get();
				var classType = _hx_tmp2;
				var _g = classType.kind;
				if(_g[1] == 1) {
					return (haxe_macro_ComplexType().default).TPath({ name : classType.name, pack : []});
				} else {
					return (haxe_macro_ComplexType().default).TPath(TypeTools.toTypePath(classType,params1));
				}
				break;
			case 3:
				var _hx_tmp3;
				var params2 = type[3];
				_hx_tmp3 = type[2].get();
				var baseType1 = _hx_tmp3;
				return (haxe_macro_ComplexType().default).TPath(TypeTools.toTypePath(baseType1,params2));
			case 4:
				var ret = type[3];
				var args = type[2];
				var _g1 = [];
				var _g11 = 0;
				while(_g11 < args.length) {
					var a = args[_g11];
					++_g11;
					_g1.push(a.opt ? TypeTools.nullable(TypeTools.toComplexType(a.t)) : TypeTools.toComplexType(a.t));
				}
				return (haxe_macro_ComplexType().default).TFunction(_g1,TypeTools.toComplexType(ret));
			case 5:
				var _hx_tmp4 = type[2].get();
				var fields = _hx_tmp4.fields;
				var _g2 = [];
				var _g12 = 0;
				while(_g12 < fields.length) {
					var cf = fields[_g12];
					++_g12;
					_g2.push(TypeTools.toField(cf));
				}
				return (haxe_macro_ComplexType().default).TAnonymous(_g2);
			case 6:
				var t1 = type[2];
				if(t1 == null) {
					return (haxe_macro_ComplexType().default).TPath({ pack : [], name : "Dynamic", params : []});
				} else {
					var ct = TypeTools.toComplexType(t1);
					return (haxe_macro_ComplexType().default).TPath({ pack : [], name : "Dynamic", params : [(haxe_macro_TypeParam().default).TPType(ct)]});
				}
				break;
			case 7:
				var f = type[2];
				return TypeTools.toComplexType(f());
			case 8:
				var _hx_tmp5;
				var params3 = type[3];
				_hx_tmp5 = type[2].get();
				var baseType2 = _hx_tmp5;
				return (haxe_macro_ComplexType().default).TPath(TypeTools.toTypePath(baseType2,params3));
			}
		}
	}
	static toTypePath(baseType,params) {
		var module = baseType.module;
		var baseType1 = baseType.pack;
		var tmp = module.substring(module.lastIndexOf(".") + 1);
		var baseType2 = baseType.name;
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var t = params[_g1];
			++_g1;
			_g.push((haxe_macro_TypeParam().default).TPType(TypeTools.toComplexType(t)));
		}
		return { pack : baseType1, name : tmp, sub : baseType2, params : _g};
	}
	static findField(c,name,isStatic) {
		if(isStatic == null) {
			isStatic = false;
		}
		var field = (Lambda().default).find((isStatic ? c.statics : c.fields).get(),function(field1) {
			return field1.name == name;
		});
		if(field != null) {
			return field;
		} else if(c.superClass != null) {
			return TypeTools.findField(c.superClass.t.get(),name,isStatic);
		} else {
			return null;
		}
	}
}


// Meta

TypeTools.__name__ = ["haxe","macro","TypeTools"];
TypeTools.prototype.__class__ = TypeTools.prototype.constructor = $hxClasses["haxe.macro.TypeTools"] = TypeTools;

// Init



// Statics



// Export

exports.default = TypeTools;