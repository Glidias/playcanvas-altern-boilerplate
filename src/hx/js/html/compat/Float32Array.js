// Class: js.html.compat.Float32Array

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function js_html_compat_ArrayBuffer() {return require("./../../../js/html/compat/ArrayBuffer");}
function js_Boot() {return require("./../../../js/Boot");}
function haxe_io_FPHelper() {return require("./../../../haxe/io/FPHelper");}
function js__$Boot_HaxeError() {return require("./../../../js/_Boot/HaxeError");}
function Std() {return require("./../../../Std");}

// Constructor

class Float32Array {
	constructor(){}
	static get BYTES_PER_ELEMENT() { return BYTES_PER_ELEMENT; }
	static set BYTES_PER_ELEMENT(value) { BYTES_PER_ELEMENT = value; }
	static _new(arg1,offset,length) {
		var arr;
		if(typeof(arg1) == "number") {
			arr = [];
			var _g1 = 0;
			var _g = arg1;
			while(_g1 < _g) {
				var i = _g1++;
				arr[i] = 0;
			}
			arr.byteLength = arr.length << 2;
			arr.byteOffset = 0;
			var _g2 = [];
			var _g21 = 0;
			var _g11 = arr.length << 2;
			while(_g21 < _g11) {
				var i1 = _g21++;
				_g2.push(0);
			}
			arr.buffer = new (js_html_compat_ArrayBuffer().default)(_g2);
		} else if((js_Boot().default).__instanceof(arg1,(js_html_compat_ArrayBuffer().default))) {
			var buffer = arg1;
			if(offset == null) {
				offset = 0;
			}
			if(length == null) {
				length = buffer.byteLength - offset >> 2;
			}
			arr = [];
			var _g12 = 0;
			var _g3 = length;
			while(_g12 < _g3) {
				var i2 = _g12++;
				var val = buffer.a[offset++] | buffer.a[offset++] << 8 | buffer.a[offset++] << 16 | buffer.a[offset++] << 24;
				arr.push((haxe_io_FPHelper().default).i32ToFloat(val));
			}
			arr.byteLength = arr.length << 2;
			arr.byteOffset = offset;
			arr.buffer = buffer;
		} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
			arr = arg1.slice();
			var buffer1 = [];
			var _g4 = 0;
			while(_g4 < arr.length) {
				var f = arr[_g4];
				++_g4;
				var i3 = (haxe_io_FPHelper().default).floatToI32(f);
				buffer1.push(i3 & 255);
				buffer1.push(i3 >> 8 & 255);
				buffer1.push(i3 >> 16 & 255);
				buffer1.push(i3 >>> 24);
			}
			arr.byteLength = arr.length << 2;
			arr.byteOffset = 0;
			arr.buffer = new (js_html_compat_ArrayBuffer().default)(buffer1);
		} else {
			throw new (js__$Boot_HaxeError().default)("TODO " + (Std().default).string(arg1));
		}
		arr.subarray = Float32Array._subarray;
		arr.set = Float32Array._set;
		return arr;
	}
	static _set(arg,offset) {
		if((js_Boot().default).__instanceof(arg.buffer,(js_html_compat_ArrayBuffer().default))) {
			var a = arg;
			if(arg.byteLength + offset > this.byteLength) {
				throw new (js__$Boot_HaxeError().default)("set() outside of range");
			}
			var _g1 = 0;
			var _g = arg.byteLength;
			while(_g1 < _g) {
				var i = _g1++;
				this[i + offset] = a[i];
			}
		} else if((arg instanceof Array) && arg.__enum__ == null) {
			var a1 = arg;
			if(a1.length + offset > this.byteLength) {
				throw new (js__$Boot_HaxeError().default)("set() outside of range");
			}
			var _g11 = 0;
			var _g2 = a1.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				this[i1 + offset] = a1[i1];
			}
		} else {
			throw new (js__$Boot_HaxeError().default)("TODO");
		}
	}
	static _subarray(start,end) {
		var a = Float32Array._new(this.slice(start,end));
		a.byteOffset = start * 4;
		return a;
	}
}


// Meta

Float32Array.__name__ = ["js","html","compat","Float32Array"];
Float32Array.prototype.__class__ = Float32Array.prototype.constructor = $hxClasses["js.html.compat.Float32Array"] = Float32Array;

// Init

var Float32Array = $global.Float32Array || Float32Array._new;

// Statics

var BYTES_PER_ELEMENT = 4;

// Export

exports.default = Float32Array;