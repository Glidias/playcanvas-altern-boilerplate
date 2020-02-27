// Class: Reflect

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $import = require("./import_stub").default;

// Constructor

class Reflect {
	constructor(){}
	static hasField(o,field) {
		return Object.prototype.hasOwnProperty.call(o,field);
	}
	static field(o,field) {
		try {
			return o[field];
		} catch( e ) {
			return null;
		}
	}
	static setField(o,field,value) {
		o[field] = value;
	}
	static getProperty(o,field) {
		var tmp;
		if(o == null) {
			return null;
		} else {
			var tmp1;
			if(o.__properties__) {
				tmp = o.__properties__["get_" + field];
				tmp1 = tmp;
			} else {
				tmp1 = false;
			}
			if(tmp1) {
				return o[tmp]();
			} else {
				return o[field];
			}
		}
	}
	static setProperty(o,field,value) {
		var tmp;
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["set_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			o[tmp](value);
		} else {
			o[field] = value;
		}
	}
	static callMethod(o,func,args) {
		return func.apply(o,args);
	}
	static fields(o) {
		var a = [];
		if(o != null) {
			var hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
				a.push(f);
			}
			}
		}
		return a;
	}
	static isFunction(f) {
		if(typeof(f) == "function") {
			return !(f.__name__ || f.__ename__);
		} else {
			return false;
		}
	}
	static compare(a,b) {
		if(a == b) {
			return 0;
		} else if(a > b) {
			return 1;
		} else {
			return -1;
		}
	}
	static compareMethods(f1,f2) {
		if(f1 == f2) {
			return true;
		}
		if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
			return false;
		}
		if(f1.scope == f2.scope && f1.method == f2.method) {
			return f1.method != null;
		} else {
			return false;
		}
	}
	static isObject(v) {
		if(v == null) {
			return false;
		}
		var t = typeof(v);
		if(!(t == "string" || t == "object" && v.__enum__ == null)) {
			if(t == "function") {
				return (v.__name__ || v.__ename__) != null;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static isEnumValue(v) {
		if(v != null) {
			return v.__enum__ != null;
		} else {
			return false;
		}
	}
	static deleteField(o,field) {
		if(!Object.prototype.hasOwnProperty.call(o,field)) {
			return false;
		}
		delete(o[field]);
		return true;
	}
	static copy(o) {
		var o2 = { };
		var _g = 0;
		var _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
		return o2;
	}
	static makeVarArgs(f) {
		return function() {
			var a = Array.prototype.slice.call(arguments);
			return f(a);
		};
	}
}


// Meta

Reflect.__name__ = ["Reflect"];
Reflect.prototype.__class__ = Reflect.prototype.constructor = $hxClasses["Reflect"] = Reflect;

// Init



// Statics



// Export

exports.default = Reflect;