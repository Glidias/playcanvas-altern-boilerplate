// Class: haxe.Int64Helper

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function haxe__$Int64__$_$_$Int64() {return require("./../haxe/_Int64/___Int64");}
function StringTools() {return require("./../StringTools");}
function HxOverrides() {return require("./../HxOverrides");}
function js__$Boot_HaxeError() {return require("./../js/_Boot/HaxeError");}
function haxe__$Int32_Int32_$Impl_$() {return require("./../haxe/_Int32/Int32_Impl_");}

// Constructor

class Int64Helper {
	constructor(){}
	static parseString(sParam) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(0,10);
		var base = this1;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
		var current = this2;
		var this3 = new (haxe__$Int64__$_$_$Int64().default)(0,1);
		var multiplier = this3;
		var sIsNegative = false;
		var s = (StringTools().default).trim(sParam);
		if(s.charAt(0) == "-") {
			sIsNegative = true;
			s = s.substring(1,s.length);
		}
		var len = s.length;
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			var digitInt = (HxOverrides().default).cca(s,len - 1 - i) - 48;
			if(digitInt < 0 || digitInt > 9) {
				throw new (js__$Boot_HaxeError().default)("NumberFormatError");
			}
			var this4 = new (haxe__$Int64__$_$_$Int64().default)(digitInt >> 31,digitInt);
			var digit = this4;
			if(sIsNegative) {
				var mask = 65535;
				var al = multiplier.low & mask;
				var ah = multiplier.low >>> 16;
				var bl = digit.low & mask;
				var bh = digit.low >>> 16;
				var p00 = (haxe__$Int32_Int32_$Impl_$().default)._mul(al,bl);
				var p10 = (haxe__$Int32_Int32_$Impl_$().default)._mul(ah,bl);
				var p01 = (haxe__$Int32_Int32_$Impl_$().default)._mul(al,bh);
				var p11 = (haxe__$Int32_Int32_$Impl_$().default)._mul(ah,bh);
				var low = p00;
				var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
				p01 = p01 << 16;
				low = low + p01 | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low,p01) < 0) {
					var ret = high++;
					high = high | 0;
				}
				p10 = p10 << 16;
				low = low + p10 | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low,p10) < 0) {
					var ret1 = high++;
					high = high | 0;
				}
				high = high + ((haxe__$Int32_Int32_$Impl_$().default)._mul(multiplier.low,digit.high) + (haxe__$Int32_Int32_$Impl_$().default)._mul(multiplier.high,digit.low) | 0) | 0;
				var this5 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
				var b = this5;
				var high1 = current.high - b.high | 0;
				var low1 = current.low - b.low | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(current.low,b.low) < 0) {
					var ret2 = high1--;
					high1 = high1 | 0;
				}
				var this6 = new (haxe__$Int64__$_$_$Int64().default)(high1,low1);
				current = this6;
				if(!(current.high < 0)) {
					throw new (js__$Boot_HaxeError().default)("NumberFormatError: Underflow");
				}
			} else {
				var mask1 = 65535;
				var al1 = multiplier.low & mask1;
				var ah1 = multiplier.low >>> 16;
				var bl1 = digit.low & mask1;
				var bh1 = digit.low >>> 16;
				var p001 = (haxe__$Int32_Int32_$Impl_$().default)._mul(al1,bl1);
				var p101 = (haxe__$Int32_Int32_$Impl_$().default)._mul(ah1,bl1);
				var p011 = (haxe__$Int32_Int32_$Impl_$().default)._mul(al1,bh1);
				var p111 = (haxe__$Int32_Int32_$Impl_$().default)._mul(ah1,bh1);
				var low2 = p001;
				var high2 = (p111 + (p011 >>> 16) | 0) + (p101 >>> 16) | 0;
				p011 = p011 << 16;
				low2 = low2 + p011 | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low2,p011) < 0) {
					var ret3 = high2++;
					high2 = high2 | 0;
				}
				p101 = p101 << 16;
				low2 = low2 + p101 | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low2,p101) < 0) {
					var ret4 = high2++;
					high2 = high2 | 0;
				}
				high2 = high2 + ((haxe__$Int32_Int32_$Impl_$().default)._mul(multiplier.low,digit.high) + (haxe__$Int32_Int32_$Impl_$().default)._mul(multiplier.high,digit.low) | 0) | 0;
				var this7 = new (haxe__$Int64__$_$_$Int64().default)(high2,low2);
				var b1 = this7;
				var high3 = current.high + b1.high | 0;
				var low3 = current.low + b1.low | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low3,current.low) < 0) {
					var ret5 = high3++;
					high3 = high3 | 0;
				}
				var this8 = new (haxe__$Int64__$_$_$Int64().default)(high3,low3);
				current = this8;
				if(current.high < 0) {
					throw new (js__$Boot_HaxeError().default)("NumberFormatError: Overflow");
				}
			}
			var mask2 = 65535;
			var al2 = multiplier.low & mask2;
			var ah2 = multiplier.low >>> 16;
			var bl2 = base.low & mask2;
			var bh2 = base.low >>> 16;
			var p002 = (haxe__$Int32_Int32_$Impl_$().default)._mul(al2,bl2);
			var p102 = (haxe__$Int32_Int32_$Impl_$().default)._mul(ah2,bl2);
			var p012 = (haxe__$Int32_Int32_$Impl_$().default)._mul(al2,bh2);
			var p112 = (haxe__$Int32_Int32_$Impl_$().default)._mul(ah2,bh2);
			var low4 = p002;
			var high4 = (p112 + (p012 >>> 16) | 0) + (p102 >>> 16) | 0;
			p012 = p012 << 16;
			low4 = low4 + p012 | 0;
			if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low4,p012) < 0) {
				var ret6 = high4++;
				high4 = high4 | 0;
			}
			p102 = p102 << 16;
			low4 = low4 + p102 | 0;
			if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low4,p102) < 0) {
				var ret7 = high4++;
				high4 = high4 | 0;
			}
			high4 = high4 + ((haxe__$Int32_Int32_$Impl_$().default)._mul(multiplier.low,base.high) + (haxe__$Int32_Int32_$Impl_$().default)._mul(multiplier.high,base.low) | 0) | 0;
			var this9 = new (haxe__$Int64__$_$_$Int64().default)(high4,low4);
			multiplier = this9;
		}
		return current;
	}
	static fromFloat(f) {
		if(isNaN(f) || !isFinite(f)) {
			throw new (js__$Boot_HaxeError().default)("Number is NaN or Infinite");
		}
		var noFractions = f - f % 1;
		if(noFractions > 9007199254740991) {
			throw new (js__$Boot_HaxeError().default)("Conversion overflow");
		}
		if(noFractions < -9007199254740991) {
			throw new (js__$Boot_HaxeError().default)("Conversion underflow");
		}
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
		var result = this1;
		var neg = noFractions < 0;
		var rest = neg ? -noFractions : noFractions;
		var i = 0;
		while(rest >= 1) {
			var curr = rest % 2;
			rest /= 2;
			if(curr >= 1) {
				var this2 = new (haxe__$Int64__$_$_$Int64().default)(0,1);
				var a = this2;
				var b = i;
				b &= 63;
				var b1;
				if(b == 0) {
					var this3 = new (haxe__$Int64__$_$_$Int64().default)(a.high,a.low);
					b1 = this3;
				} else if(b < 32) {
					var this4 = new (haxe__$Int64__$_$_$Int64().default)(a.high << b | a.low >>> 32 - b,a.low << b);
					b1 = this4;
				} else {
					var this5 = new (haxe__$Int64__$_$_$Int64().default)(a.low << b - 32,0);
					b1 = this5;
				}
				var high = result.high + b1.high | 0;
				var low = result.low + b1.low | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low,result.low) < 0) {
					var ret = high++;
					high = high | 0;
				}
				var this6 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
				result = this6;
			}
			++i;
		}
		if(neg) {
			var high1 = ~result.high;
			var low1 = -result.low;
			if(low1 == 0) {
				var ret1 = high1++;
				high1 = high1 | 0;
			}
			var this7 = new (haxe__$Int64__$_$_$Int64().default)(high1,low1);
			result = this7;
		}
		return result;
	}
}


// Meta

Int64Helper.__name__ = ["haxe","Int64Helper"];
Int64Helper.prototype.__class__ = Int64Helper.prototype.constructor = $hxClasses["haxe.Int64Helper"] = Int64Helper;

// Init



// Statics



// Export

exports.default = Int64Helper;