// Class: js.html.compat.DataView

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function haxe_io_FPHelper() {return require("./../../../haxe/io/FPHelper");}
function js__$Boot_HaxeError() {return require("./../../../js/_Boot/HaxeError");}
function haxe_io_Error() {return require("./../../../haxe/io/Error");}

// Constructor

class DataView {
	constructor(buffer,byteOffset,byteLength) {
		this.buf = buffer;
		this.offset = byteOffset == null ? 0 : byteOffset;
		this.length = byteLength == null ? buffer.byteLength - this.offset : byteLength;
		if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) {
			throw new (js__$Boot_HaxeError().default)((haxe_io_Error().default).OutsideBounds);
		}
		this.byteLength = this.length;
		this.byteOffset = this.offset;
		this.buffer = this.buf;
	}
	getInt8(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) {
			return v - 256;
		} else {
			return v;
		}
	}
	getUint8(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	getInt16(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) {
			return v - 65536;
		} else {
			return v;
		}
	}
	getUint16(byteOffset,littleEndian) {
		if(littleEndian) {
			return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8;
		} else {
			return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
		}
	}
	getInt32(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) {
			return a | b << 8 | c << 16 | d << 24;
		} else {
			return d | c << 8 | b << 16 | a << 24;
		}
	}
	getUint32(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) {
			return v + 4294967296.;
		} else {
			return v;
		}
	}
	getFloat32(byteOffset,littleEndian) {
		return (haxe_io_FPHelper().default).i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	getFloat64(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return (haxe_io_FPHelper().default).i64ToDouble(littleEndian ? a : b,littleEndian ? b : a);
	}
	setInt8(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value < 0 ? value + 128 & 255 : value & 255;
	}
	setUint8(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	setInt16(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0 ? value + 65536 : value,littleEndian);
	}
	setUint16(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	setInt32(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	setUint32(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	setFloat32(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,(haxe_io_FPHelper().default).floatToI32(value),littleEndian);
	}
	setFloat64(byteOffset,value,littleEndian) {
		var i64 = (haxe_io_FPHelper().default).doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
}


// Meta

DataView.__name__ = ["js","html","compat","DataView"];
DataView.prototype.__class__ = DataView.prototype.constructor = $hxClasses["js.html.compat.DataView"] = DataView;

// Init

var DataView = $global.DataView || DataView;

// Statics



// Export

exports.default = DataView;