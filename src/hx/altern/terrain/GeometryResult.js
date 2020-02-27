// Class: altern.terrain.GeometryResult

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;

// Constructor

class GeometryResult {
	constructor() {
	}
	getIndexAtUV(u,v) {
		return this.indexLookup[(v / this.uvSeg | 0) * this.verticesAcross + (u / this.uvSeg | 0)];
	}
	getIndex(x,y) {
		return this.indexLookup[y * this.verticesAcross + x];
	}
}


// Meta

GeometryResult.__name__ = ["altern","terrain","GeometryResult"];
GeometryResult.prototype.__class__ = GeometryResult.prototype.constructor = $hxClasses["altern.terrain.GeometryResult"] = GeometryResult;

// Init



// Statics



// Export

exports.default = GeometryResult;