// Class: util.geom.Mat3

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function util_geom_IMat3() {return require("./../../util/geom/IMat3");}

// Constructor

class Mat3 {
	constructor(a,b,c,e,f,g,i,j,k) {
		if(k == null) {
			k = 1;
		}
		if(j == null) {
			j = 0;
		}
		if(i == null) {
			i = 0;
		}
		if(g == null) {
			g = 0;
		}
		if(f == null) {
			f = 1;
		}
		if(e == null) {
			e = 0;
		}
		if(c == null) {
			c = 0;
		}
		if(b == null) {
			b = 0;
		}
		if(a == null) {
			a = 1;
		}
		this.a = a;
		this.b = b;
		this.c = c;
		this.e = e;
		this.f = f;
		this.g = g;
		this.i = i;
		this.j = j;
		this.k = k;
	}
	determinant() {
		return 1 / (-this.c * this.f * this.i + this.b * this.g * this.i + this.c * this.e * this.j - this.a * this.g * this.j - this.b * this.e * this.k + this.a * this.f * this.k);
	}
	identity() {
		this.a = this.f = this.k = 1;
		this.b = this.c = this.e = this.g = this.i = this.j = 0;
	}
	clone() {
		return new Mat3(this.a,this.b,this.c,this.e,this.f,this.g,this.i,this.j,this.k);
	}
	transformVector(vin,vout) {
		vout.x = this.a * vin.x + this.b * vin.y + this.c * vin.z;
		vout.y = this.e * vin.x + this.f * vin.y + this.g * vin.z;
		vout.z = this.i * vin.x + this.j * vin.y + this.k * vin.z;
	}
	transformVectorTransposed(vin,vout) {
		vout.x = this.a * vin.x + this.e * vin.y + this.i * vin.z;
		vout.y = this.b * vin.x + this.f * vin.y + this.j * vin.z;
		vout.z = this.c * vin.x + this.g * vin.y + this.k * vin.z;
	}
	transformVec3To3D(vin,vout) {
		vout.x = this.a * vin.x + this.b * vin.y + this.c * vin.z;
		vout.y = this.e * vin.x + this.f * vin.y + this.g * vin.z;
		vout.z = this.i * vin.x + this.j * vin.y + this.k * vin.z;
	}
	invert() {
		var det = 1 / (-this.c * this.f * this.i + this.b * this.g * this.i + this.c * this.e * this.j - this.a * this.g * this.j - this.b * this.e * this.k + this.a * this.f * this.k);
		this.a = (this.f * this.k - this.g * this.j) * det;
		this.b = (this.c * this.g - this.b * this.k) * det;
		this.c = (this.b * this.g - this.c * this.f) * det;
		this.e = (this.g * this.i - this.e * this.k) * det;
		this.f = (this.a * this.k - this.c * this.i) * det;
		this.g = (this.c * this.e - this.a * this.g) * det;
		this.i = (this.e * this.j - this.f * this.i) * det;
		this.j = (this.b * this.i - this.a * this.j) * det;
		this.k = (this.a * this.f - this.b * this.e) * det;
	}
	invert_with_determinant(det) {
		this.a = (this.f * this.k - this.g * this.j) * det;
		this.b = (this.c * this.g - this.b * this.k) * det;
		this.c = (this.b * this.g - this.c * this.f) * det;
		this.e = (this.g * this.i - this.e * this.k) * det;
		this.f = (this.a * this.k - this.c * this.i) * det;
		this.g = (this.c * this.e - this.a * this.g) * det;
		this.i = (this.e * this.j - this.f * this.i) * det;
		this.j = (this.b * this.i - this.a * this.j) * det;
		this.k = (this.a * this.f - this.b * this.e) * det;
	}
	append(m) {
		this.a = m.a * this.a + m.b * this.e + m.c * this.i;
		this.b = m.a * this.b + m.b * this.f + m.c * this.j;
		this.c = m.a * this.c + m.b * this.g + m.c * this.k;
		this.e = m.e * this.a + m.f * this.e + m.g * this.i;
		this.f = m.e * this.b + m.f * this.f + m.g * this.j;
		this.g = m.e * this.c + m.f * this.g + m.g * this.k;
		this.i = m.i * this.a + m.j * this.e + m.k * this.i;
		this.j = m.i * this.b + m.j * this.f + m.k * this.j;
		this.k = m.i * this.c + m.j * this.g + m.k * this.k;
	}
	prepend(m) {
		this.a = this.a * m.a + this.b * m.e + this.c * m.i;
		this.b = this.a * m.b + this.b * m.f + this.c * m.j;
		this.c = this.a * m.c + this.b * m.g + this.c * m.k;
		this.e = this.e * m.a + this.f * m.e + this.g * m.i;
		this.f = this.e * m.b + this.f * m.f + this.g * m.j;
		this.g = this.e * m.c + this.f * m.g + this.g * m.k;
		this.i = this.i * m.a + this.j * m.e + this.k * m.i;
		this.j = this.i * m.b + this.j * m.f + this.k * m.j;
		this.k = this.i * m.c + this.j * m.g + this.k * m.k;
	}
	prependTransposed(m) {
		this.a = this.a * m.a + this.b * m.b + this.c * m.c;
		this.b = this.a * m.e + this.b * m.f + this.c * m.g;
		this.c = this.a * m.i + this.b * m.j + this.c * m.k;
		this.e = this.e * m.a + this.f * m.b + this.g * m.c;
		this.f = this.e * m.e + this.f * m.f + this.g * m.g;
		this.g = this.e * m.i + this.f * m.j + this.g * m.k;
		this.i = this.i * m.a + this.j * m.b + this.k * m.c;
		this.j = this.i * m.e + this.j * m.f + this.k * m.g;
		this.k = this.i * m.i + this.j * m.j + this.k * m.k;
	}
	add(m) {
		this.a += m.a;
		this.b += m.b;
		this.c += m.c;
		this.e += m.e;
		this.f += m.f;
		this.g += m.g;
		this.i += m.i;
		this.j += m.j;
		this.k += m.k;
	}
	subtract(m) {
		this.a -= m.a;
		this.b -= m.b;
		this.c -= m.c;
		this.e -= m.e;
		this.f -= m.f;
		this.g -= m.g;
		this.i -= m.i;
		this.j -= m.j;
		this.k -= m.k;
	}
	transpose() {
		var tmp = this.b;
		this.b = this.e;
		this.e = tmp;
		tmp = this.c;
		this.c = this.i;
		this.i = tmp;
		tmp = this.g;
		this.g = this.j;
		this.j = tmp;
	}
	toSkewSymmetric(v) {
		this.a = this.f = this.k = 0;
		this.b = -v.z;
		this.c = v.y;
		this.e = v.z;
		this.g = -v.x;
		this.i = -v.y;
		this.j = v.x;
	}
	copyFrom(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.e = m.e;
		this.f = m.f;
		this.g = m.g;
		this.i = m.i;
		this.j = m.j;
		this.k = m.k;
	}
	writeToEulerAngles(angles) {
		if(-1 < this.i && this.i < 1) {
			angles.x = Math.atan2(this.j,this.k);
			angles.y = -Math.asin(this.i);
			angles.z = Math.atan2(this.e,this.a);
		} else {
			angles.x = 0;
			angles.y = this.i <= -1 ? Math.PI : -Math.PI;
			angles.y *= 0.5;
			angles.z = Math.atan2(-this.b,this.f);
		}
	}
	setRotation(rx,ry,rz) {
		var cosX = Math.cos(rx);
		var sinX = Math.sin(rx);
		var cosY = Math.cos(ry);
		var sinY = Math.sin(ry);
		var cosZ = Math.cos(rz);
		var sinZ = Math.sin(rz);
		var cosZsinY = cosZ * sinY;
		var sinZsinY = sinZ * sinY;
		this.a = cosZ * cosY;
		this.b = cosZsinY * sinX - sinZ * cosX;
		this.c = cosZsinY * cosX + sinZ * sinX;
		this.e = sinZ * cosY;
		this.f = sinZsinY * sinX + cosZ * cosX;
		this.g = sinZsinY * cosX - cosZ * sinX;
		this.i = -sinY;
		this.j = cosY * sinX;
		this.k = cosY * cosX;
	}
	setFromAxisAngle(axis,angle) {
		var c1 = Math.cos(angle);
		var s = Math.sin(angle);
		var t = 1 - c1;
		var x = axis.x;
		var y = axis.y;
		var z = axis.z;
		this.a = t * x * x + c1;
		this.b = t * x * y - z * s;
		this.c = t * x * z + y * s;
		this.e = t * x * y + z * s;
		this.f = t * y * y + c1;
		this.g = t * y * z - x * s;
		this.i = t * x * z - y * s;
		this.j = t * y * z + x * s;
		this.k = t * z * z + c1;
	}
	toString() {
		return "[Mat3 (" + this.a + ", " + this.b + ", " + this.c + "), (" + this.e + ", " + this.f + ", " + this.g + "), (" + this.i + ", " + this.j + ", " + this.k + ")]";
	}
	static get IDENTITY() { return IDENTITY; }
	static set IDENTITY(value) { IDENTITY = value; }
	static get ZERO() { return ZERO; }
	static set ZERO(value) { ZERO = value; }
}


// Meta

Mat3.__name__ = ["util","geom","Mat3"];
Mat3.__interfaces__ = [(util_geom_IMat3().default)];
Mat3.prototype.__class__ = Mat3.prototype.constructor = $hxClasses["util.geom.Mat3"] = Mat3;

// Init



// Statics

var IDENTITY = new Mat3();
var ZERO = new Mat3(0,0,0,0,0,0,0,0,0);

// Export

exports.default = Mat3;