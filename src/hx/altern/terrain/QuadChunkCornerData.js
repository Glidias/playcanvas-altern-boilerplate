// Class: altern.terrain.QuadChunkCornerData

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class QuadChunkCornerData {
	constructor() {
	}
	static get BUFFER() { return BUFFER; }
	static set BUFFER(value) { BUFFER = value; }
	static get BI() { return BI; }
	static set BI(value) { BI = value; }
	static get BLEN() { return BLEN; }
	static set BLEN(value) { BLEN = value; }
	static create() {
		var result;
		if(QuadChunkCornerData.BI < QuadChunkCornerData.BLEN) {
			result = QuadChunkCornerData.BUFFER[QuadChunkCornerData.BI];
		} else {
			result = new QuadChunkCornerData();
			QuadChunkCornerData.BUFFER[QuadChunkCornerData.BLEN++] = result;
		}
		QuadChunkCornerData.BI++;
		return result;
	}
	static setFixedBufferSize(size) {
		QuadChunkCornerData.BUFFER.length = size;
		QuadChunkCornerData.BLEN = size;
	}
	static fillBuffer() {
		var len = QuadChunkCornerData.BLEN;
		var result = QuadChunkCornerData.BUFFER;
		var i = 0;
		while(i < len) {
			result[i] = new QuadChunkCornerData();
			++i;
		}
	}
}


// Meta

QuadChunkCornerData.__name__ = ["altern","terrain","QuadChunkCornerData"];
QuadChunkCornerData.prototype.__class__ = QuadChunkCornerData.prototype.constructor = $hxClasses["altern.terrain.QuadChunkCornerData"] = QuadChunkCornerData;

// Init



// Statics

var BUFFER = [];
var BI = 0;
var BLEN = 0;

// Export

exports.default = QuadChunkCornerData;