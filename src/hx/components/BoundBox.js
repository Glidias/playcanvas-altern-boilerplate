// Class: components.BoundBox

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
function util_geom_IAABB() {return require("./../util/geom/IAABB");}

// Constructor

class BoundBox {
	constructor() {
		this.minX = 1.7976931348623157e+308;
		this.minY = 1.7976931348623157e+308;
		this.minZ = 1.7976931348623157e+308;
		this.maxX = -1.7976931348623157e+308;
		this.maxY = -1.7976931348623157e+308;
		this.maxZ = -1.7976931348623157e+308;
	}
	
}


// Meta

BoundBox.__name__ = ["components","BoundBox"];
BoundBox.__interfaces__ = [(util_geom_IAABB().default)];
BoundBox.prototype.__class__ = BoundBox.prototype.constructor = $hxClasses["components.BoundBox"] = BoundBox;

// Init



// Statics



// Export

exports.default = BoundBox;