// Class: util.geom.PMath

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class PMath {
	constructor(){}
	static isNaN(val) {
		return val != val;
	}
	static get INT8_MIN() { return INT8_MIN; }
	static set INT8_MIN(value) { INT8_MIN = value; }
	static get INT8_MAX() { return INT8_MAX; }
	static set INT8_MAX(value) { INT8_MAX = value; }
	static get UINT8_MAX() { return UINT8_MAX; }
	static set UINT8_MAX(value) { UINT8_MAX = value; }
	static get INT16_MIN() { return INT16_MIN; }
	static set INT16_MIN(value) { INT16_MIN = value; }
	static get INT16_MAX() { return INT16_MAX; }
	static set INT16_MAX(value) { INT16_MAX = value; }
	static get UINT16_MAX() { return UINT16_MAX; }
	static set UINT16_MAX(value) { UINT16_MAX = value; }
	static get INT32_MIN() { return INT32_MIN; }
	static set INT32_MIN(value) { INT32_MIN = value; }
	static get INT32_MAX() { return INT32_MAX; }
	static set INT32_MAX(value) { INT32_MAX = value; }
	static get UINT32_MAX() { return UINT32_MAX; }
	static set UINT32_MAX(value) { UINT32_MAX = value; }
	static get NaN() { return NaN; }
	static set NaN(value) { NaN = value; }
	static get POSITIVE_INFINITY() { return POSITIVE_INFINITY; }
	static set POSITIVE_INFINITY(value) { POSITIVE_INFINITY = value; }
	static get NEGATIVE_INFINITY() { return NEGATIVE_INFINITY; }
	static set NEGATIVE_INFINITY(value) { NEGATIVE_INFINITY = value; }
	static get FLOAT_MAX() { return FLOAT_MAX; }
	static set FLOAT_MAX(value) { FLOAT_MAX = value; }
	static get FLOAT_MIN() { return FLOAT_MIN; }
	static set FLOAT_MIN(value) { FLOAT_MIN = value; }
	static get DOUBLE_MIN() { return DOUBLE_MIN; }
	static set DOUBLE_MIN(value) { DOUBLE_MIN = value; }
	static get DOUBLE_MAX() { return DOUBLE_MAX; }
	static set DOUBLE_MAX(value) { DOUBLE_MAX = value; }
	static get RAD_DEG() { return RAD_DEG; }
	static set RAD_DEG(value) { RAD_DEG = value; }
	static get DEG_RAD() { return DEG_RAD; }
	static set DEG_RAD(value) { DEG_RAD = value; }
	static get LOG2E() { return LOG2E; }
	static set LOG2E(value) { LOG2E = value; }
	static get LN2() { return LN2; }
	static set LN2(value) { LN2 = value; }
	static get PIHALF() { return PIHALF; }
	static set PIHALF(value) { PIHALF = value; }
	static get PI() { return PI; }
	static set PI(value) { PI = value; }
	static get PI2() { return PI2; }
	static set PI2(value) { PI2 = value; }
	static get EPS() { return EPS; }
	static set EPS(value) { EPS = value; }
	static floatToInt(x) {
		return x | 0;
	}
	static intToFloat(x) {
		return x;
	}
	static toRad(deg) {
		return deg * 0.017453292519943295;
	}
	static toDeg(rad) {
		return rad * 57.295779513082323;
	}
	static min(x,y) {
		if(x < y) {
			return x;
		} else {
			return y;
		}
	}
	static minF(x,y) {
		if(x < y) {
			return x;
		} else {
			return y;
		}
	}
	static max(x,y) {
		if(x > y) {
			return x;
		} else {
			return y;
		}
	}
	static maxF(x,y) {
		if(x > y) {
			return x;
		} else {
			return y;
		}
	}
	static abs(x) {
		if(x < 0) {
			return -x;
		} else {
			return x;
		}
	}
	static absI(x) {
		if(x < 0) {
			return -x;
		} else {
			return x;
		}
	}
	static sgn(x) {
		if(x > 0) {
			return 1;
		} else if(x < 0) {
			return -1;
		} else {
			return 0;
		}
	}
	static clamp(x,min,max) {
		if(x < min) {
			return min;
		} else if(x > max) {
			return max;
		} else {
			return x;
		}
	}
	static clampSym(x,i) {
		if(x < -i) {
			return -i;
		} else if(x > i) {
			return i;
		} else {
			return x;
		}
	}
	static wrap(x,min,max) {
		if(x < min) {
			return x - min + max + 1;
		} else if(x > max) {
			return x - max + min - 1;
		} else {
			return x;
		}
	}
	static fmin(x,y) {
		if(x < y) {
			return x;
		} else {
			return y;
		}
	}
	static fmax(x,y) {
		if(x > y) {
			return x;
		} else {
			return y;
		}
	}
	static fabs(x) {
		if(x < 0) {
			return -x;
		} else {
			return x;
		}
	}
	static fsign(x) {
		if(x >= .0) {
			return 1;
		} else {
			return -1;
		}
	}
	static fclamp(x,min,max) {
		if(x < min) {
			return min;
		} else if(x > max) {
			return max;
		} else {
			return x;
		}
	}
	static fclampSym(x,i) {
		if(x < -i) {
			return -i;
		} else if(x > i) {
			return i;
		} else {
			return x;
		}
	}
	static fwrap(x,min,max) {
		if(x < min) {
			return x - min + max + 1.;
		} else if(x > max) {
			return x - max + min - 1.;
		} else {
			return x;
		}
	}
	static eqSgn(x,y) {
		return (x ^ y) >= 0;
	}
	static isEven(x) {
		return (x & 1) == 0;
	}
	static isPow2(x) {
		if(x > 0) {
			return (x & x - 1) == 0;
		} else {
			return false;
		}
	}
	static lerp(a,b,t) {
		return a + (b - a) * t;
	}
	static lerp3(x,x1,x2,q00,q01) {
		return (x2 - x) / (x2 - x1) * q00 + (x - x1) / (x2 - x1) * q01;
	}
	static biLerp(x,y,q11,q12,q21,q22,x1,x2,y1,y2) {
		return (y2 - y) / (y2 - y1) * ((x2 - x) / (x2 - x1) * q11 + (x - x1) / (x2 - x1) * q21) + (y - y1) / (y2 - y1) * ((x2 - x) / (x2 - x1) * q12 + (x - x1) / (x2 - x1) * q22);
	}
	static triLerp(x,y,z,q000,q001,q010,q011,q100,q101,q110,q111,x1,x2,y1,y2,z1,z2) {
		var x00 = (x2 - x) / (x2 - x1) * q000 + (x - x1) / (x2 - x1) * q100;
		var x10 = (x2 - x) / (x2 - x1) * q010 + (x - x1) / (x2 - x1) * q110;
		var x01 = (x2 - x) / (x2 - x1) * q001 + (x - x1) / (x2 - x1) * q101;
		var x11 = (x2 - x) / (x2 - x1) * q011 + (x - x1) / (x2 - x1) * q111;
		var r0 = (y2 - y) / (y2 - y1) * x00 + (y - y1) / (y2 - y1) * x01;
		var r1 = (y2 - y) / (y2 - y1) * x10 + (y - y1) / (y2 - y1) * x11;
		return (z2 - z) / (z2 - z1) * r0 + (z - z1) / (z2 - z1) * r1;
	}
	static slerp(a,b,t) {
		var m = Math
		var c1 = m.sin(a * .5);
		var r1 = m.cos(a * .5);
		var c2 = m.sin(b * .5);
		var r2 = m.cos(b * .5);
		var c = r1 * r2 + c1 * c2;
		if(c < 0.) {
			if(1. + c > 1e-6) {
				var o = m.acos(-c);
				var s = m.sin(o);
				var s0 = m.sin((1 - t) * o) / s;
				var s1 = m.sin(t * o) / s;
				return m.atan2(s0 * c1 - s1 * c2,s0 * r1 - s1 * r2) * 2.;
			} else {
				var s01 = 1 - t;
				var s11 = t;
				return m.atan2(s01 * c1 - s11 * c2,s01 * r1 - s11 * r2) * 2;
			}
		} else if(1 - c > 1e-6) {
			var o1 = m.acos(c);
			var s2 = m.sin(o1);
			var s02 = m.sin((1 - t) * o1) / s2;
			var s12 = m.sin(t * o1) / s2;
			return m.atan2(s02 * c1 + s12 * c2,s02 * r1 + s12 * r2) * 2.;
		} else {
			var s03 = 1 - t;
			var s13 = t;
			return m.atan2(s03 * c1 + s13 * c2,s03 * r1 + s13 * r2) * 2;
		}
	}
	static nextPow2(x) {
		var t = x;
		t |= t >> 1;
		t |= t >> 2;
		t |= t >> 3;
		t |= t >> 4;
		t |= t >> 5;
		return t + 1;
	}
	static exp(a,n) {
		var t = 1;
		var r = 0;
		while(true) {
			if((n & 1) != 0) {
				t = a * t;
			}
			n >>= 1;
			if(n == 0) {
				r = t;
				break;
			} else {
				a *= a;
			}
		}
		return r;
	}
	static roundTo(x,y) {
		var x1 = x / y;
		return ((x1 > 0 ? x1 + .5 : x1 < 0 ? x1 - .5 : 0) | 0) * y;
	}
	static round(x) {
		return (x > 0 ? x + .5 : x < 0 ? x - .5 : 0) | 0;
	}
	static ceil(x) {
		if(x > .0) {
			var t = x + .5 | 0;
			if(t < x) {
				return t + 1;
			} else {
				return t;
			}
		} else if(x < .0) {
			var t1 = x - .5 | 0;
			if(t1 < x) {
				return t1 + 1;
			} else {
				return t1;
			}
		} else {
			return 0;
		}
	}
	static floor(x) {
		if(x > .0) {
			var t = x + .5 | 0;
			if(t < x) {
				return t;
			} else {
				return t - 1;
			}
		} else if(x < .0) {
			var t1 = x - .5 | 0;
			if(t1 > x) {
				return t1 - 1;
			} else {
				return t1;
			}
		} else {
			return 0;
		}
	}
	static invSqrt(x) {
		return 1 / Math.sqrt(x);
	}
	static cmpAbs(x,y,eps) {
		var d = x - y;
		if(d > 0) {
			return d < eps;
		} else {
			return -d < eps;
		}
	}
	static cmpZero(x,eps) {
		if(x > 0) {
			return x < eps;
		} else {
			return -x < eps;
		}
	}
	static snap(x,y) {
		var x1 = (x + y * .5) / y;
		if(x1 > .0) {
			var t = x1 + .5 | 0;
			if(t < x1) {
				return t;
			} else {
				return t - 1;
			}
		} else if(x1 < .0) {
			var t1 = x1 - .5 | 0;
			if(t1 > x1) {
				return t1 - 1;
			} else {
				return t1;
			}
		} else {
			return 0;
		}
	}
	static inRange(x,min,max) {
		if(x >= min) {
			return x <= max;
		} else {
			return false;
		}
	}
	static rand() {
		return Math.random() * 2147483647 | 0;
	}
	static randRange(min,max) {
		var x = min - .4999 + (max + .4999 - (min - .4999)) * Math.random();
		return (x > 0 ? x + .5 : x < 0 ? x - .5 : 0) | 0;
	}
	static randRangeSym(range) {
		var min = -range;
		var x = min - .4999 + (range + .4999 - (min - .4999)) * Math.random();
		return (x > 0 ? x + .5 : x < 0 ? x - .5 : 0) | 0;
	}
	static frand() {
		return Math.random();
	}
	static frandRange(min,max) {
		return min + (max - min) * Math.random();
	}
	static frandRangeSym(range) {
		var min = -range;
		return min + (range - min) * Math.random();
	}
	static wrapToPi(x) {
		var x1 = x / 6.283185307179586;
		var t = (x1 > 0 ? x1 + .5 : x1 < 0 ? x1 - .5 : 0) | 0;
		if(x < -3.1415926535897931) {
			return x - t * 6.283185307179586;
		} else if(x > 3.141592653589793) {
			return x - t * 6.283185307179586;
		} else {
			return x;
		}
	}
}


// Meta

PMath.__name__ = ["util","geom","PMath"];
PMath.prototype.__class__ = PMath.prototype.constructor = $hxClasses["util.geom.PMath"] = PMath;

// Init



// Statics

var INT8_MIN = -128;
var INT8_MAX = 127;
var UINT8_MAX = 255;
var INT16_MIN = -32768;
var INT16_MAX = 32767;
var UINT16_MAX = 65535;
var INT32_MIN = -2147483648;
var INT32_MAX = 2147483647;
var UINT32_MAX = -1;
var NaN = .0 / .0;
var POSITIVE_INFINITY = 1. / .0;
var NEGATIVE_INFINITY = -1. / .0;
var FLOAT_MAX = 3.40282346638528e+38;
var FLOAT_MIN = -3.40282346638528e+38;
var DOUBLE_MIN = 1.79769313486231e+308;
var DOUBLE_MAX = -1.79769313486231e+308;
var RAD_DEG = 57.295779513082323;
var DEG_RAD = 0.017453292519943295;
var LOG2E = 1.4426950408889634;
var LN2 = 0.6931471805599453;
var PIHALF = 1.5707963267948966;
var PI = 3.141592653589793;
var PI2 = 6.283185307179586;
var EPS = 1e-6;

// Export

exports.default = PMath;