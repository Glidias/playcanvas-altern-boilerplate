// Class: altern.terrain.QuadTreePage

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
var $extend = require("./../../extend_stub").default;
function altern_terrain_QuadChunkCornerData() {return require("./../../altern/terrain/QuadChunkCornerData");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}

// Constructor

class QuadTreePage extends (altern_terrain_QuadChunkCornerData().default) {
	constructor() {
		super();
	}
	static get LOG2E() { return LOG2E; }
	static set LOG2E(value) { LOG2E = value; }
	static isBase2(val) {
		return Math.pow(2,Math.round(Math.log(val) * 1.4426950408889634)) == val;
	}
	static create(x,y,size) {
		var quadRoot = new QuadTreePage();
		quadRoot.xorg = x;
		quadRoot.zorg = y;
		if(!QuadTreePage.isBase2(size)) {
			throw new (js__$Boot_HaxeError().default)("Size isn't base 2!" + size);
		}
		size >>= 1;
		quadRoot.Level = Math.round(Math.log(size) * 1.4426950408889634);
		return quadRoot;
	}
}


// Meta

QuadTreePage.__name__ = ["altern","terrain","QuadTreePage"];
QuadTreePage.prototype.__class__ = QuadTreePage.prototype.constructor = $hxClasses["altern.terrain.QuadTreePage"] = QuadTreePage;

// Init



// Statics

var LOG2E = 1.4426950408889634;

// Export

exports.default = QuadTreePage;