// Class: altern.terrain.QuadCornerData

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function altern_terrain_QuadSquare() {return require("./../../altern/terrain/QuadSquare");}

// Constructor

class QuadCornerData {
	constructor() {
		var arr = [];
		arr.length = 4;
		this.Verts = arr;
	}
	clone() {
		var result = new QuadCornerData();
		result.Parent = this.Parent;
		result.Square = this.Square;
		result.xorg = this.xorg;
		result.zorg = this.zorg;
		result.Level = this.Level;
		result.ChildIndex = this.ChildIndex;
		result.Verts[0] = this.Verts[0];
		result.Verts[1] = this.Verts[1];
		result.Verts[2] = this.Verts[2];
		result.Verts[3] = this.Verts[3];
		return result;
	}
	dispose() {
		this.Parent = null;
		this.Square = null;
		this.Verts = null;
	}
	static get BUFFER() { return BUFFER; }
	static set BUFFER(value) { BUFFER = value; }
	static get BI() { return BI; }
	static set BI(value) { BI = value; }
	static get BLEN() { return BLEN; }
	static set BLEN(value) { BLEN = value; }
	static create() {
		var result;
		if(QuadCornerData.BI < QuadCornerData.BLEN) {
			result = QuadCornerData.BUFFER[QuadCornerData.BI];
		} else {
			result = new QuadCornerData();
			QuadCornerData.BUFFER[QuadCornerData.BLEN++] = result;
		}
		QuadCornerData.BI++;
		return result;
	}
	static setFixedBufferSize(size) {
		QuadCornerData.BUFFER.length = size;
	}
	static fillBuffer() {
		var len = QuadCornerData.BLEN;
		var result = QuadCornerData.BUFFER;
		var i = 0;
		while(i < 0) {
			result[i] = new QuadCornerData();
			++i;
		}
	}
	static createRoot(x,y,size) {
		var quadRoot = new QuadCornerData();
		quadRoot.xorg = x;
		quadRoot.zorg = y;
		if(Math.pow(2,Math.round(Math.log(size) * 1.4426950408889634)) != size) {
			throw new (js__$Boot_HaxeError().default)("Size isn't base 2!" + size);
		}
		size >>= 1;
		quadRoot.Level = Math.round(Math.log(size) * 1.4426950408889634);
		var sq = new (altern_terrain_QuadSquare().default)(quadRoot);
		return quadRoot;
	}
	static clearBuffer() {
		var len = QuadCornerData.BUFFER.length;
		var i = 0;
		while(i < len) {
			QuadCornerData.BUFFER[i].dispose();
			++i;
		}
		QuadCornerData.BUFFER.length = 0;
		QuadCornerData.BI = 0;
		QuadCornerData.BLEN = 0;
	}
	static isBase2(val) {
		return Math.pow(2,Math.round(Math.log(val) * 1.4426950408889634)) == val;
	}
}


// Meta

QuadCornerData.__name__ = ["altern","terrain","QuadCornerData"];
QuadCornerData.prototype.__class__ = QuadCornerData.prototype.constructor = $hxClasses["altern.terrain.QuadCornerData"] = QuadCornerData;

// Init



// Statics

var BUFFER = [];
var BI = 0;
var BLEN = 0;

// Export

exports.default = QuadCornerData;