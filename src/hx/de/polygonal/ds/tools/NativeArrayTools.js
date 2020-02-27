// Class: de.polygonal.ds.tools.NativeArrayTools

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../../hxClasses_stub").default;
var $import = require("./../../../../import_stub").default;

// Constructor

class NativeArrayTools {
	constructor(){}
	static alloc(len) {
		return new Array(len);
	}
	static get(src,index) {
		return src[index];
	}
	static set(dst,index,val) {
		dst[index] = val;
	}
	static size(a) {
		return a.length;
	}
	static toArray(src,first,len,dst) {
		if(len == 0) {
			return [];
		}
		var a = new Array(len);
		var out = a;
		if(first == 0) {
			var _g1 = 0;
			var _g = len;
			while(_g1 < _g) {
				var i = _g1++;
				out[i] = src[i];
			}
		} else {
			var _g11 = first;
			var _g2 = first + len;
			while(_g11 < _g2) {
				var i1 = _g11++;
				out[i1 - first] = src[i1];
			}
		}
		return out;
	}
	static ofArray(src) {
		return src.slice(0,src.length);
	}
	static blit(src,srcPos,dst,dstPos,n) {
		if(n > 0) {
			if(src == dst) {
				if(srcPos < dstPos) {
					var i = srcPos + n;
					var j = dstPos + n;
					var _g1 = 0;
					var _g = n;
					while(_g1 < _g) {
						var k = _g1++;
						--i;
						--j;
						src[j] = src[i];
					}
				} else if(srcPos > dstPos) {
					var i1 = srcPos;
					var j1 = dstPos;
					var _g11 = 0;
					var _g2 = n;
					while(_g11 < _g2) {
						var k1 = _g11++;
						src[j1] = src[i1];
						++i1;
						++j1;
					}
				}
			} else if(srcPos == 0 && dstPos == 0) {
				var _g12 = 0;
				var _g3 = n;
				while(_g12 < _g3) {
					var i2 = _g12++;
					dst[i2] = src[i2];
				}
			} else if(srcPos == 0) {
				var _g13 = 0;
				var _g4 = n;
				while(_g13 < _g4) {
					var i3 = _g13++;
					dst[dstPos + i3] = src[i3];
				}
			} else if(dstPos == 0) {
				var _g14 = 0;
				var _g5 = n;
				while(_g14 < _g5) {
					var i4 = _g14++;
					dst[i4] = src[srcPos + i4];
				}
			} else {
				var _g15 = 0;
				var _g6 = n;
				while(_g15 < _g6) {
					var i5 = _g15++;
					dst[dstPos + i5] = src[srcPos + i5];
				}
			}
		}
	}
	static copy(src) {
		return src.slice(0);
	}
	static zero(dst,first,n) {
		if(n == null) {
			n = 0;
		}
		if(first == null) {
			first = 0;
		}
		var min = first;
		var max = n <= 0 ? dst.length : min + n;
		var val = 0;
		while(min < max) dst[min++] = val;
		return dst;
	}
	static init(a,val,first,n) {
		if(n == null) {
			n = 0;
		}
		if(first == null) {
			first = 0;
		}
		var min = first;
		var max = n <= 0 ? a.length : min + n;
		while(min < max) a[min++] = val;
		return a;
	}
	static nullify(a,first,n) {
		if(n == null) {
			n = 0;
		}
		if(first == null) {
			first = 0;
		}
		var min = first;
		var max = n <= 0 ? a.length : min + n;
		while(min < max) a[min++] = null;
		return a;
	}
	static binarySearchCmp(a,val,min,max,cmp) {
		var l = min;
		var m;
		var h = max + 1;
		while(l < h) {
			m = l + (h - l >> 1);
			if(cmp(a[m],val) < 0) {
				l = m + 1;
			} else {
				h = m;
			}
		}
		if(l <= max && cmp(a[l],val) == 0) {
			return l;
		} else {
			return ~l;
		}
	}
	static binarySearchf(a,val,min,max) {
		var l = min;
		var m;
		var h = max + 1;
		while(l < h) {
			m = l + (h - l >> 1);
			if(a[m] < val) {
				l = m + 1;
			} else {
				h = m;
			}
		}
		if(l <= max && a[l] == val) {
			return l;
		} else {
			return ~l;
		}
	}
	static binarySearchi(a,val,min,max) {
		var l = min;
		var m;
		var h = max + 1;
		while(l < h) {
			m = l + (h - l >> 1);
			if(a[m] < val) {
				l = m + 1;
			} else {
				h = m;
			}
		}
		if(l <= max && a[l] == val) {
			return l;
		} else {
			return ~l;
		}
	}
}


// Meta

NativeArrayTools.__name__ = ["de","polygonal","ds","tools","NativeArrayTools"];
NativeArrayTools.prototype.__class__ = NativeArrayTools.prototype.constructor = $hxClasses["de.polygonal.ds.tools.NativeArrayTools"] = NativeArrayTools;

// Init



// Statics



// Export

exports.default = NativeArrayTools;