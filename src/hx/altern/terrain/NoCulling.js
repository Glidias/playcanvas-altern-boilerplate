// Class: altern.terrain.NoCulling

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
function altern_terrain_ICuller() {return require("./../../altern/terrain/ICuller");}

// Constructor

class NoCulling {
	constructor() {
	}
	cullingInFrustum(culling,minX,minY,minZ,maxX,maxY,maxZ) {
		return 0;
	}
}


// Meta

NoCulling.__name__ = ["altern","terrain","NoCulling"];
NoCulling.__interfaces__ = [(altern_terrain_ICuller().default)];
NoCulling.prototype.__class__ = NoCulling.prototype.constructor = $hxClasses["altern.terrain.NoCulling"] = NoCulling;

// Init



// Statics



// Export

exports.default = NoCulling;