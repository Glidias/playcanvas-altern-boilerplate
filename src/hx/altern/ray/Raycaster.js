// Class: altern.ray.Raycaster

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function jeash_geom_Vector3D() {return require("./../../jeash/geom/Vector3D");}

// Constructor

class Raycaster {
	constructor(source) {
		this._output = new (jeash_geom_Vector3D().default)();
		this._direction = new (jeash_geom_Vector3D().default)();
		this._origin = new (jeash_geom_Vector3D().default)();
		this.source = source;
	}
	setTarget(source) {
		this.source = source;
		return this;
	}
	position(x,y,z) {
		this._origin.x = x;
		this._origin.y = y;
		this._origin.z = z;
		return this;
	}
	direction(x,y,z) {
		this._direction.x = x;
		this._direction.y = y;
		this._direction.z = z;
		return this;
	}
	positionAndDirection(x,y,z,dx,dy,dz) {
		this._origin.x = x;
		this._origin.y = y;
		this._origin.z = z;
		this._direction.x = dx;
		this._direction.y = dy;
		this._direction.z = dz;
		return this;
	}
	setIgnoreDistance(dist) {
		this._direction.w = dist;
	}
	gotHit() {
		this._output.w = 0;
		var result = this.source.intersectRay(this._origin,this._direction,this._output);
		if(result != null) {
			result.x = this._origin.x + result.w * this._direction.x;
			result.y = this._origin.y + result.w * this._direction.y;
			result.z = this._origin.z + result.w * this._direction.z;
		}
		return result;
	}
}


// Meta

Raycaster.__name__ = ["altern","ray","Raycaster"];
Raycaster.prototype.__class__ = Raycaster.prototype.constructor = $hxClasses["altern.ray.Raycaster"] = Raycaster;

// Init



// Statics



// Export

exports.default = Raycaster;