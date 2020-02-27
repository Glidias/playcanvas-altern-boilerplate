// Class: util.geom.Vec3

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class Vec3 {
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
		this.x = x;
		this.y = y;
		this.z = z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	lengthSqr() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	dotProduct(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	crossProduct(v) {
		return new Vec3(this.y * v.z - this.z * v.y,this.z * v.x - this.x * v.z,this.x * v.y - this.y * v.x);
	}
	clone() {
		return new Vec3(this.x,this.y,this.z);
	}
	isZeroVector() {
		return this.x * this.x + this.y * this.y + this.z * this.z == 0;
	}
	crossProductSet(v) {
		this.x = this.y * v.z - this.z * v.y;
		this.y = this.z * v.x - this.x * v.z;
		this.z = this.x * v.y - this.y * v.x;
	}
	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	}
	addScaled(k,v) {
		this.x += k * v.x;
		this.y += k * v.y;
		this.z += k * v.z;
	}
	subtract(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	}
	sum(a,b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
	}
	diff(a,b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
	}
	scale(k) {
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	reverse() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	}
	transform3(m) {
		this.x = m.a * this.x + m.b * this.y + m.c * this.z;
		this.y = m.e * this.x + m.f * this.y + m.g * this.z;
		this.z = m.i * this.x + m.j * this.y + m.k * this.z;
	}
	transformTransposed3(m) {
		this.x = m.a * this.x + m.e * this.y + m.i * this.z;
		this.y = m.b * this.x + m.f * this.y + m.j * this.z;
		this.z = m.c * this.x + m.g * this.y + m.k * this.z;
	}
	reset() {
		this.x = this.y = this.z = 0;
	}
	set(param1,param2,param3) {
		this.x = param1;
		this.y = param2;
		this.z = param3;
	}
	saveTo(result) {
		result.x = this.x;
		result.y = this.y;
		result.z = this.z;
	}
	copyFrom(source) {
		this.x = source.x;
		this.y = source.y;
		this.z = source.z;
	}
	transform4(m) {
		this.x = m.a * this.x + m.b * this.y + m.c * this.z + m.d;
		this.y = m.e * this.x + m.f * this.y + m.g * this.z + m.h;
		this.z = m.i * this.x + m.j * this.y + m.k * this.z + m.l;
	}
	transformTransposed4(m) {
		var xx = this.x - m.d;
		var yy = this.y - m.h;
		var zz = this.z - m.l;
		this.x = m.a * this.x + m.e * this.y + m.i * this.z;
		this.y = m.b * this.x + m.f * this.y + m.j * this.z;
		this.z = m.c * this.x + m.g * this.y + m.k * this.z;
	}
	transformVector4(m) {
		this.x = m.a * this.x + m.b * this.y + m.c * this.z;
		this.y = m.e * this.x + m.f * this.y + m.g * this.z;
		this.z = m.i * this.x + m.j * this.y + m.k * this.z;
	}
	assignAddition(v1,v2) {
		this.x = v1.x + v2.x;
		this.y = v1.y + v2.y;
		this.z = v1.z + v2.z;
	}
	normalize() {
		var k = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	normalizeWithSquared(squaredLength) {
		var k = 1 / Math.sqrt(squaredLength);
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	setLength(val) {
		var k = val / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	removeComponent(axis) {
		var scalar = this.x * axis.x + this.y * axis.y + this.z * axis.z;
		this.x -= axis.x * scalar;
		this.y -= axis.y * scalar;
		this.z -= axis.z * scalar;
	}
	distanceTo(v) {
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
	toString() {
		return "Vec3(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	static get ZERO() { return ZERO; }
	static set ZERO(value) { ZERO = value; }
	static get X_AXIS() { return X_AXIS; }
	static set X_AXIS(value) { X_AXIS = value; }
	static get Y_AXIS() { return Y_AXIS; }
	static set Y_AXIS(value) { Y_AXIS = value; }
	static get Z_AXIS() { return Z_AXIS; }
	static set Z_AXIS(value) { Z_AXIS = value; }
	static get RIGHT() { return RIGHT; }
	static set RIGHT(value) { RIGHT = value; }
	static get LEFT() { return LEFT; }
	static set LEFT(value) { LEFT = value; }
	static get FORWARD() { return FORWARD; }
	static set FORWARD(value) { FORWARD = value; }
	static get BACK() { return BACK; }
	static set BACK(value) { BACK = value; }
	static get UP() { return UP; }
	static set UP(value) { UP = value; }
	static get DOWN() { return DOWN; }
	static set DOWN(value) { DOWN = value; }
	static copy(v) {
		return new Vec3(v.x,v.y,v.z);
	}
	static createCross(v1,v2) {
		return new Vec3(v1.y * v2.z - v1.z * v2.y,v1.z * v2.x - v1.x * v2.z,v1.x * v2.y - v1.y * v2.x);
	}
	static createAdd(v1,v2) {
		return new Vec3(v1.x + v2.x,v1.y + v2.y,v1.z + v2.z);
	}
	static createSubtract(v1,v2) {
		return new Vec3(v1.x - v2.x,v1.y - v2.y,v1.z - v2.z);
	}
	static createScale(v,scaleAmt) {
		return new Vec3(v.x * scaleAmt,v.y * scaleAmt,v.z * scaleAmt);
	}
	static createProjection(v,axis) {
		var scalar = v.x * axis.x + v.y * axis.y + v.z * axis.z;
		return new Vec3(v.x - axis.x * scalar,v.y - axis.y * scalar,v.z - axis.z * scalar);
	}
	static dot(v1,v2) {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}
	static lengthOf(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}
	static squareLengthOf(v) {
		return v.x * v.x + v.y * v.y + v.z * v.z;
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
	static writeSubtract(output,input) {
		output.x -= input.x;
		output.y -= input.y;
		output.z -= input.z;
	}
	static writeAdd(output,input) {
		output.x += input.x;
		output.y += input.y;
		output.z += input.z;
	}
	static writeScale(output,scaleAmt) {
		output.x *= scaleAmt;
		output.y *= scaleAmt;
		output.z *= scaleAmt;
	}
}


// Meta

Vec3.__name__ = ["util","geom","Vec3"];
Vec3.prototype.__class__ = Vec3.prototype.constructor = $hxClasses["util.geom.Vec3"] = Vec3;

// Init



// Statics

var ZERO = new Vec3(0,0,0);
var X_AXIS = new Vec3(1,0,0);
var Y_AXIS = new Vec3(0,1,0);
var Z_AXIS = new Vec3(0,0,1);
var RIGHT = new Vec3(1,0,0);
var LEFT = new Vec3(-1,0,0);
var FORWARD = new Vec3(0,1,0);
var BACK = new Vec3(0,-1,0);
var UP = new Vec3(0,0,1);
var DOWN = new Vec3(0,0,-1);

// Export

exports.default = Vec3;