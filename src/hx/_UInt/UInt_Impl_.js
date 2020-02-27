// Class: _UInt.UInt_Impl_

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function Std() {return require("./../Std");}

// Constructor

class UInt_Impl_ {
	constructor(){}
	static add(a,b) {
		return a + b;
	}
	static div(a,b) {
		return UInt_Impl_.toFloat(a) / UInt_Impl_.toFloat(b);
	}
	static mul(a,b) {
		return a * b;
	}
	static sub(a,b) {
		return a - b;
	}
	static gt(a,b) {
		var aNeg = a < 0;
		var bNeg = b < 0;
		if(aNeg != bNeg) {
			return aNeg;
		} else {
			return a > b;
		}
	}
	static gte(a,b) {
		var aNeg = a < 0;
		var bNeg = b < 0;
		if(aNeg != bNeg) {
			return aNeg;
		} else {
			return a >= b;
		}
	}
	static lt(a,b) {
		return UInt_Impl_.gt(b,a);
	}
	static lte(a,b) {
		return UInt_Impl_.gte(b,a);
	}
	static and(a,b) {
		return a & b;
	}
	static or(a,b) {
		return a | b;
	}
	static xor(a,b) {
		return a ^ b;
	}
	static shl(a,b) {
		return a << b;
	}
	static shr(a,b) {
		return a >>> b;
	}
	static ushr(a,b) {
		return a >>> b;
	}
	static mod(a,b) {
		return UInt_Impl_.toFloat(a) % UInt_Impl_.toFloat(b) | 0;
	}
	static addWithFloat(a,b) {
		return UInt_Impl_.toFloat(a) + b;
	}
	static mulWithFloat(a,b) {
		return UInt_Impl_.toFloat(a) * b;
	}
	static divFloat(a,b) {
		return UInt_Impl_.toFloat(a) / b;
	}
	static floatDiv(a,b) {
		return a / UInt_Impl_.toFloat(b);
	}
	static subFloat(a,b) {
		return UInt_Impl_.toFloat(a) - b;
	}
	static floatSub(a,b) {
		return a - UInt_Impl_.toFloat(b);
	}
	static gtFloat(a,b) {
		return UInt_Impl_.toFloat(a) > b;
	}
	static equalsInt(a,b) {
		return a == b;
	}
	static notEqualsInt(a,b) {
		return a != b;
	}
	static equalsFloat(a,b) {
		return UInt_Impl_.toFloat(a) == b;
	}
	static notEqualsFloat(a,b) {
		return UInt_Impl_.toFloat(a) != b;
	}
	static gteFloat(a,b) {
		return UInt_Impl_.toFloat(a) >= b;
	}
	static floatGt(a,b) {
		return a > UInt_Impl_.toFloat(b);
	}
	static floatGte(a,b) {
		return a >= UInt_Impl_.toFloat(b);
	}
	static ltFloat(a,b) {
		return UInt_Impl_.toFloat(a) < b;
	}
	static lteFloat(a,b) {
		return UInt_Impl_.toFloat(a) <= b;
	}
	static floatLt(a,b) {
		return a < UInt_Impl_.toFloat(b);
	}
	static floatLte(a,b) {
		return a <= UInt_Impl_.toFloat(b);
	}
	static modFloat(a,b) {
		return UInt_Impl_.toFloat(a) % b;
	}
	static floatMod(a,b) {
		return a % UInt_Impl_.toFloat(b);
	}
	static negBits(this1) {
		return ~this1;
	}
	static prefixIncrement(this1) {
		return ++this1;
	}
	static postfixIncrement(this1) {
		return this1++;
	}
	static prefixDecrement(this1) {
		return --this1;
	}
	static postfixDecrement(this1) {
		return this1--;
	}
	static toString(this1,radix) {
		return (Std().default).string(UInt_Impl_.toFloat(this1));
	}
	static toInt(this1) {
		return this1;
	}
	static toFloat(this1) {
		var $int = this1;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
	}
}


// Meta

UInt_Impl_.__name__ = ["_UInt","UInt_Impl_"];
UInt_Impl_.prototype.__class__ = UInt_Impl_.prototype.constructor = $hxClasses["_UInt.UInt_Impl_"] = UInt_Impl_;

// Init



// Statics



// Export

exports.default = UInt_Impl_;