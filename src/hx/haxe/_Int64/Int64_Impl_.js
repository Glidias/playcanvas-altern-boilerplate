// Class: haxe._Int64.Int64_Impl_

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe__$Int64__$_$_$Int64() {return require("./../../haxe/_Int64/___Int64");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function js_Boot() {return require("./../../js/Boot");}
function haxe__$Int32_Int32_$Impl_$() {return require("./../../haxe/_Int32/Int32_Impl_");}
function haxe_Int64Helper() {return require("./../../haxe/Int64Helper");}

// Constructor

class Int64_Impl_ {
	constructor(){}
	static _new(x) {
		var this1 = x;
		return this1;
	}
	static copy(this1) {
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(this1.high,this1.low);
		return this2;
	}
	static make(high,low) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this1;
	}
	static ofInt(x) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(x >> 31,x);
		return this1;
	}
	static toInt(x) {
		if(x.high != x.low >> 31) {
			throw new (js__$Boot_HaxeError().default)("Overflow");
		}
		return x.low;
	}
	static is(val) {
		return (js_Boot().default).__instanceof(val,(haxe__$Int64__$_$_$Int64().default));
	}
	static getHigh(x) {
		return x.high;
	}
	static getLow(x) {
		return x.low;
	}
	static isNeg(x) {
		return x.high < 0;
	}
	static isZero(x) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
		var b = this1;
		if(x.high == b.high) {
			return x.low == b.low;
		} else {
			return false;
		}
	}
	static compare(a,b) {
		var v = a.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b.low);
		}
		if(a.high < 0) {
			if(b.high < 0) {
				return v;
			} else {
				return -1;
			}
		} else if(b.high >= 0) {
			return v;
		} else {
			return 1;
		}
	}
	static ucompare(a,b) {
		var v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.high,b.high);
		if(v != 0) {
			return v;
		} else {
			return (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b.low);
		}
	}
	static toStr(x) {
		return Int64_Impl_.toString(x);
	}
	static toString(this1) {
		var i = this1;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
		var b = this2;
		if(i.high == b.high && i.low == b.low) {
			return "0";
		}
		var str = "";
		var neg = false;
		if(i.high < 0) {
			neg = true;
		}
		var this3 = new (haxe__$Int64__$_$_$Int64().default)(0,10);
		var ten = this3;
		while(true) {
			var this4 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
			var b1 = this4;
			if(!(i.high != b1.high || i.low != b1.low)) {
				break;
			}
			var r = Int64_Impl_.divMod(i,ten);
			if(r.modulus.high < 0) {
				var x = r.modulus;
				var high = ~x.high;
				var low = -x.low;
				if(low == 0) {
					var ret = high++;
					high = high | 0;
				}
				var this5 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
				str = this5.low + str;
				var x1 = r.quotient;
				var high1 = ~x1.high;
				var low1 = -x1.low;
				if(low1 == 0) {
					var ret1 = high1++;
					high1 = high1 | 0;
				}
				var this6 = new (haxe__$Int64__$_$_$Int64().default)(high1,low1);
				i = this6;
			} else {
				str = r.modulus.low + str;
				i = r.quotient;
			}
		}
		if(neg) {
			str = "-" + str;
		}
		return str;
	}
	static parseString(sParam) {
		return (haxe_Int64Helper().default).parseString(sParam);
	}
	static fromFloat(f) {
		return (haxe_Int64Helper().default).fromFloat(f);
	}
	static divMod(dividend,divisor) {
		if(divisor.high == 0) {
			var _g = divisor.low;
			switch(_g) {
			case 0:
				throw new (js__$Boot_HaxeError().default)("divide by zero");
				break;
			case 1:
				var this1 = new (haxe__$Int64__$_$_$Int64().default)(dividend.high,dividend.low);
				var this2 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
				return { quotient : this1, modulus : this2};
			}
		}
		var divSign = dividend.high < 0 != divisor.high < 0;
		var modulus;
		if(dividend.high < 0) {
			var high = ~dividend.high;
			var low = -dividend.low;
			if(low == 0) {
				var ret = high++;
				high = high | 0;
			}
			var this3 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
			modulus = this3;
		} else {
			var this4 = new (haxe__$Int64__$_$_$Int64().default)(dividend.high,dividend.low);
			modulus = this4;
		}
		if(divisor.high < 0) {
			var high1 = ~divisor.high;
			var low1 = -divisor.low;
			if(low1 == 0) {
				var ret1 = high1++;
				high1 = high1 | 0;
			}
			var this5 = new (haxe__$Int64__$_$_$Int64().default)(high1,low1);
			divisor = this5;
		} else {
			divisor = divisor;
		}
		var this6 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
		var quotient = this6;
		var this7 = new (haxe__$Int64__$_$_$Int64().default)(0,1);
		var mask = this7;
		while(!(divisor.high < 0)) {
			var v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(divisor.high,modulus.high);
			var cmp = v != 0 ? v : (haxe__$Int32_Int32_$Impl_$().default).ucompare(divisor.low,modulus.low);
			var b = 1;
			b &= 63;
			if(b == 0) {
				var this8 = new (haxe__$Int64__$_$_$Int64().default)(divisor.high,divisor.low);
				divisor = this8;
			} else if(b < 32) {
				var this9 = new (haxe__$Int64__$_$_$Int64().default)(divisor.high << b | divisor.low >>> 32 - b,divisor.low << b);
				divisor = this9;
			} else {
				var this10 = new (haxe__$Int64__$_$_$Int64().default)(divisor.low << b - 32,0);
				divisor = this10;
			}
			var b1 = 1;
			b1 &= 63;
			if(b1 == 0) {
				var this11 = new (haxe__$Int64__$_$_$Int64().default)(mask.high,mask.low);
				mask = this11;
			} else if(b1 < 32) {
				var this12 = new (haxe__$Int64__$_$_$Int64().default)(mask.high << b1 | mask.low >>> 32 - b1,mask.low << b1);
				mask = this12;
			} else {
				var this13 = new (haxe__$Int64__$_$_$Int64().default)(mask.low << b1 - 32,0);
				mask = this13;
			}
			if(cmp >= 0) {
				break;
			}
		}
		while(true) {
			var this14 = new (haxe__$Int64__$_$_$Int64().default)(0,0);
			var b2 = this14;
			if(!(mask.high != b2.high || mask.low != b2.low)) {
				break;
			}
			var v1 = (haxe__$Int32_Int32_$Impl_$().default).ucompare(modulus.high,divisor.high);
			if((v1 != 0 ? v1 : (haxe__$Int32_Int32_$Impl_$().default).ucompare(modulus.low,divisor.low)) >= 0) {
				var this15 = new (haxe__$Int64__$_$_$Int64().default)(quotient.high | mask.high,quotient.low | mask.low);
				quotient = this15;
				var high2 = modulus.high - divisor.high | 0;
				var low2 = modulus.low - divisor.low | 0;
				if((haxe__$Int32_Int32_$Impl_$().default).ucompare(modulus.low,divisor.low) < 0) {
					var ret2 = high2--;
					high2 = high2 | 0;
				}
				var this16 = new (haxe__$Int64__$_$_$Int64().default)(high2,low2);
				modulus = this16;
			}
			var b3 = 1;
			b3 &= 63;
			if(b3 == 0) {
				var this17 = new (haxe__$Int64__$_$_$Int64().default)(mask.high,mask.low);
				mask = this17;
			} else if(b3 < 32) {
				var this18 = new (haxe__$Int64__$_$_$Int64().default)(mask.high >>> b3,mask.high << 32 - b3 | mask.low >>> b3);
				mask = this18;
			} else {
				var this19 = new (haxe__$Int64__$_$_$Int64().default)(0,mask.high >>> b3 - 32);
				mask = this19;
			}
			var b4 = 1;
			b4 &= 63;
			if(b4 == 0) {
				var this20 = new (haxe__$Int64__$_$_$Int64().default)(divisor.high,divisor.low);
				divisor = this20;
			} else if(b4 < 32) {
				var this21 = new (haxe__$Int64__$_$_$Int64().default)(divisor.high >>> b4,divisor.high << 32 - b4 | divisor.low >>> b4);
				divisor = this21;
			} else {
				var this22 = new (haxe__$Int64__$_$_$Int64().default)(0,divisor.high >>> b4 - 32);
				divisor = this22;
			}
		}
		if(divSign) {
			var high3 = ~quotient.high;
			var low3 = -quotient.low;
			if(low3 == 0) {
				var ret3 = high3++;
				high3 = high3 | 0;
			}
			var this23 = new (haxe__$Int64__$_$_$Int64().default)(high3,low3);
			quotient = this23;
		}
		if(dividend.high < 0) {
			var high4 = ~modulus.high;
			var low4 = -modulus.low;
			if(low4 == 0) {
				var ret4 = high4++;
				high4 = high4 | 0;
			}
			var this24 = new (haxe__$Int64__$_$_$Int64().default)(high4,low4);
			modulus = this24;
		}
		return { quotient : quotient, modulus : modulus};
	}
	static neg(x) {
		var high = ~x.high;
		var low = -x.low;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this1;
	}
	static preIncrement(this1) {
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(this1.high,this1.low);
		this1 = this2;
		var ret = this1.low++;
		this1.low = this1.low | 0;
		if(this1.low == 0) {
			var ret1 = this1.high++;
			this1.high = this1.high | 0;
		}
		return this1;
	}
	static postIncrement(this1) {
		var ret = this1;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(this1.high,this1.low);
		this1 = this2;
		var ret1 = this1.low++;
		this1.low = this1.low | 0;
		if(this1.low == 0) {
			var ret2 = this1.high++;
			this1.high = this1.high | 0;
		}
		return ret;
	}
	static preDecrement(this1) {
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(this1.high,this1.low);
		this1 = this2;
		if(this1.low == 0) {
			var ret = this1.high--;
			this1.high = this1.high | 0;
		}
		var ret1 = this1.low--;
		this1.low = this1.low | 0;
		return this1;
	}
	static postDecrement(this1) {
		var ret = this1;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(this1.high,this1.low);
		this1 = this2;
		if(this1.low == 0) {
			var ret1 = this1.high--;
			this1.high = this1.high | 0;
		}
		var ret2 = this1.low--;
		this1.low = this1.low | 0;
		return ret;
	}
	static add(a,b) {
		var high = a.high + b.high | 0;
		var low = a.low + b.low | 0;
		if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low,a.low) < 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this1;
	}
	static addInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		var high = a.high + b1.high | 0;
		var low = a.low + b1.low | 0;
		if((haxe__$Int32_Int32_$Impl_$().default).ucompare(low,a.low) < 0) {
			var ret = high++;
			high = high | 0;
		}
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this2;
	}
	static sub(a,b) {
		var high = a.high - b.high | 0;
		var low = a.low - b.low | 0;
		if((haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b.low) < 0) {
			var ret = high--;
			high = high | 0;
		}
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this1;
	}
	static subInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		var high = a.high - b1.high | 0;
		var low = a.low - b1.low | 0;
		if((haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b1.low) < 0) {
			var ret = high--;
			high = high | 0;
		}
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this2;
	}
	static intSub(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a >> 31,a);
		var a1 = this1;
		var high = a1.high - b.high | 0;
		var low = a1.low - b.low | 0;
		if((haxe__$Int32_Int32_$Impl_$().default).ucompare(a1.low,b.low) < 0) {
			var ret = high--;
			high = high | 0;
		}
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this2;
	}
	static mul(a,b) {
		var mask = 65535;
		var al = a.low & mask;
		var ah = a.low >>> 16;
		var bl = b.low & mask;
		var bh = b.low >>> 16;
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
		high = high + ((haxe__$Int32_Int32_$Impl_$().default)._mul(a.low,b.high) + (haxe__$Int32_Int32_$Impl_$().default)._mul(a.high,b.low) | 0) | 0;
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this1;
	}
	static mulInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		var mask = 65535;
		var al = a.low & mask;
		var ah = a.low >>> 16;
		var bl = b1.low & mask;
		var bh = b1.low >>> 16;
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
		high = high + ((haxe__$Int32_Int32_$Impl_$().default)._mul(a.low,b1.high) + (haxe__$Int32_Int32_$Impl_$().default)._mul(a.high,b1.low) | 0) | 0;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(high,low);
		return this2;
	}
	static div(a,b) {
		return Int64_Impl_.divMod(a,b).quotient;
	}
	static divInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		return Int64_Impl_.divMod(a,this1).quotient;
	}
	static intDiv(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a >> 31,a);
		var x = Int64_Impl_.divMod(this1,b).quotient;
		if(x.high != x.low >> 31) {
			throw new (js__$Boot_HaxeError().default)("Overflow");
		}
		var x1 = x.low;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(x1 >> 31,x1);
		return this2;
	}
	static mod(a,b) {
		return Int64_Impl_.divMod(a,b).modulus;
	}
	static modInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var x = Int64_Impl_.divMod(a,this1).modulus;
		if(x.high != x.low >> 31) {
			throw new (js__$Boot_HaxeError().default)("Overflow");
		}
		var x1 = x.low;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(x1 >> 31,x1);
		return this2;
	}
	static intMod(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a >> 31,a);
		var x = Int64_Impl_.divMod(this1,b).modulus;
		if(x.high != x.low >> 31) {
			throw new (js__$Boot_HaxeError().default)("Overflow");
		}
		var x1 = x.low;
		var this2 = new (haxe__$Int64__$_$_$Int64().default)(x1 >> 31,x1);
		return this2;
	}
	static eq(a,b) {
		if(a.high == b.high) {
			return a.low == b.low;
		} else {
			return false;
		}
	}
	static eqInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		if(a.high == b1.high) {
			return a.low == b1.low;
		} else {
			return false;
		}
	}
	static neq(a,b) {
		if(!(a.high != b.high)) {
			return a.low != b.low;
		} else {
			return true;
		}
	}
	static neqInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		if(!(a.high != b1.high)) {
			return a.low != b1.low;
		} else {
			return true;
		}
	}
	static lt(a,b) {
		var v = a.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
	}
	static ltInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		var v = a.high - b1.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b1.low);
		}
		return (a.high < 0 ? b1.high < 0 ? v : -1 : b1.high >= 0 ? v : 1) < 0;
	}
	static intLt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a >> 31,a);
		var a1 = this1;
		var v = a1.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a1.low,b.low);
		}
		return (a1.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
	}
	static lte(a,b) {
		var v = a.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
	}
	static lteInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		var v = a.high - b1.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b1.low);
		}
		return (a.high < 0 ? b1.high < 0 ? v : -1 : b1.high >= 0 ? v : 1) <= 0;
	}
	static intLte(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a >> 31,a);
		var a1 = this1;
		var v = a1.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a1.low,b.low);
		}
		return (a1.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
	}
	static gt(a,b) {
		var v = a.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
	}
	static gtInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		var v = a.high - b1.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b1.low);
		}
		return (a.high < 0 ? b1.high < 0 ? v : -1 : b1.high >= 0 ? v : 1) > 0;
	}
	static intGt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a >> 31,a);
		var a1 = this1;
		var v = a1.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a1.low,b.low);
		}
		return (a1.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
	}
	static gte(a,b) {
		var v = a.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
	}
	static gteInt(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(b >> 31,b);
		var b1 = this1;
		var v = a.high - b1.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a.low,b1.low);
		}
		return (a.high < 0 ? b1.high < 0 ? v : -1 : b1.high >= 0 ? v : 1) >= 0;
	}
	static intGte(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a >> 31,a);
		var a1 = this1;
		var v = a1.high - b.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = (haxe__$Int32_Int32_$Impl_$().default).ucompare(a1.low,b.low);
		}
		return (a1.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
	}
	static complement(a) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(~a.high,~a.low);
		return this1;
	}
	static and(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a.high & b.high,a.low & b.low);
		return this1;
	}
	static or(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a.high | b.high,a.low | b.low);
		return this1;
	}
	static xor(a,b) {
		var this1 = new (haxe__$Int64__$_$_$Int64().default)(a.high ^ b.high,a.low ^ b.low);
		return this1;
	}
	static shl(a,b) {
		b &= 63;
		if(b == 0) {
			var this1 = new (haxe__$Int64__$_$_$Int64().default)(a.high,a.low);
			return this1;
		} else if(b < 32) {
			var this2 = new (haxe__$Int64__$_$_$Int64().default)(a.high << b | a.low >>> 32 - b,a.low << b);
			return this2;
		} else {
			var this3 = new (haxe__$Int64__$_$_$Int64().default)(a.low << b - 32,0);
			return this3;
		}
	}
	static shr(a,b) {
		b &= 63;
		if(b == 0) {
			var this1 = new (haxe__$Int64__$_$_$Int64().default)(a.high,a.low);
			return this1;
		} else if(b < 32) {
			var this2 = new (haxe__$Int64__$_$_$Int64().default)(a.high >> b,a.high << 32 - b | a.low >>> b);
			return this2;
		} else {
			var this3 = new (haxe__$Int64__$_$_$Int64().default)(a.high >> 31,a.high >> b - 32);
			return this3;
		}
	}
	static ushr(a,b) {
		b &= 63;
		if(b == 0) {
			var this1 = new (haxe__$Int64__$_$_$Int64().default)(a.high,a.low);
			return this1;
		} else if(b < 32) {
			var this2 = new (haxe__$Int64__$_$_$Int64().default)(a.high >>> b,a.high << 32 - b | a.low >>> b);
			return this2;
		} else {
			var this3 = new (haxe__$Int64__$_$_$Int64().default)(0,a.high >>> b - 32);
			return this3;
		}
	}
	static get_high(this1) {
		return this1.high;
	}
	static set_high(this1,x) {
		return this1.high = x;
	}
	static get_low(this1) {
		return this1.low;
	}
	static set_low(this1,x) {
		return this1.low = x;
	}
}


// Meta

Int64_Impl_.__name__ = ["haxe","_Int64","Int64_Impl_"];
Int64_Impl_.prototype.__class__ = Int64_Impl_.prototype.constructor = $hxClasses["haxe._Int64.Int64_Impl_"] = Int64_Impl_;

// Init



// Statics



// Export

exports.default = Int64_Impl_;