// Class: jeash.geom.Matrix

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function jeash_geom_Point() {return require("./../../jeash/geom/Point");}

// Constructor

class Matrix {
	constructor(in_a,in_b,in_c,in_d,in_tx,in_ty) {
		this.a = in_a == null ? 1.0 : in_a;
		this.b = in_b == null ? 0.0 : in_b;
		this.c = in_c == null ? 0.0 : in_c;
		this.d = in_d == null ? 1.0 : in_d;
		this.tx = in_tx == null ? 0.0 : in_tx;
		this.ty = in_ty == null ? 0.0 : in_ty;
	}
	copyFrom(src) {
		this.a = src.a;
		this.b = src.b;
		this.c = src.c;
		this.d = src.d;
		this.tx = src.tx;
		this.ty = src.ty;
	}
	clone() {
		return new Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	concat(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	createBox(scaleX,scaleY,rotation,tx,ty) {
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation == null ? 0.0 : rotation;
		this.tx = tx == null ? 0.0 : tx;
		this.ty = ty == null ? 0.0 : ty;
	}
	createGradientBox(in_width,in_height,rotation,in_tx,in_ty) {
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = this.c = 0;
		}
		this.tx = in_tx != null ? in_tx + in_width / 2 : in_width / 2;
		this.ty = in_ty != null ? in_ty + in_height / 2 : in_height / 2;
	}
	deltaTransformPoint(point) {
		return new (jeash_geom_Point().default)(point.x * this.a + point.y * this.c,point.x * this.b + point.y * this.d);
	}
	identity() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	invert() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	mult(m) {
		var result = new Matrix();
		result.a = this.a * m.a + this.b * m.c;
		result.b = this.a * m.b + this.b * m.d;
		result.c = this.c * m.a + this.d * m.c;
		result.d = this.c * m.b + this.d * m.d;
		result.tx = this.tx * m.a + this.ty * m.c + m.tx;
		result.ty = this.tx * m.b + this.ty * m.d + m.ty;
		return result;
	}
	rotate(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	scale(inSX,inSY) {
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		this.tx *= inSX;
		this.ty *= inSY;
	}
	setRotation(inTheta,inScale) {
		var scale = inScale == null ? 1.0 : inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	setTo(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	transformPoint(inPos) {
		return new (jeash_geom_Point().default)(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	translate(inDX,inDY) {
		this.tx += inDX;
		this.ty += inDY;
	}
	toString() {
		return "[ " + this.a + " " + this.b + " " + this.c + " " + this.d + " " + this.tx + " " + this.ty + " ]";
	}
}


// Meta

Matrix.__name__ = ["jeash","geom","Matrix"];
Matrix.prototype.__class__ = Matrix.prototype.constructor = $hxClasses["jeash.geom.Matrix"] = Matrix;

// Init



// Statics



// Export

exports.default = Matrix;