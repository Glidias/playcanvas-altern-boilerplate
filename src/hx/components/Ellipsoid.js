// Class: components.Ellipsoid

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
var $extend = require("./../extend_stub").default;
function util_geom_Vec3() {return require("./../util/geom/Vec3");}

// Constructor

class Ellipsoid extends (util_geom_Vec3().default) {
	constructor(x,y,z) {
		if(z == null) {
			z = 32;
		}
		if(y == null) {
			y = 32;
		}
		if(x == null) {
			x = 32;
		}
		super(x,y,z);
	}
	
}


// Meta

Ellipsoid.__name__ = ["components","Ellipsoid"];
Ellipsoid.prototype.__class__ = Ellipsoid.prototype.constructor = $hxClasses["components.Ellipsoid"] = Ellipsoid;

// Init



// Statics



// Export

exports.default = Ellipsoid;