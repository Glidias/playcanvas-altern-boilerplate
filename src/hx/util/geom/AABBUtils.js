// Class: util.geom.AABBUtils

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function jeash_geom_Rectangle() {return require("./../../jeash/geom/Rectangle");}
function Std() {return require("./../../Std");}

// Constructor

class AABBUtils {
	constructor(){}
	static get MAX_VALUE() { return MAX_VALUE; }
	static set MAX_VALUE(value) { MAX_VALUE = value; }
	static get THRESHOLD() { return THRESHOLD; }
	static set THRESHOLD(value) { THRESHOLD = value; }
	static getRect(aabb,threshold) {
		if(threshold == null) {
			threshold = .1;
		}
		var mag = aabb.maxX - aabb.minX;
		var mag1 = aabb.maxZ - aabb.minZ;
		return new (jeash_geom_Rectangle().default)(aabb.minX,aabb.minZ,mag < 0 ? threshold : mag < threshold ? threshold : mag,mag1 < 0 ? threshold : mag1 < threshold ? threshold : mag1);
	}
	static clampMagnitude(mag,threshold) {
		if(threshold == null) {
			threshold = .1;
		}
		if(mag < 0) {
			return threshold;
		} else if(mag < threshold) {
			return threshold;
		} else {
			return mag;
		}
	}
	static abs(val) {
		if(val < 0) {
			return -val;
		} else {
			return val;
		}
	}
	static norm(w) {
		if(w != 0) {
			if(w < 0) {
				return -1;
			} else {
				return 1;
			}
		} else {
			return 0;
		}
	}
	static getString(aabb) {
		return "AABB: " + (Std().default).string([aabb.minX,aabb.minY,aabb.minZ,aabb.maxX,aabb.maxY,aabb.maxZ]);
	}
	static pointInside(aabb,pt) {
		return !(pt.x < aabb.minX || pt.y < aabb.minY || pt.z < aabb.minZ || pt.x > aabb.maxX || pt.y > aabb.maxY || pt.z > aabb.maxZ);
	}
	static intersectsEachOther(a,b) {
		return !(a.maxX < b.minX || a.maxY < b.minY || a.maxZ < b.minZ || a.minX > b.maxX || a.minY > b.maxY || a.minZ > b.maxZ);
	}
	static intersectsBoundValues(a,minX,minY,minZ,maxX,maxY,maxZ) {
		return !(a.maxX < minX || a.maxY < minY || a.maxZ < minZ || a.minX > maxX || a.minY > maxY || a.minZ > maxZ);
	}
	static transform(aabb,t) {
		var minX = aabb.minX;
		var minY = aabb.minY;
		var minZ = aabb.minZ;
		var maxX = aabb.maxX;
		var maxY = aabb.maxY;
		var maxZ = aabb.maxZ;
		aabb.minX = 1.7976931348623157e+308;
		aabb.minY = 1.7976931348623157e+308;
		aabb.minZ = 1.7976931348623157e+308;
		aabb.maxX = -1.7976931348623157e+308;
		aabb.maxY = -1.7976931348623157e+308;
		aabb.maxZ = -1.7976931348623157e+308;
		var x = minX;
		var y = minY;
		var z = minZ;
		var ex;
		var ey;
		var ez;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
		x = maxX;
		y = minY;
		z = minZ;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
		x = minX;
		y = maxY;
		z = minZ;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
		x = minX;
		y = minY;
		z = maxZ;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
		x = aabb.maxX;
		y = aabb.maxY;
		z = aabb.minZ;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
		x = minX;
		y = maxY;
		z = maxZ;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
		x = maxX;
		y = minY;
		z = maxZ;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
		x = aabb.maxX;
		y = aabb.maxY;
		z = aabb.maxZ;
		ex = x * t.a + y * t.b + z * t.c + t.d;
		ey = x * t.e + y * t.f + z * t.g + t.h;
		ez = x * t.i + y * t.j + z * t.k + t.l;
		if(ex < aabb.minX) {
			aabb.minX = ex;
		}
		if(ey < aabb.minY) {
			aabb.minY = ey;
		}
		if(ez < aabb.minZ) {
			aabb.minZ = ez;
		}
		if(ex > aabb.maxX) {
			aabb.maxX = ex;
		}
		if(ey > aabb.maxY) {
			aabb.maxY = ey;
		}
		if(ez > aabb.maxZ) {
			aabb.maxZ = ez;
		}
	}
	static match(aabb,refAABB) {
		aabb.minX = refAABB.minX;
		aabb.minY = refAABB.minY;
		aabb.minZ = refAABB.minZ;
		aabb.maxX = refAABB.maxX;
		aabb.maxY = refAABB.maxY;
		aabb.maxZ = refAABB.maxZ;
	}
	static setToMax(aabb) {
		aabb.minX = -1.7976931348623157e+308;
		aabb.minY = -1.7976931348623157e+308;
		aabb.minZ = -1.7976931348623157e+308;
		aabb.maxX = 1.7976931348623157e+308;
		aabb.maxY = 1.7976931348623157e+308;
		aabb.maxZ = 1.7976931348623157e+308;
	}
	static reset(aabb) {
		aabb.minX = 1.7976931348623157e+308;
		aabb.minY = 1.7976931348623157e+308;
		aabb.minZ = 1.7976931348623157e+308;
		aabb.maxX = -1.7976931348623157e+308;
		aabb.maxY = -1.7976931348623157e+308;
		aabb.maxZ = -1.7976931348623157e+308;
	}
	static expand2(aabb,refAABB) {
		if(refAABB.minX < aabb.minX) {
			aabb.minX = refAABB.minX;
		}
		if(refAABB.minY < aabb.minY) {
			aabb.minY = refAABB.minY;
		}
		if(refAABB.minZ < aabb.minZ) {
			aabb.minZ = refAABB.minZ;
		}
		if(refAABB.maxX > aabb.maxX) {
			aabb.maxX = refAABB.maxX;
		}
		if(refAABB.maxY > aabb.maxY) {
			aabb.maxY = refAABB.maxY;
		}
		if(refAABB.maxZ > aabb.maxZ) {
			aabb.maxZ = refAABB.maxZ;
		}
	}
	static expand(x,y,z,aabb) {
		if(x < aabb.minX) {
			aabb.minX = x;
		}
		if(y < aabb.minY) {
			aabb.minY = y;
		}
		if(z < aabb.minZ) {
			aabb.minZ = z;
		}
		if(x > aabb.maxX) {
			aabb.maxX = x;
		}
		if(y > aabb.maxY) {
			aabb.maxY = y;
		}
		if(z > aabb.maxZ) {
			aabb.maxZ = z;
		}
	}
	static expandWithPoint(vec,aabb) {
		if(vec.x < aabb.minX) {
			aabb.minX = vec.x;
		}
		if(vec.y < aabb.minY) {
			aabb.minY = vec.y;
		}
		if(vec.z < aabb.minZ) {
			aabb.minZ = vec.z;
		}
		if(vec.x > aabb.maxX) {
			aabb.maxX = vec.x;
		}
		if(vec.y > aabb.maxY) {
			aabb.maxY = vec.y;
		}
		if(vec.z > aabb.maxZ) {
			aabb.maxZ = vec.z;
		}
	}
	static checkSphere(aabb,sphere) {
		if(sphere.x + sphere.w > aabb.minX && sphere.x - sphere.w < aabb.maxX && sphere.y + sphere.w > aabb.minY && sphere.y - sphere.w < aabb.maxY && sphere.z + sphere.w > aabb.minZ) {
			return sphere.z - sphere.w < aabb.maxZ;
		} else {
			return false;
		}
	}
	static get THRESHOLD_RAY() { return THRESHOLD_RAY; }
	static set THRESHOLD_RAY(value) { THRESHOLD_RAY = value; }
	static intersectRay(aabb,origin,direction) {
		if(origin.x >= aabb.minX && origin.x <= aabb.maxX && origin.y >= aabb.minY && origin.y <= aabb.maxY && origin.z >= aabb.minZ && origin.z <= aabb.maxZ) {
			return true;
		}
		if(origin.x < aabb.minX && direction.x <= 0) {
			return false;
		}
		if(origin.x > aabb.maxX && direction.x >= 0) {
			return false;
		}
		if(origin.y < aabb.minY && direction.y <= 0) {
			return false;
		}
		if(origin.y > aabb.maxY && direction.y >= 0) {
			return false;
		}
		if(origin.z < aabb.minZ && direction.z <= 0) {
			return false;
		}
		if(origin.z > aabb.maxZ && direction.z >= 0) {
			return false;
		}
		var a;
		var b;
		var c;
		var d;
		if(direction.x > 0.000001) {
			a = (aabb.minX - origin.x) / direction.x;
			b = (aabb.maxX - origin.x) / direction.x;
		} else if(direction.x < -1e-006) {
			a = (aabb.maxX - origin.x) / direction.x;
			b = (aabb.minX - origin.x) / direction.x;
		} else {
			a = -1e+22;
			b = 1e+22;
		}
		if(direction.y > 0.000001) {
			c = (aabb.minY - origin.y) / direction.y;
			d = (aabb.maxY - origin.y) / direction.y;
		} else if(direction.y < -1e-006) {
			c = (aabb.maxY - origin.y) / direction.y;
			d = (aabb.minY - origin.y) / direction.y;
		} else {
			c = -1e+22;
			d = 1e+22;
		}
		if(c >= b || d <= a) {
			return false;
		}
		if(c < a) {
			if(d < b) {
				b = d;
			}
		} else {
			a = c;
			if(d < b) {
				b = d;
			}
		}
		if(direction.z > 0.000001) {
			c = (aabb.minZ - origin.z) / direction.z;
			d = (aabb.maxZ - origin.z) / direction.z;
		} else if(direction.z < -1e-006) {
			c = (aabb.maxZ - origin.z) / direction.z;
			d = (aabb.minZ - origin.z) / direction.z;
		} else {
			c = -1e+22;
			d = 1e+22;
		}
		if(c >= b || d <= a) {
			return false;
		}
		return true;
	}
}


// Meta

AABBUtils.__name__ = ["util","geom","AABBUtils"];
AABBUtils.prototype.__class__ = AABBUtils.prototype.constructor = $hxClasses["util.geom.AABBUtils"] = AABBUtils;

// Init



// Statics

var MAX_VALUE = 1.7976931348623157e+308;
var THRESHOLD = .1;
var THRESHOLD_RAY = 0.000001;

// Export

exports.default = AABBUtils;