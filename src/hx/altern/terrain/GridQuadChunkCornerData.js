// Class: altern.terrain.GridQuadChunkCornerData

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;

// Constructor

class GridQuadChunkCornerData {
	constructor() {
		this.originY = 0;
		this.originX = 0;
	}
	getCornerData(x,y,level) {
		++level;
		return this.vec[(y - this.originY >> level) * this.cols + (x - this.originX >> level)];
	}
}


// Meta

GridQuadChunkCornerData.__name__ = ["altern","terrain","GridQuadChunkCornerData"];
GridQuadChunkCornerData.prototype.__class__ = GridQuadChunkCornerData.prototype.constructor = $hxClasses["altern.terrain.GridQuadChunkCornerData"] = GridQuadChunkCornerData;

// Init



// Statics



// Export

exports.default = GridQuadChunkCornerData;