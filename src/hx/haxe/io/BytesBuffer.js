// Class: haxe.io.BytesBuffer

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe_io_Bytes() {return require("./../../haxe/io/Bytes");}
function haxe_io_FPHelper() {return require("./../../haxe/io/FPHelper");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function haxe_io_Error() {return require("./../../haxe/io/Error");}

// Constructor

class BytesBuffer {
	constructor() {
		this.b = [];
	}
	get_length() {
		return this.b.length;
	}
	addByte($byte) {
		this.b.push($byte);
	}
	add(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	addString(v) {
		var src = (haxe_io_Bytes().default).ofString(v);
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	addInt32(v) {
		this.b.push(v & 255);
		this.b.push(v >> 8 & 255);
		this.b.push(v >> 16 & 255);
		this.b.push(v >>> 24);
	}
	addInt64(v) {
		this.addInt32(v.low);
		this.addInt32(v.high);
	}
	addFloat(v) {
		this.addInt32((haxe_io_FPHelper().default).floatToI32(v));
	}
	addDouble(v) {
		this.addInt64((haxe_io_FPHelper().default).doubleToI64(v));
	}
	addBytes(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw new (js__$Boot_HaxeError().default)((haxe_io_Error().default).OutsideBounds);
		}
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	getBytes() {
		var bytes = new (haxe_io_Bytes().default)(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
}


// Meta

BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
BytesBuffer.prototype.__class__ = BytesBuffer.prototype.constructor = $hxClasses["haxe.io.BytesBuffer"] = BytesBuffer;

// Init



// Statics



// Export

exports.default = BytesBuffer;