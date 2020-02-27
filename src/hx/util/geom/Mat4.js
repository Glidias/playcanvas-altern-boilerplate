// Class: util.geom.Mat4

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function util_geom_IMat4() {return require("./../../util/geom/IMat4");}

// Constructor

class Mat4 {
	constructor(a,b,c,d,e,f,g,h,i,j,k,l) {
		if(l == null) {
			l = 0;
		}
		if(k == null) {
			k = 1;
		}
		if(j == null) {
			j = 0;
		}
		if(i == null) {
			i = 0;
		}
		if(h == null) {
			h = 0;
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
		if(d == null) {
			d = 0;
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
		this.d = d;
		this.e = e;
		this.f = f;
		this.g = g;
		this.h = h;
		this.i = i;
		this.j = j;
		this.k = k;
		this.l = l;
	}
	identity() {
		this.a = this.f = this.k = 1;
		this.b = this.c = this.e = this.g = this.i = this.j = this.d = this.h = this.l = 0;
	}
	determinant() {
		return -this.c * this.f * this.i + this.b * this.g * this.i + this.c * this.e * this.j - this.a * this.g * this.j - this.b * this.e * this.k + this.a * this.f * this.k;
	}
	invert() {
		var det = -this.c * this.f * this.i + this.b * this.g * this.i + this.c * this.e * this.j - this.a * this.g * this.j - this.b * this.e * this.k + this.a * this.f * this.k;
		this.a = (-this.g * this.j + this.f * this.k) / det;
		this.b = (this.c * this.j - this.b * this.k) / det;
		this.c = (-this.c * this.f + this.b * this.g) / det;
		this.d = (this.d * this.g * this.j - this.c * this.h * this.j - this.d * this.f * this.k + this.b * this.h * this.k + this.c * this.f * this.l - this.b * this.g * this.l) / det;
		this.e = (this.g * this.i - this.e * this.k) / det;
		this.f = (-this.c * this.i + this.a * this.k) / det;
		this.g = (this.c * this.e - this.a * this.g) / det;
		this.h = (this.c * this.h * this.i - this.d * this.g * this.i + this.d * this.e * this.k - this.a * this.h * this.k - this.c * this.e * this.l + this.a * this.g * this.l) / det;
		this.i = (-this.f * this.i + this.e * this.j) / det;
		this.j = (this.b * this.i - this.a * this.j) / det;
		this.k = (-this.b * this.e + this.a * this.f) / det;
		this.l = (this.d * this.f * this.i - this.b * this.h * this.i - this.d * this.e * this.j + this.a * this.h * this.j + this.b * this.e * this.l - this.a * this.f * this.l) / det;
	}
	invert_with_determinant(det) {
		this.a = (-this.g * this.j + this.f * this.k) / det;
		this.b = (this.c * this.j - this.b * this.k) / det;
		this.c = (-this.c * this.f + this.b * this.g) / det;
		this.d = (this.d * this.g * this.j - this.c * this.h * this.j - this.d * this.f * this.k + this.b * this.h * this.k + this.c * this.f * this.l - this.b * this.g * this.l) / det;
		this.e = (this.g * this.i - this.e * this.k) / det;
		this.f = (-this.c * this.i + this.a * this.k) / det;
		this.g = (this.c * this.e - this.a * this.g) / det;
		this.h = (this.c * this.h * this.i - this.d * this.g * this.i + this.d * this.e * this.k - this.a * this.h * this.k - this.c * this.e * this.l + this.a * this.g * this.l) / det;
		this.i = (-this.f * this.i + this.e * this.j) / det;
		this.j = (this.b * this.i - this.a * this.j) / det;
		this.k = (-this.b * this.e + this.a * this.f) / det;
		this.l = (this.d * this.f * this.i - this.b * this.h * this.i - this.d * this.e * this.j + this.a * this.h * this.j + this.b * this.e * this.l - this.a * this.f * this.l) / det;
	}
	append(m) {
		this.a = m.a * this.a + m.b * this.e + m.c * this.i;
		this.b = m.a * this.b + m.b * this.f + m.c * this.j;
		this.c = m.a * this.c + m.b * this.g + m.c * this.k;
		this.d = m.a * this.d + m.b * this.h + m.c * this.l + m.d;
		this.e = m.e * this.a + m.f * this.e + m.g * this.i;
		this.f = m.e * this.b + m.f * this.f + m.g * this.j;
		this.g = m.e * this.c + m.f * this.g + m.g * this.k;
		this.h = m.e * this.d + m.f * this.h + m.g * this.l + m.h;
		this.i = m.i * this.a + m.j * this.e + m.k * this.i;
		this.j = m.i * this.b + m.j * this.f + m.k * this.j;
		this.k = m.i * this.c + m.j * this.g + m.k * this.k;
		this.l = m.i * this.d + m.j * this.h + m.k * this.l + m.l;
	}
	prepend(m) {
		this.a = this.a * m.a + this.b * m.e + this.c * m.i;
		this.b = this.a * m.b + this.b * m.f + this.c * m.j;
		this.c = this.a * m.c + this.b * m.g + this.c * m.k;
		this.d = this.a * m.d + this.b * m.h + this.c * m.l + this.d;
		this.e = this.e * m.a + this.f * m.e + this.g * m.i;
		this.f = this.e * m.b + this.f * m.f + this.g * m.j;
		this.g = this.e * m.c + this.f * m.g + this.g * m.k;
		this.h = this.e * m.d + this.f * m.h + this.g * m.l + this.h;
		this.i = this.i * m.a + this.j * m.e + this.k * m.i;
		this.j = this.i * m.b + this.j * m.f + this.k * m.j;
		this.k = this.i * m.c + this.j * m.g + this.k * m.k;
		this.l = this.i * m.d + this.j * m.h + this.k * m.l + this.l;
	}
	add(m) {
		this.a += m.a;
		this.b += m.b;
		this.c += m.c;
		this.d += m.d;
		this.e += m.e;
		this.f += m.f;
		this.g += m.g;
		this.h += m.h;
		this.i += m.i;
		this.j += m.j;
		this.k += m.k;
		this.l += m.l;
	}
	subtract(m) {
		this.a -= m.a;
		this.b -= m.b;
		this.c -= m.c;
		this.d -= m.d;
		this.e -= m.e;
		this.f -= m.f;
		this.g -= m.g;
		this.h -= m.h;
		this.i -= m.i;
		this.j -= m.j;
		this.k -= m.k;
		this.l -= m.l;
	}
	transformPoint(vin,vout) {
		vout.x = this.a * vin.x + this.b * vin.y + this.c * vin.z + this.d;
		vout.y = this.e * vin.x + this.f * vin.y + this.g * vin.z + this.h;
		vout.z = this.i * vin.x + this.j * vin.y + this.k * vin.z + this.l;
	}
	transformPointTransposed(vin,vout) {
		var xx = vin.x - this.d;
		var yy = vin.y - this.h;
		var zz = vin.z - this.l;
		vout.x = this.a * xx + this.e * yy + this.i * zz;
		vout.y = this.b * xx + this.f * yy + this.j * zz;
		vout.z = this.c * xx + this.g * yy + this.k * zz;
	}
	transformPoints(arrin,arrout) {
		var vin;
		var vout;
		var _g1 = 0;
		var _g = arrin.length;
		while(_g1 < _g) {
			var i = _g1++;
			vin = arrin[i];
			vout = arrout[i];
			vout.x = this.a * vin.x + this.b * vin.y + this.c * vin.z + this.d;
			vout.y = this.e * vin.x + this.f * vin.y + this.g * vin.z + this.h;
			vout.z = i * vin.x + this.j * vin.y + this.k * vin.z + this.l;
		}
	}
	transformPointsN(arrin,arrout,len) {
		var vin;
		var vout;
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			vin = arrin[i];
			vout = arrout[i];
			vout.x = this.a * vin.x + this.b * vin.y + this.c * vin.z + this.d;
			vout.y = this.e * vin.x + this.f * vin.y + this.g * vin.z + this.h;
			vout.z = i * vin.x + this.j * vin.y + this.k * vin.z + this.l;
		}
	}
	transformPointsTransposed(arrin,arrout) {
		var vin;
		var vout;
		var _g1 = 0;
		var _g = arrin.length;
		while(_g1 < _g) {
			var i = _g1++;
			vin = arrin[i];
			vout = arrout[i];
			var xx = vin.x - this.d;
			var yy = vin.y - this.h;
			var zz = vin.z - this.l;
			vout.x = this.a * xx + this.e * yy + i * zz;
			vout.y = this.b * xx + this.f * yy + this.j * zz;
			vout.z = this.c * xx + this.g * yy + this.k * zz;
		}
	}
	transformPointsTransposedN(arrin,arrout,len) {
		var vin;
		var vout;
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			vin = arrin[i];
			vout = arrout[i];
			var xx = vin.x - this.d;
			var yy = vin.y - this.h;
			var zz = vin.z - this.l;
			vout.x = this.a * xx + this.e * yy + i * zz;
			vout.y = this.b * xx + this.f * yy + this.j * zz;
			vout.z = this.c * xx + this.g * yy + this.k * zz;
		}
	}
	getAxis(idx,axis) {
		switch(idx) {
		case 0:
			axis.x = this.a;
			axis.y = this.e;
			axis.z = this.i;
			return;
		case 1:
			axis.x = this.b;
			axis.y = this.f;
			axis.z = this.j;
			return;
		case 2:
			axis.x = this.c;
			axis.y = this.g;
			axis.z = this.k;
			return;
		case 3:
			axis.x = this.d;
			axis.y = this.h;
			axis.z = this.l;
			return;
		}
	}
	setAxes(xAxis,yAxis,zAxis,pos) {
		this.a = xAxis.x;
		this.e = xAxis.y;
		this.i = xAxis.z;
		this.b = yAxis.x;
		this.f = yAxis.y;
		this.j = yAxis.z;
		this.c = zAxis.x;
		this.g = zAxis.y;
		this.k = zAxis.z;
		this.d = pos.x;
		this.h = pos.y;
		this.l = pos.z;
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
	copy(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.e = m.e;
		this.f = m.f;
		this.g = m.g;
		this.h = m.h;
		this.i = m.i;
		this.j = m.j;
		this.k = m.k;
		this.l = m.l;
	}
	copy3(m) {
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
	getEulerAngles(angles) {
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
	setPosition(pos) {
		this.d = pos.x;
		this.h = pos.y;
		this.l = pos.z;
	}
	setPositionXYZ(x,y,z) {
		this.d = x;
		this.h = y;
		this.l = z;
	}
	clone() {
		return new Mat4(this.a,this.b,this.c,this.d,this.e,this.f,this.g,this.h,this.i,this.j,this.k,this.l);
	}
	toString() {
		return "[Mat4 [" + this.a + " " + this.b + " " + this.c + " " + this.d + "] [" + this.e + " " + this.f + " " + this.g + " " + this.h + "] [" + this.i + " " + this.j + " " + this.k + " " + this.l + "]]";
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
	static get IDENTITY() { return IDENTITY; }
	static set IDENTITY(value) { IDENTITY = value; }
}


// Meta

Mat4.__name__ = ["util","geom","Mat4"];
Mat4.__interfaces__ = [(util_geom_IMat4().default)];
Mat4.prototype.__class__ = Mat4.prototype.constructor = $hxClasses["util.geom.Mat4"] = Mat4;

// Init



// Statics

var IDENTITY = new Mat4();

// Export

exports.default = Mat4;