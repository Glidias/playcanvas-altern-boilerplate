// Class: haxe.io.FPHelper

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe__$Int64__$_$_$Int64() {return require("./../../haxe/_Int64/___Int64");}

// Constructor

class FPHelper {
	constructor(){}
	static get i64tmp() { return i64tmp; }
	static set i64tmp(value) { i64tmp = value; }
	static get LN2() { return LN2; }
	static set LN2(value) { LN2 = value; }
	static i32ToFloat(i) {
		var sign = 1 - (i >>> 31 << 1);
		var exp = i >>> 23 & 255;
		var sig = i & 8388607;
		if(sig == 0 && exp == 0) {
			return 0.0;
		}
		return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
	}
	static floatToI32(f) {
		if(f == 0) {
			return 0;
		}
		var af = f < 0 ? -f : f;
		var exp = Math.floor(Math.log(af) / 0.6931471805599453);
		if(exp < -127) {
			exp = -127;
		} else if(exp > 128) {
			exp = 128;
		}
		var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608);
		if(sig == 8388608 && exp < 128) {
			sig = 0;
			++exp;
		}
		return (f < 0 ? -2147483648 : 0) | exp + 127 << 23 | sig;
	}
	static i64ToDouble(low,high) {
		var sign = 1 - (high >>> 31 << 1);
		var exp = (high >> 20 & 2047) - 1023;
		var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
		if(sig == 0 && exp == -1023) {
			return 0.0;
		}
		return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
	}
	static doubleToI64(v) {
		var i64 = FPHelper.i64tmp;
		if(v == 0) {
			i64.low = 0;
			i64.high = 0;
		} else if(!isFinite(v)) {
			if(v > 0) {
				i64.low = 0;
				i64.high = 2146435072;
			} else {
				i64.low = 0;
				i64.high = -1048576;
			}
		} else {
			var av = v < 0 ? -v : v;
			var exp = Math.floor(Math.log(av) / 0.6931471805599453);
			var sig = Math.round((av / Math.pow(2,exp) - 1) * 4503599627370496.);
			var sig_l = sig | 0;
			var sig_h = sig / 4294967296.0 | 0;
			i64.low = sig_l;
			i64.high = (v < 0 ? -2147483648 : 0) | exp + 1023 << 20 | sig_h;
		}
		return i64;
	}
}


// Meta

FPHelper.__name__ = ["haxe","io","FPHelper"];
FPHelper.prototype.__class__ = FPHelper.prototype.constructor = $hxClasses["haxe.io.FPHelper"] = FPHelper;

// Init



// Statics

var i64tmp = (function($this) {
	var $r;
	var this1 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
	$r = this1;
	return $r;
}(this));
var LN2 = 0.6931471805599453;

// Export

exports.default = FPHelper;