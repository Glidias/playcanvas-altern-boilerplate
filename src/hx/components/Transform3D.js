// Class: components.Transform3D

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;

// Constructor

class Transform3D {
	constructor() {
		this.identity();
	}
	identity() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 0;
		this.e = 0;
		this.f = 1;
		this.g = 0;
		this.h = 0;
		this.i = 0;
		this.j = 0;
		this.k = 1;
		this.l = 0;
	}
	compose(x,y,z,rotationX,rotationY,rotationZ,scaleX,scaleY,scaleZ) {
		var cosX = Math.cos(rotationX);
		var sinX = Math.sin(rotationX);
		var cosY = Math.cos(rotationY);
		var sinY = Math.sin(rotationY);
		var cosZ = Math.cos(rotationZ);
		var sinZ = Math.sin(rotationZ);
		var cosZsinY = cosZ * sinY;
		var sinZsinY = sinZ * sinY;
		var cosYscaleX = cosY * scaleX;
		var sinXscaleY = sinX * scaleY;
		var cosXscaleY = cosX * scaleY;
		var cosXscaleZ = cosX * scaleZ;
		var sinXscaleZ = sinX * scaleZ;
		this.a = cosZ * cosYscaleX;
		this.b = cosZsinY * sinXscaleY - sinZ * cosXscaleY;
		this.c = cosZsinY * cosXscaleZ + sinZ * sinXscaleZ;
		this.d = x;
		this.e = sinZ * cosYscaleX;
		this.f = sinZsinY * sinXscaleY + cosZ * cosXscaleY;
		this.g = sinZsinY * cosXscaleZ - cosZ * sinXscaleZ;
		this.h = y;
		this.i = -sinY * scaleX;
		this.j = cosY * sinXscaleY;
		this.k = cosY * cosXscaleZ;
		this.l = z;
	}
	invert() {
		var ta = this.a;
		var tb = this.b;
		var tc = this.c;
		var td = this.d;
		var te = this.e;
		var tf = this.f;
		var tg = this.g;
		var th = this.h;
		var ti = this.i;
		var tj = this.j;
		var tk = this.k;
		var tl = this.l;
		var det = 1 / (-tc * tf * ti + tb * tg * ti + tc * te * tj - ta * tg * tj - tb * te * tk + ta * tf * tk);
		this.a = (-tg * tj + tf * tk) * det;
		this.b = (tc * tj - tb * tk) * det;
		this.c = (-tc * tf + tb * tg) * det;
		this.d = (td * tg * tj - tc * th * tj - td * tf * tk + tb * th * tk + tc * tf * tl - tb * tg * tl) * det;
		this.e = (tg * ti - te * tk) * det;
		this.f = (-tc * ti + ta * tk) * det;
		this.g = (tc * te - ta * tg) * det;
		this.h = (tc * th * ti - td * tg * ti + td * te * tk - ta * th * tk - tc * te * tl + ta * tg * tl) * det;
		this.i = (-tf * ti + te * tj) * det;
		this.j = (tb * ti - ta * tj) * det;
		this.k = (-tb * te + ta * tf) * det;
		this.l = (td * tf * ti - tb * th * ti - td * te * tj + ta * th * tj + tb * te * tl - ta * tf * tl) * det;
	}
	initFromVector(vector) {
		this.a = vector[0];
		this.b = vector[1];
		this.c = vector[2];
		this.d = vector[3];
		this.e = vector[4];
		this.f = vector[5];
		this.g = vector[6];
		this.h = vector[7];
		this.i = vector[8];
		this.j = vector[9];
		this.k = vector[10];
		this.l = vector[11];
	}
	append(transform) {
		var ta = this.a;
		var tb = this.b;
		var tc = this.c;
		var td = this.d;
		var te = this.e;
		var tf = this.f;
		var tg = this.g;
		var th = this.h;
		var ti = this.i;
		var tj = this.j;
		var tk = this.k;
		var tl = this.l;
		this.a = transform.a * ta + transform.b * te + transform.c * ti;
		this.b = transform.a * tb + transform.b * tf + transform.c * tj;
		this.c = transform.a * tc + transform.b * tg + transform.c * tk;
		this.d = transform.a * td + transform.b * th + transform.c * tl + transform.d;
		this.e = transform.e * ta + transform.f * te + transform.g * ti;
		this.f = transform.e * tb + transform.f * tf + transform.g * tj;
		this.g = transform.e * tc + transform.f * tg + transform.g * tk;
		this.h = transform.e * td + transform.f * th + transform.g * tl + transform.h;
		this.i = transform.i * ta + transform.j * te + transform.k * ti;
		this.j = transform.i * tb + transform.j * tf + transform.k * tj;
		this.k = transform.i * tc + transform.j * tg + transform.k * tk;
		this.l = transform.i * td + transform.j * th + transform.k * tl + transform.l;
	}
	prepend(transform) {
		var ta = this.a;
		var tb = this.b;
		var tc = this.c;
		var td = this.d;
		var te = this.e;
		var tf = this.f;
		var tg = this.g;
		var th = this.h;
		var ti = this.i;
		var tj = this.j;
		var tk = this.k;
		var tl = this.l;
		this.a = ta * transform.a + tb * transform.e + tc * transform.i;
		this.b = ta * transform.b + tb * transform.f + tc * transform.j;
		this.c = ta * transform.c + tb * transform.g + tc * transform.k;
		this.d = ta * transform.d + tb * transform.h + tc * transform.l + td;
		this.e = te * transform.a + tf * transform.e + tg * transform.i;
		this.f = te * transform.b + tf * transform.f + tg * transform.j;
		this.g = te * transform.c + tf * transform.g + tg * transform.k;
		this.h = te * transform.d + tf * transform.h + tg * transform.l + th;
		this.i = ti * transform.a + tj * transform.e + tk * transform.i;
		this.j = ti * transform.b + tj * transform.f + tk * transform.j;
		this.k = ti * transform.c + tj * transform.g + tk * transform.k;
		this.l = ti * transform.d + tj * transform.h + tk * transform.l + tl;
	}
	combine(transformA,transformB) {
		this.a = transformA.a * transformB.a + transformA.b * transformB.e + transformA.c * transformB.i;
		this.b = transformA.a * transformB.b + transformA.b * transformB.f + transformA.c * transformB.j;
		this.c = transformA.a * transformB.c + transformA.b * transformB.g + transformA.c * transformB.k;
		this.d = transformA.a * transformB.d + transformA.b * transformB.h + transformA.c * transformB.l + transformA.d;
		this.e = transformA.e * transformB.a + transformA.f * transformB.e + transformA.g * transformB.i;
		this.f = transformA.e * transformB.b + transformA.f * transformB.f + transformA.g * transformB.j;
		this.g = transformA.e * transformB.c + transformA.f * transformB.g + transformA.g * transformB.k;
		this.h = transformA.e * transformB.d + transformA.f * transformB.h + transformA.g * transformB.l + transformA.h;
		this.i = transformA.i * transformB.a + transformA.j * transformB.e + transformA.k * transformB.i;
		this.j = transformA.i * transformB.b + transformA.j * transformB.f + transformA.k * transformB.j;
		this.k = transformA.i * transformB.c + transformA.j * transformB.g + transformA.k * transformB.k;
		this.l = transformA.i * transformB.d + transformA.j * transformB.h + transformA.k * transformB.l + transformA.l;
	}
	calculateInversion(source) {
		var ta = source.a;
		var tb = source.b;
		var tc = source.c;
		var td = source.d;
		var te = source.e;
		var tf = source.f;
		var tg = source.g;
		var th = source.h;
		var ti = source.i;
		var tj = source.j;
		var tk = source.k;
		var tl = source.l;
		var det = 1 / (-tc * tf * ti + tb * tg * ti + tc * te * tj - ta * tg * tj - tb * te * tk + ta * tf * tk);
		this.a = (-tg * tj + tf * tk) * det;
		this.b = (tc * tj - tb * tk) * det;
		this.c = (-tc * tf + tb * tg) * det;
		this.d = (td * tg * tj - tc * th * tj - td * tf * tk + tb * th * tk + tc * tf * tl - tb * tg * tl) * det;
		this.e = (tg * ti - te * tk) * det;
		this.f = (-tc * ti + ta * tk) * det;
		this.g = (tc * te - ta * tg) * det;
		this.h = (tc * th * ti - td * tg * ti + td * te * tk - ta * th * tk - tc * te * tl + ta * tg * tl) * det;
		this.i = (-tf * ti + te * tj) * det;
		this.j = (tb * ti - ta * tj) * det;
		this.k = (-tb * te + ta * tf) * det;
		this.l = (td * tf * ti - tb * th * ti - td * te * tj + ta * th * tj + tb * te * tl - ta * tf * tl) * det;
	}
	copy(source) {
		this.a = source.a;
		this.b = source.b;
		this.c = source.c;
		this.d = source.d;
		this.e = source.e;
		this.f = source.f;
		this.g = source.g;
		this.h = source.h;
		this.i = source.i;
		this.j = source.j;
		this.k = source.k;
		this.l = source.l;
	}
}


// Meta

Transform3D.__name__ = ["components","Transform3D"];
Transform3D.prototype.__class__ = Transform3D.prototype.constructor = $hxClasses["components.Transform3D"] = Transform3D;

// Init



// Statics



// Export

exports.default = Transform3D;