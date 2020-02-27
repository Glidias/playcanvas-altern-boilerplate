// Class: haxe.ds._Vector.Vector_Impl_

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function Std() {return require("./../../../Std");}

// Constructor

class Vector_Impl_ {
	constructor(){}
	static _new(length) {
		var this1 = new Array(length);
		return this1;
	}
	static get(this1,index) {
		return this1[index];
	}
	static set(this1,index,val) {
		return this1[index] = val;
	}
	static get_length(this1) {
		return this1.length;
	}
	static blit(src,srcPos,dest,destPos,len) {
		if(src == dest) {
			if(srcPos < destPos) {
				var i = srcPos + len;
				var j = destPos + len;
				var _g1 = 0;
				var _g = len;
				while(_g1 < _g) {
					var k = _g1++;
					--i;
					--j;
					src[j] = src[i];
				}
			} else if(srcPos > destPos) {
				var i1 = srcPos;
				var j1 = destPos;
				var _g11 = 0;
				var _g2 = len;
				while(_g11 < _g2) {
					var k1 = _g11++;
					src[j1] = src[i1];
					++i1;
					++j1;
				}
			}
		} else {
			var _g12 = 0;
			var _g3 = len;
			while(_g12 < _g3) {
				var i2 = _g12++;
				dest[destPos + i2] = src[srcPos + i2];
			}
		}
	}
	static toArray(this1) {
		return this1.slice(0);
	}
	static toData(this1) {
		return this1;
	}
	static fromData(data) {
		return data;
	}
	static fromArrayCopy(array) {
		return array.slice(0);
	}
	static copy(this1) {
		var length = this1.length;
		var this2 = new Array(length);
		var r = this2;
		Vector_Impl_.blit(this1,0,r,0,this1.length);
		return r;
	}
	static join(this1,sep) {
		var b_b = "";
		var i = 0;
		var len = this1.length;
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i1 = _g1++;
			b_b += (Std().default).string((Std().default).string(this1[i1]));
			if(i1 < len - 1) {
				b_b += sep == null ? "null" : "" + sep;
			}
		}
		return b_b;
	}
	static map(this1,f) {
		var length = this1.length;
		var this2 = new Array(length);
		var r = this2;
		var i = 0;
		var len = length;
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i1 = _g1++;
			var v = f(this1[i1]);
			r[i1] = v;
		}
		return r;
	}
	static sort(this1,f) {
		this1.sort(f);
	}
}


// Meta

Vector_Impl_.__name__ = ["haxe","ds","_Vector","Vector_Impl_"];
Vector_Impl_.prototype.__class__ = Vector_Impl_.prototype.constructor = $hxClasses["haxe.ds._Vector.Vector_Impl_"] = Vector_Impl_;

// Init



// Statics



// Export

exports.default = Vector_Impl_;