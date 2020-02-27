// Class: js.html.compat.ArrayBuffer

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;

// Constructor

class ArrayBuffer {
	constructor(a) {
		if((a instanceof Array) && a.__enum__ == null) {
			this.a = a;
			this.byteLength = a.length;
		} else {
			var len = a;
			this.a = [];
			var _g1 = 0;
			var _g = len;
			while(_g1 < _g) {
				var i = _g1++;
				this.a[i] = 0;
			}
			this.byteLength = len;
		}
	}
	slice(begin,end) {
		return new ArrayBuffer(this.a.slice(begin,end));
	}
	static sliceImpl(begin,end) {
		var u = new Uint8Array(this,begin,end == null ? null : end - begin);
		var result = new ArrayBuffer(u.byteLength);
		var resultArray = new Uint8Array(result);
		resultArray.set(u);
		return result;
	}
}


// Meta

ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
ArrayBuffer.prototype.__class__ = ArrayBuffer.prototype.constructor = $hxClasses["js.html.compat.ArrayBuffer"] = ArrayBuffer;

// Init

{
	var ArrayBuffer = $global.ArrayBuffer || ArrayBuffer
	if(ArrayBuffer.prototype.slice == null) {
		ArrayBuffer.prototype.slice = ArrayBuffer.sliceImpl;
	}
};

// Statics



// Export

exports.default = ArrayBuffer;