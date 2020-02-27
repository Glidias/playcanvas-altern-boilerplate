// Class: haxe._Int32.Int32_Impl_

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class Int32_Impl_ {
	constructor(){}
	static preIncrement(this1) {
		this1 = ++this1 | 0;
		return this1;
	}
	static postIncrement(this1) {
		var ret = this1++;
		this1 |= 0;
		return ret;
	}
	static preDecrement(this1) {
		this1 = --this1 | 0;
		return this1;
	}
	static postDecrement(this1) {
		var ret = this1--;
		this1 |= 0;
		return ret;
	}
	static add(a,b) {
		return a + b | 0;
	}
	static addInt(a,b) {
		return a + b | 0;
	}
	static sub(a,b) {
		return a - b | 0;
	}
	static subInt(a,b) {
		return a - b | 0;
	}
	static intSub(a,b) {
		return a - b | 0;
	}
	static mul(a,b) {
		return Int32_Impl_._mul(a,b);
	}
	static get _mul() { return _mul; }
	static set _mul(value) { _mul = value; }
	static mulInt(a,b) {
		return Int32_Impl_._mul(a,b);
	}
	static toFloat(this1) {
		return this1;
	}
	static ucompare(a,b) {
		if(a < 0) {
			if(b < 0) {
				return ~b - ~a | 0;
			} else {
				return 1;
			}
		}
		if(b < 0) {
			return -1;
		} else {
			return a - b | 0;
		}
	}
	static clamp(x) {
		return x | 0;
	}
}


// Meta

Int32_Impl_.__name__ = ["haxe","_Int32","Int32_Impl_"];
Int32_Impl_.prototype.__class__ = Int32_Impl_.prototype.constructor = $hxClasses["haxe._Int32.Int32_Impl_"] = Int32_Impl_;

// Init



// Statics

var _mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};

// Export

exports.default = Int32_Impl_;