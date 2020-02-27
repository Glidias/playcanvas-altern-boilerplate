// Class: hxbit.Convert

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function Std() {return require("./../Std");}
function Type() {return require("./../Type");}
function haxe_ds_IntMap() {return require("./../haxe/ds/IntMap");}
function haxe_ds_StringMap() {return require("./../haxe/ds/StringMap");}
function haxe_ds_ObjectMap() {return require("./../haxe/ds/ObjectMap");}
function haxe__$Int64__$_$_$Int64() {return require("./../haxe/_Int64/___Int64");}
function js__$Boot_HaxeError() {return require("./../js/_Boot/HaxeError");}
function hxbit_ConvertField() {return require("./../hxbit/ConvertField");}

// Constructor

class Convert {
	constructor(ourSchema,schema) {
		var ourMap = new (haxe_ds_StringMap().default)();
		var _g1 = 0;
		var _g = ourSchema.fieldsNames.length;
		while(_g1 < _g) {
			var i = _g1++;
			var key = ourSchema.fieldsNames[i];
			var value = ourSchema.fieldsTypes[i];
			if(__map_reserved[key] != null) {
				ourMap.setReserved(key,value);
			} else {
				ourMap.h[key] = value;
			}
		}
		this.read = [];
		if(ourSchema.isFinal != schema.isFinal) {
			throw new (js__$Boot_HaxeError().default)("TODO : handle final flag change");
		}
		var map = new (haxe_ds_StringMap().default)();
		var _g11 = 0;
		var _g2 = schema.fieldsNames.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var oldT = schema.fieldsTypes[i1];
			var key1 = schema.fieldsNames[i1];
			var newT = __map_reserved[key1] != null ? ourMap.getReserved(key1) : ourMap.h[key1];
			var c = new (hxbit_ConvertField().default)(oldT,newT);
			if(newT != null) {
				if(Convert.sameType(oldT,newT)) {
					c.same = true;
				} else {
					c.defaultValue = Convert.getDefault(newT);
				}
			}
			c.index = this.read.length;
			this.read.push(c);
			var key2 = schema.fieldsNames[i1];
			if(__map_reserved[key2] != null) {
				map.setReserved(key2,c);
			} else {
				map.h[key2] = c;
			}
		}
		this.write = [];
		var _g12 = 0;
		var _g3 = ourSchema.fieldsNames.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			var newT1 = ourSchema.fieldsTypes[i2];
			var key3 = ourSchema.fieldsNames[i2];
			var c1 = __map_reserved[key3] != null ? map.getReserved(key3) : map.h[key3];
			if(c1 == null) {
				c1 = new (hxbit_ConvertField().default)(null,newT1);
				c1.defaultValue = Convert.getDefault(newT1);
			}
			this.write.push(c1);
		}
	}
	toString() {
		var _g = [];
		var _g2 = 0;
		var _g1 = this.write.length;
		while(_g2 < _g1) {
			var i = _g2++;
			var w = this.write[i];
			_g.push(w.from == null ? "insert:" + (Std().default).string(w.defaultValue) : w.same ? i == w.index ? "s" : "@" + w.index : "@" + w.index + ":" + (Std().default).string(w.to));
		}
		return _g.toString();
	}
	static sameType(a,b) {
		switch(a[1]) {
		case 0:
			switch(b[1]) {
			case 10:
				var b1 = b[2];
				return Convert.sameType(a,b1);
			case 16:
				return true;
			default:
				return (Type().default).enumEq(a,b);
			}
			break;
		case 7:
			switch(b[1]) {
			case 7:
				var ak = a[2];
				var av = a[3];
				var bv = b[3];
				var bk = b[2];
				if(Convert.sameType(ak,bk)) {
					return Convert.sameType(av,bv);
				} else {
					return false;
				}
				break;
			case 10:
				var b2 = b[2];
				return Convert.sameType(a,b2);
			default:
				return (Type().default).enumEq(a,b);
			}
			break;
		case 8:
			switch(b[1]) {
			case 8:
				var a1 = a[2];
				var b3 = b[2];
				return Convert.sameType(a1,b3);
			case 10:
				var b4 = b[2];
				return Convert.sameType(a,b4);
			default:
				return (Type().default).enumEq(a,b);
			}
			break;
		case 9:
			switch(b[1]) {
			case 9:
				var fa = a[2];
				var fb = b[2];
				if(fa.length != fb.length) {
					return false;
				}
				var _g1 = 0;
				var _g = fa.length;
				while(_g1 < _g) {
					var i = _g1++;
					var a2 = fa[i];
					var b5 = fb[i];
					if(a2.name != b5.name || a2.opt != b5.opt || !Convert.sameType(a2.type,b5.type)) {
						return false;
					}
				}
				return true;
			case 10:
				var b6 = b[2];
				return Convert.sameType(a,b6);
			default:
				return (Type().default).enumEq(a,b);
			}
			break;
		case 10:
			if(b[1] == 10) {
				var a3 = a[2];
				var b7 = b[2];
				return Convert.sameType(a3,b7);
			} else {
				var a4 = a[2];
				return Convert.sameType(a4,b);
			}
			break;
		case 11:
			switch(b[1]) {
			case 10:
				var b8 = b[2];
				return Convert.sameType(a,b8);
			case 11:
				var a5 = a[2];
				var b9 = b[2];
				return Convert.sameType(a5,b9);
			default:
				return (Type().default).enumEq(a,b);
			}
			break;
		case 12:
			switch(b[1]) {
			case 10:
				var b10 = b[2];
				return Convert.sameType(a,b10);
			case 12:
				var a6 = a[2];
				var b11 = b[2];
				return Convert.sameType(a6,b11);
			default:
				return (Type().default).enumEq(a,b);
			}
			break;
		case 16:
			switch(b[1]) {
			case 0:
				return true;
			case 10:
				var b12 = b[2];
				return Convert.sameType(a,b12);
			default:
				return (Type().default).enumEq(a,b);
			}
			break;
		default:
			if(b[1] == 10) {
				var b13 = b[2];
				return Convert.sameType(a,b13);
			} else {
				return (Type().default).enumEq(a,b);
			}
		}
	}
	static getDefault(t) {
		switch(t[1]) {
		case 1:
			return 0.;
		case 2:
			return false;
		case 7:
			var k = t[2];
			switch(k[1]) {
			case 0:
				return new (haxe_ds_IntMap().default)();
			case 3:
				return new (haxe_ds_StringMap().default)();
			default:
				return new (haxe_ds_ObjectMap().default)();
			}
			break;
		case 8:
			return [];
		case 3:case 4:case 5:case 6:case 9:case 12:case 13:case 14:case 17:
			return null;
		case 10:
			var t1 = t[2];
			return Convert.getDefault(t1);
		case 11:
			var this1 = new Array(0);
			return this1;
		case 15:
			var this2 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
			return this2;
		case 0:case 16:
			return 0;
		}
	}
}


// Meta

Convert.__name__ = ["hxbit","Convert"];
Convert.prototype.__class__ = Convert.prototype.constructor = $hxClasses["hxbit.Convert"] = Convert;

// Init



// Statics



// Export

exports.default = Convert;