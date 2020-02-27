// Class: components.CollisionResult

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function util_geom_Vec3() {return require("./../util/geom/Vec3");}

// Constructor

class CollisionResult {
	constructor() {
		this.gotCollision = false;
		this.flags = 0;
		this.stateFlags = 0;
		this.max_ground_normal_threshold = 0.57357643635104609610803191282616;
		this.maximum_normal_impulse = 0;
		this.maximum_ground_normal = new (util_geom_Vec3().default)();
	}
	get_gotGroundNormal() {
		return (this.stateFlags & 2) != 0;
	}
	set_gotGroundNormal(value) {
		if(value) {
			this.stateFlags |= 2;
		} else {
			this.stateFlags &= -3;
		}
		return value;
	}
	static get MAX_GROUND_NORMAL_THRESHOLD() { return MAX_GROUND_NORMAL_THRESHOLD; }
	static set MAX_GROUND_NORMAL_THRESHOLD(value) { MAX_GROUND_NORMAL_THRESHOLD = value; }
	static get FLAG_MAX_NORMAL_IMPULSE() { return FLAG_MAX_NORMAL_IMPULSE; }
	static set FLAG_MAX_NORMAL_IMPULSE(value) { FLAG_MAX_NORMAL_IMPULSE = value; }
	static get FLAG_MAX_GROUND_NORMAL() { return FLAG_MAX_GROUND_NORMAL; }
	static set FLAG_MAX_GROUND_NORMAL(value) { FLAG_MAX_GROUND_NORMAL = value; }
}


// Meta

CollisionResult.__name__ = ["components","CollisionResult"];
CollisionResult.prototype.__class__ = CollisionResult.prototype.constructor = $hxClasses["components.CollisionResult"] = CollisionResult;

// Init



// Statics

var MAX_GROUND_NORMAL_THRESHOLD = 0.57357643635104609610803191282616;
var FLAG_MAX_NORMAL_IMPULSE = 1;
var FLAG_MAX_GROUND_NORMAL = 2;

// Export

exports.default = CollisionResult;