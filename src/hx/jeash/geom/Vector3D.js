// Class: jeash.geom.Vector3D

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function util_geom_XYZW() {return require("./../../util/geom/XYZW");}

// Constructor

class Vector3D {
	constructor(x,y,z,w) {
		if(w == null) {
			w = 0.;
		}
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		this.w = w;
		this.x = x;
		this.y = y;
		this.z = z;
	}
	get_length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	get_lengthSquared() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) * Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	add(a) {
		return new Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	clone() {
		return new Vector3D(this.x,this.y,this.z,this.w);
	}
	crossProduct(a) {
		return new Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	decrementBy(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	dotProduct(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	equals(toCompare,allFour) {
		if(allFour == null) {
			allFour = false;
		}
		if(this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z) {
			if(!(!allFour)) {
				return this.w == toCompare.w;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	incrementBy(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	nearEquals(toCompare,tolerance,allFour) {
		if(allFour == null) {
			allFour = false;
		}
		if(Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance) {
			if(!(!allFour)) {
				return Math.abs(this.w - toCompare.w) < tolerance;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	negate() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	normalize() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	project() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	scaleBy(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	subtract(a) {
		return new Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	toString() {
		return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	static angleBetween(a,b) {
		var a0 = new Vector3D(a.x,a.y,a.z,a.w);
		var l = Math.sqrt(a0.x * a0.x + a0.y * a0.y + a0.z * a0.z);
		if(l != 0) {
			a0.x /= l;
			a0.y /= l;
			a0.z /= l;
		}
		var b0 = new Vector3D(b.x,b.y,b.z,b.w);
		var l1 = Math.sqrt(b0.x * b0.x + b0.y * b0.y + b0.z * b0.z);
		if(l1 != 0) {
			b0.x /= l1;
			b0.y /= l1;
			b0.z /= l1;
		}
		return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
	}
	static distance(pt1,pt2) {
		var x = pt2.x - pt1.x;
		var y = pt2.y - pt1.y;
		var z = pt2.z - pt1.z;
		return Math.sqrt(x * x + y * y + z * z);
	}
	static get_X_AXIS() {
		return new Vector3D(1,0,0);
	}
	static get_Y_AXIS() {
		return new Vector3D(0,1,0);
	}
	static get_Z_AXIS() {
		return new Vector3D(0,0,1);
	}
}


// Meta

Vector3D.__name__ = ["jeash","geom","Vector3D"];
Vector3D.__interfaces__ = [(util_geom_XYZW().default)];
Vector3D.prototype.__class__ = Vector3D.prototype.constructor = $hxClasses["jeash.geom.Vector3D"] = Vector3D;

// Init



// Statics



// Export

exports.default = Vector3D;