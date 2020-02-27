// Class: components.Pos

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
var $extend = require("./../extend_stub").default;
function util_geom_Vec3() {return require("./../util/geom/Vec3");}

// Constructor

class Pos extends (util_geom_Vec3().default) {
	constructor(x,y,z) {
		if(z == null) {
			z = 0;
		}
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		super(x,y,z);
	}
	
}


// Meta

Pos.__name__ = ["components","Pos"];
Pos.prototype.__class__ = Pos.prototype.constructor = $hxClasses["components.Pos"] = Pos;

// Init



// Statics



// Export

exports.default = Pos;