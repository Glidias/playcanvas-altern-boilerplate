// Class: js.html.compat.Uint8Array

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function js_html_compat_ArrayBuffer() {return require("./../../../js/html/compat/ArrayBuffer");}
function js_Boot() {return require("./../../../js/Boot");}
function js__$Boot_HaxeError() {return require("./../../../js/_Boot/HaxeError");}
function Std() {return require("./../../../Std");}

// Constructor

class Uint8Array {
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
			arr.byteLength = arr.length;
			arr.byteOffset = 0;
			arr.buffer = new (js_html_compat_ArrayBuffer().default)(arr);
		} else if((js_Boot().default).__instanceof(arg1,(js_html_compat_ArrayBuffer().default))) {
			var buffer = arg1;
			if(offset == null) {
				offset = 0;
			}
			if(length == null) {
				length = buffer.byteLength - offset;
			}
			if(offset == 0) {
				arr = buffer.a;
			} else {
				arr = buffer.a.slice(offset,offset + length);
			}
			arr.byteLength = arr.length;
			arr.byteOffset = offset;
			arr.buffer = buffer;
		} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
			arr = arg1.slice();
			arr.byteLength = arr.length;
			arr.byteOffset = 0;
			arr.buffer = new (js_html_compat_ArrayBuffer().default)(arr);
		} else {
			throw new (js__$Boot_HaxeError().default)("TODO " + (Std().default).string(arg1));
		}
		arr.subarray = Uint8Array._subarray;
		arr.set = Uint8Array._set;
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
		var a = Uint8Array._new(this.slice(start,end));
		a.byteOffset = start;
		return a;
	}
}


// Meta

Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
Uint8Array.prototype.__class__ = Uint8Array.prototype.constructor = $hxClasses["js.html.compat.Uint8Array"] = Uint8Array;

// Init

var Uint8Array = $global.Uint8Array || Uint8Array._new;

// Statics

var BYTES_PER_ELEMENT = 1;

// Export

exports.default = Uint8Array;