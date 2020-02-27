// Class: altern.geom.Face

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function altern_geom_Wrapper() {return require("./../../altern/geom/Wrapper");}
function altern_geom_Vertex() {return require("./../../altern/geom/Vertex");}

// Constructor

class Face {
	constructor() {
	}
	collect() {
		this.next = Face.collector;
		Face.collector = this;
	}
	destroy() {
		var w = this.wrapper;
		while(w != null) {
			var nextW = w.next;
			w.next = (altern_geom_Wrapper().default).collector;
			(altern_geom_Wrapper().default).collector = w;
			if(w.vertex.temp) {
				w.vertex.temp = false;
				w.vertex.next = (altern_geom_Vertex().default).collector;
				(altern_geom_Vertex().default).collector = w.vertex;
			}
			w.vertex = null;
			w = nextW;
		}
		this.wrapper = null;
		this.processNext = null;
		this.visible = false;
	}
	calculateNormal() {
		var offset;
		var nz;
		var ny;
		var nx;
		var w;
		var acz;
		var acy;
		var acx;
		var abz;
		var aby;
		var abx;
		var nl;
		var c;
		var b;
		var a;
		w = this.wrapper;
		a = w.vertex;
		w = w.next;
		b = w.vertex;
		w = w.next;
		c = w.vertex;
		abx = b.x - a.x;
		aby = b.y - a.y;
		abz = b.z - a.z;
		acx = c.x - a.x;
		acy = c.y - a.y;
		acz = c.z - a.z;
		nx = acz * aby - acy * abz;
		ny = acx * abz - acz * abx;
		nz = acy * abx - acx * aby;
		nl = nx * nx + ny * ny + nz * nz;
		if(nl > 0) {
			nl = 1 / Math.sqrt(nl);
			nx *= nl;
			ny *= nl;
			nz *= nl;
			this.normalX = nx;
			this.normalY = ny;
			this.normalZ = nz;
		}
		offset = a.x * nx + a.y * ny + a.z * nz;
	}
	calculateBestSequenceAndNormal() {
		var nl;
		var nz;
		var ny;
		var nx;
		var w;
		var acz;
		var acy;
		var acx;
		var abz;
		var aby;
		var abx;
		var c;
		var b;
		var a;
		if(this.wrapper.next.next.next != null) {
			var max = -1e+22;
			var s = null;
			var sm;
			var sp;
			w = this.wrapper;
			while(w != null) {
				var wn = w.next != null ? w.next : this.wrapper;
				var wm = wn.next != null ? wn.next : this.wrapper;
				a = w.vertex;
				b = wn.vertex;
				c = wm.vertex;
				abx = b.x - a.x;
				aby = b.y - a.y;
				abz = b.z - a.z;
				acx = c.x - a.x;
				acy = c.y - a.y;
				acz = c.z - a.z;
				nx = acz * aby - acy * abz;
				ny = acx * abz - acz * abx;
				nz = acy * abx - acx * aby;
				nl = nx * nx + ny * ny + nz * nz;
				if(nl > max) {
					max = nl;
					s = w;
				}
			}
			if(s != this.wrapper) {
				sm = this.wrapper.next.next.next;
				while(sm.next != null) sm = sm.next;
				sp = this.wrapper;
				while(sp.next != s && sp.next != null) sp = sp.next;
				sm.next = this.wrapper;
				sp.next = null;
				this.wrapper = s;
			}
		}
		w = this.wrapper;
		a = w.vertex;
		w = w.next;
		b = w.vertex;
		w = w.next;
		c = w.vertex;
		abx = b.x - a.x;
		aby = b.y - a.y;
		abz = b.z - a.z;
		acx = c.x - a.x;
		acy = c.y - a.y;
		acz = c.z - a.z;
		nx = acz * aby - acy * abz;
		ny = acx * abz - acz * abx;
		nz = acy * abx - acx * aby;
		nl = nx * nx + ny * ny + nz * nz;
		if(nl > 0) {
			nl = 1 / Math.sqrt(nl);
			nx *= nl;
			ny *= nl;
			nz *= nl;
			this.normalX = nx;
			this.normalY = ny;
			this.normalZ = nz;
		}
		this.offset = a.x * nx + a.y * ny + a.z * nz;
	}
	getArea() {
		var w;
		var a = this.wrapper.vertex;
		var areaAccum = 0;
		w = this.wrapper.next;
		var wn = w.next;
		while(wn != null) {
			var b = w.vertex;
			var c = wn.vertex;
			var xAB = b.x - a.x;
			var yAB = b.y - a.y;
			var zAB = b.z - a.z;
			var xAC = c.x - a.x;
			var yAC = c.y - a.y;
			var zAC = c.z - a.z;
			var cx = yAB * zAC - zAB * yAC;
			var cy = zAB * xAC - xAB * zAC;
			var cz = xAB * yAC - yAB * xAC;
			areaAccum += Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
			w = w.next;
			wn = wn.next;
		}
		return areaAccum;
	}
	overlapsOther2D(face) {
		var v2 = null;
		var w2;
		var v = null;
		var w;
		var a;
		var b;
		var c;
		var lastVertex;
		var lastVertex2;
		w = this.wrapper;
		while(w != null) {
			v = w.vertex;
			w = w.next;
		}
		lastVertex = v;
		w = face.wrapper;
		while(w != null) {
			v = w.vertex;
			w = w.next;
		}
		lastVertex2 = v;
		v = lastVertex;
		w = this.wrapper;
		while(w != null) {
			var v0 = v;
			v = w.vertex;
			var v1 = w.next != null ? w.next.vertex : this.wrapper.vertex;
			v2 = lastVertex2;
			w2 = face.wrapper;
			while(w2 != null) {
				var v2_0 = v2;
				v2 = w2.vertex;
				var v2_1 = w2.next != null ? w2.next.vertex : face.wrapper.vertex;
				a = -(v2.cameraY - v.cameraY);
				b = v2.cameraX - v.cameraX;
				c = a * v.cameraX + b * v.cameraY;
				var s1 = a * v0.cameraX + b * v0.cameraY - c;
				var s1i = s1 > 0 ? 1 : s1 < 0 ? -1 : 0;
				var s2 = a * v1.cameraX + b * v1.cameraY - c;
				var s2i = s2 > 0 ? 1 : s2 < 0 ? -1 : 0;
				var side = s1i * s2i;
				var sideA = side < 0 ? -2 : side > 0 ? s1i : s1i == 0 ? s2i : s2i == 0 ? s1i : -2;
				if(sideA < -1) {
					w2 = w2.next;
					continue;
				}
				var s11 = a * v2_0.cameraX + b * v2_0.cameraY - c;
				var s1i1 = s11 > 0 ? 1 : s11 < 0 ? -1 : 0;
				var s21 = a * v2_1.cameraX + b * v2_1.cameraY - c;
				var s2i1 = s21 > 0 ? 1 : s21 < 0 ? -1 : 0;
				var side1 = s1i1 * s2i1;
				var sideB = side1 < 0 ? -2 : side1 > 0 ? s1i1 : s1i1 == 0 ? s2i1 : s2i1 == 0 ? s1i1 : -2;
				if(sideB < -1) {
					w2 = w2.next;
					continue;
				}
				if(sideA * sideB < 0) {
					return false;
				}
				w2 = w2.next;
			}
			w = w.next;
		}
		return true;
	}
	isPointInside2D(centerX,centerY) {
		var w = this.wrapper;
		var v;
		var nx;
		var ny;
		var offset;
		while(w != null) {
			v = w.vertex;
			var v2 = w.next != null ? w.next.vertex : this.wrapper.vertex;
			nx = -(v2.cameraY - v.cameraY);
			ny = v2.cameraX - v.cameraX;
			offset = nx * v.cameraX + ny * v.cameraY;
			if(nx * centerX + ny * centerY < offset) {
				return false;
			}
			w = w.next;
		}
		return true;
	}
	get_side(a,b,c,point1,point2) {
		var s1 = a * point1.cameraX + b * point1.cameraY - c;
		var s1i = s1 > 0 ? 1 : s1 < 0 ? -1 : 0;
		var s2 = a * point2.cameraX + b * point2.cameraY - c;
		var s2i = s2 > 0 ? 1 : s2 < 0 ? -1 : 0;
		var side = s1i * s2i;
		if(side < 0) {
			return -2;
		} else if(side > 0) {
			return s1i;
		} else if(s1i == 0) {
			return s2i;
		} else if(s2i == 0) {
			return s1i;
		} else {
			return -2;
		}
	}
	static create() {
		if(Face.collector != null) {
			var res = Face.collector;
			Face.collector = res.next;
			res.next = null;
			return res;
		} else {
			return new Face();
		}
	}
	static getQuad(pos,up,right,halfWidth,halfHeight,t) {
		var f = new Face();
		var v;
		var vx;
		var vy;
		var vz;
		var w = new (altern_geom_Wrapper().default)();
		f.wrapper = w;
		v = new (altern_geom_Vertex().default)();
		w.vertex = v;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx += up.x * halfHeight;
		vy += up.y * halfHeight;
		vz += up.z * halfHeight;
		vx -= right.x * halfWidth;
		vy -= right.y * halfWidth;
		vz -= right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		w = w.next = new (altern_geom_Wrapper().default)();
		v = new (altern_geom_Vertex().default)();
		w.vertex = v.next = v;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx -= up.x * halfHeight;
		vy -= up.y * halfHeight;
		vz -= up.z * halfHeight;
		vx -= right.x * halfWidth;
		vy -= right.y * halfWidth;
		vz -= right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		w = w.next = new (altern_geom_Wrapper().default)();
		v = new (altern_geom_Vertex().default)();
		w.vertex = v.next = v;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx -= up.x * halfHeight;
		vy -= up.y * halfHeight;
		vz -= up.z * halfHeight;
		vx += right.x * halfWidth;
		vy += right.y * halfWidth;
		vz += right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		w = w.next = new (altern_geom_Wrapper().default)();
		v = new (altern_geom_Vertex().default)();
		w.vertex = v.next = v;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx += up.x * halfHeight;
		vy += up.y * halfHeight;
		vz += up.z * halfHeight;
		vx += right.x * halfWidth;
		vy += right.y * halfWidth;
		vz += right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		f.calculateNormal();
		return f;
	}
	static setupQuad(f,pos,up,right,halfWidth,halfHeight,t) {
		var v;
		var vx;
		var vy;
		var vz;
		var w = f.wrapper;
		v = w.vertex;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx += up.x * halfHeight;
		vy += up.y * halfHeight;
		vz += up.z * halfHeight;
		vx -= right.x * halfWidth;
		vy -= right.y * halfWidth;
		vz -= right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		w = w.next;
		v = w.vertex;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx -= up.x * halfHeight;
		vy -= up.y * halfHeight;
		vz -= up.z * halfHeight;
		vx -= right.x * halfWidth;
		vy -= right.y * halfWidth;
		vz -= right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		w = w.next;
		v = w.vertex;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx -= up.x * halfHeight;
		vy -= up.y * halfHeight;
		vz -= up.z * halfHeight;
		vx += right.x * halfWidth;
		vy += right.y * halfWidth;
		vz += right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		w = w.next;
		v = w.vertex;
		vx = pos.x;
		vy = pos.y;
		vz = pos.z;
		vx += up.x * halfHeight;
		vy += up.y * halfHeight;
		vz += up.z * halfHeight;
		vx += right.x * halfWidth;
		vy += right.y * halfWidth;
		vz += right.z * halfWidth;
		v.x = t.a * vx + t.b * vy + t.c * vz + t.d;
		v.y = t.e * vx + t.f * vy + t.g * vz + t.h;
		v.z = t.i * vx + t.j * vy + t.k * vz + t.l;
		f.calculateNormal();
		return f;
	}
}


// Meta

Face.__name__ = ["altern","geom","Face"];
Face.prototype.__class__ = Face.prototype.constructor = $hxClasses["altern.geom.Face"] = Face;

// Init



// Statics



// Export

exports.default = Face;