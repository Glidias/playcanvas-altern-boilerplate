// Class: de.polygonal.ds.tools.ArrayTools

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../../hxClasses_stub").default;
var $import = require("./../../../../import_stub").default;
function de_polygonal_ds_tools_Shuffle() {return require("./../../../../de/polygonal/ds/tools/Shuffle");}

// Constructor

class ArrayTools {
	constructor(){}
	static alloc(len) {
		var a = new Array(len);
		return a;
	}
	static trim(a,len) {
		if(a.length > len) {
			a.length = len;
			return a;
		} else {
			return a;
		}
	}
	static swap(array,a,b) {
		if(a != b) {
			var x = array[a];
			array[a] = array[b];
			array[b] = x;
		}
	}
	static getFront(array,index) {
		if(index != 0) {
			var x = array[index];
			array[index] = array[0];
			array[0] = x;
		}
		return array[0];
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
	static iter(src,f,n) {
		if(n == null) {
			n = 0;
		}
		if(n == 0) {
			n = src.length;
		}
		var _g1 = 0;
		var _g = n;
		while(_g1 < _g) {
			var i = _g1++;
			f(src[i]);
		}
	}
	static forEach(src,f) {
		var n = src.length;
		var _g1 = 0;
		var _g = n;
		while(_g1 < _g) {
			var i = _g1++;
			src[i] = f(src[i],i);
		}
	}
	static binarySearchCmp(a,x,min,max,comparator) {
		var l = min;
		var m;
		var h = max + 1;
		while(l < h) {
			m = l + (h - l >> 1);
			if(comparator(a[m],x) < 0) {
				l = m + 1;
			} else {
				h = m;
			}
		}
		if(l <= max && comparator(a[l],x) == 0) {
			return l;
		} else {
			return ~l;
		}
	}
	static binarySearchf(a,x,min,max) {
		var l = min;
		var m;
		var h = max + 1;
		while(l < h) {
			m = l + (h - l >> 1);
			if(a[m] < x) {
				l = m + 1;
			} else {
				h = m;
			}
		}
		if(l <= max && a[l] == x) {
			return l;
		} else {
			return ~l;
		}
	}
	static binarySearchi(a,x,min,max) {
		var l = min;
		var m;
		var h = max + 1;
		while(l < h) {
			m = l + (h - l >> 1);
			if(a[m] < x) {
				l = m + 1;
			} else {
				h = m;
			}
		}
		if(l <= max && a[l] == x) {
			return l;
		} else {
			return ~l;
		}
	}
	static shuffle(a,rvals) {
		var s = a.length;
		if(rvals == null) {
			while(--s > 1) {
				var i = (de_polygonal_ds_tools_Shuffle().default)._f() * s | 0;
				var t = a[s];
				a[s] = a[i];
				a[i] = t;
			}
		} else {
			var j = 0;
			while(--s > 1) {
				var i1 = rvals[j++] * s | 0;
				var t1 = a[s];
				a[s] = a[i1];
				a[i1] = t1;
			}
		}
	}
	static sortRange(a,cmp,useInsertionSort,first,n) {
		var k = a.length;
		if(k > 1) {
			if(useInsertionSort) {
				var _g1 = first + 1;
				var _g = first + n;
				while(_g1 < _g) {
					var i = _g1++;
					var x = a[i];
					var j = i;
					while(j > first) {
						var y = a[j - 1];
						if(cmp(y,x) > 0) {
							a[j] = y;
							--j;
						} else {
							break;
						}
					}
					a[j] = x;
				}
			} else {
				ArrayTools._quickSort(a,first,n,cmp);
			}
		}
	}
	static quickPerm(n) {
		var results = [];
		var a = [];
		var p = [];
		var i;
		var j;
		var t;
		i = 0;
		while(i < n) {
			a[i] = i + 1;
			p[i] = 0;
			++i;
		}
		results.push(a.slice());
		i = 1;
		while(i < n) if(p[i] < i) {
			j = i % 2 * p[i];
			t = a[j];
			a[j] = a[i];
			a[i] = t;
			results.push(a.slice());
			p[i]++;
			i = 1;
		} else {
			p[i] = 0;
			++i;
		}
		return results;
	}
	static equals(a,b) {
		if(a.length != b.length) {
			return false;
		}
		var _g1 = 0;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(a[i] != b[i]) {
				return false;
			}
		}
		return true;
	}
	static split(a,n,k) {
		var out = [];
		var b = null;
		var _g1 = 0;
		var _g = n;
		while(_g1 < _g) {
			var i = _g1++;
			if(i % k == 0) {
				b = [];
				out[i / k | 0] = b;
			}
			b.push(a[i]);
		}
		return out;
	}
	static pairwise(input,visit) {
		var i = 0;
		var k = input.length;
		while(i < k) {
			visit(i,input[i],input[i + 1]);
			i += 2;
		}
	}
	static bruteforce(input,visit) {
		var i = 0;
		var j;
		var k = input.length;
		var l = k - 1;
		while(i < l) {
			j = i + 1;
			while(j < k) {
				visit(input[i],input[j]);
				++j;
			}
			++i;
		}
	}
	static _quickSort(a,first,n,cmp) {
		var last = first + n - 1;
		var lo = first;
		var hi = last;
		if(n > 1) {
			var i0 = first;
			var i1 = i0 + (n >> 1);
			var i2 = i0 + n - 1;
			var t0 = a[i0];
			var t1 = a[i1];
			var t2 = a[i2];
			var mid;
			var t = cmp(t0,t2);
			if(t < 0 && cmp(t0,t1) < 0) {
				if(cmp(t1,t2) < 0) {
					mid = i1;
				} else {
					mid = i2;
				}
			} else if(cmp(t1,t0) < 0 && cmp(t1,t2) < 0) {
				if(t < 0) {
					mid = i0;
				} else {
					mid = i2;
				}
			} else if(cmp(t2,t0) < 0) {
				mid = i1;
			} else {
				mid = i0;
			}
			var pivot = a[mid];
			a[mid] = a[first];
			while(lo < hi) {
				while(cmp(pivot,a[hi]) < 0 && lo < hi) --hi;
				if(hi != lo) {
					a[lo] = a[hi];
					++lo;
				}
				while(cmp(pivot,a[lo]) > 0 && lo < hi) ++lo;
				if(hi != lo) {
					a[hi] = a[lo];
					--hi;
				}
			}
			a[lo] = pivot;
			ArrayTools._quickSort(a,first,lo - first,cmp);
			ArrayTools._quickSort(a,lo + 1,last - lo,cmp);
		}
	}
}


// Meta

ArrayTools.__name__ = ["de","polygonal","ds","tools","ArrayTools"];
ArrayTools.prototype.__class__ = ArrayTools.prototype.constructor = $hxClasses["de.polygonal.ds.tools.ArrayTools"] = ArrayTools;

// Init



// Statics



// Export

exports.default = ArrayTools;