// Class: haxe.crypto.Crc32

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;

// Constructor

class Crc32 {
	constructor() {
		this.crc = -1;
	}
	byte(b) {
		var tmp = (this.crc ^ b) & 255;
		var _g = 0;
		while(_g < 8) {
			var j = _g++;
			if((tmp & 1) == 1) {
				tmp = tmp >>> 1 ^ -306674912;
			} else {
				tmp >>>= 1;
			}
		}
		this.crc = this.crc >>> 8 ^ tmp;
	}
	update(b,pos,len) {
		var b1 = b.b.bufferValue;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var tmp = (this.crc ^ b1.bytes[i]) & 255;
			var _g2 = 0;
			while(_g2 < 8) {
				var j = _g2++;
				if((tmp & 1) == 1) {
					tmp = tmp >>> 1 ^ -306674912;
				} else {
					tmp >>>= 1;
				}
			}
			this.crc = this.crc >>> 8 ^ tmp;
		}
	}
	get() {
		return this.crc ^ -1;
	}
	static make(data) {
		var init = -1;
		var crc = init;
		var b = data.b.bufferValue;
		var _g1 = 0;
		var _g = data.length;
		while(_g1 < _g) {
			var i = _g1++;
			var tmp = (crc ^ b.bytes[i]) & 255;
			var _g2 = 0;
			while(_g2 < 8) {
				var j = _g2++;
				if((tmp & 1) == 1) {
					tmp = tmp >>> 1 ^ -306674912;
				} else {
					tmp >>>= 1;
				}
			}
			crc = crc >>> 8 ^ tmp;
		}
		return crc ^ init;
	}
}


// Meta

Crc32.__name__ = ["haxe","crypto","Crc32"];
Crc32.prototype.__class__ = Crc32.prototype.constructor = $hxClasses["haxe.crypto.Crc32"] = Crc32;

// Init



// Statics



// Export

exports.default = Crc32;