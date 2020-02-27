// Class: util.geom.Vec3Utils

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function util_geom_Vec3() {return require("./../../util/geom/Vec3");}

// Constructor

class Vec3Utils {
	constructor(){}
	static copy(v) {
		return new (util_geom_Vec3().default)(v.x,v.y,v.z);
	}
	static createCross(v1,v2) {
		return new (util_geom_Vec3().default)(v1.y * v2.z - v1.z * v2.y,v1.z * v2.x - v1.x * v2.z,v1.x * v2.y - v1.y * v2.x);
	}
	static createAdd(v1,v2) {
		return new (util_geom_Vec3().default)(v1.x + v2.x,v1.y + v2.y,v1.z + v2.z);
	}
	static createSubtract(v1,v2) {
		return new (util_geom_Vec3().default)(v1.x - v2.x,v1.y - v2.y,v1.z - v2.z);
	}
	static createScale(v,scaleAmt) {
		return new (util_geom_Vec3().default)(v.x * scaleAmt,v.y * scaleAmt,v.z * scaleAmt);
	}
	static createProjection(v,axis) {
		var scalar = v.x * axis.x + v.y * axis.y + v.z * axis.z;
		return new (util_geom_Vec3().default)(v.x - axis.x * scalar,v.y - axis.y * scalar,v.z - axis.z * scalar);
	}
	static matchValues(output,withValue) {
		output.x = withValue.x;
		output.y = withValue.y;
		output.z = withValue.z;
	}
	static matchValuesVector3D(output,withValue) {
		output.x = withValue.x;
		output.y = withValue.y;
		output.z = withValue.z;
	}
	static dot(v1,v2) {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}
	static writeCross(v1,v2,output) {
		output.x = v1.y * v2.z - v1.z * v2.y;
		output.y = v1.z * v2.x - v2.z * v1.x;
		output.z = v1.x * v2.y - v1.y * v2.x;
	}
	static writeProjection(v,axis,output) {
		var scalar = v.x * axis.x + v.y * axis.y + v.z * axis.z;
		output.x = v.x - axis.x * scalar;
		output.y = v.y - axis.y * scalar;
		output.z = v.z - axis.z * scalar;
	}
	static normalize(v) {
		var sc = 1 / Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
		v.x *= sc;
		v.y *= sc;
		v.z *= sc;
	}
	static subtract(output,input) {
		output.x -= input.x;
		output.y -= input.y;
		output.z -= input.z;
	}
	static add(output,input) {
		output.x += input.x;
		output.y += input.y;
		output.z += input.z;
	}
	static scale(output,scaleAmt) {
		output.x *= scaleAmt;
		output.y *= scaleAmt;
		output.z *= scaleAmt;
	}
	static writeSubtract(output,v1,v2) {
		output.x = v1.x - v2.x;
		output.y = v1.y - v2.y;
		output.z = v1.z - v2.z;
	}
	static getLength(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}
	static sqDistBetween(a,b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return dx * dx + dy * dy + dz * dz;
	}
	static sqDist2DBetween(a,b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		return dx * dx + dy * dy;
	}
	static distBetween(a,b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
}


// Meta

Vec3Utils.__name__ = ["util","geom","Vec3Utils"];
Vec3Utils.prototype.__class__ = Vec3Utils.prototype.constructor = $hxClasses["util.geom.Vec3Utils"] = Vec3Utils;

// Init



// Statics



// Export

exports.default = Vec3Utils;