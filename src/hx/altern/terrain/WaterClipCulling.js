// Class: altern.terrain.WaterClipCulling

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
function altern_terrain_ICuller() {return require("./../../altern/terrain/ICuller");}

// Constructor

class WaterClipCulling {
	constructor(terrainLOD) {
		this.terrainLOD = terrainLOD;
	}
	cullingInFrustum(culling,minX,minY,minZ,maxX,maxY,maxZ) {
		return -1;
	}
}


// Meta

WaterClipCulling.__name__ = ["altern","terrain","WaterClipCulling"];
WaterClipCulling.__interfaces__ = [(altern_terrain_ICuller().default)];
WaterClipCulling.prototype.__class__ = WaterClipCulling.prototype.constructor = $hxClasses["altern.terrain.WaterClipCulling"] = WaterClipCulling;

// Init



// Statics



// Export

exports.default = WaterClipCulling;