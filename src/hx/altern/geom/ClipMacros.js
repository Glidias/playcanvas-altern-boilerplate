// Class: altern.geom.ClipMacros

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function altern_geom_Wrapper() {return require("./../../altern/geom/Wrapper");}
function util_geom_Vec3() {return require("./../../util/geom/Vec3");}
function altern_geom_Vertex() {return require("./../../altern/geom/Vertex");}
function altern_geom_Face() {return require("./../../altern/geom/Face");}

// Constructor

class ClipMacros {
	constructor() {
	}
	deepCloneWrapper(wrapper) {
		var wrapperClone = (altern_geom_Wrapper().default).create();
		wrapperClone.vertex = wrapper.vertex;
		var w = wrapper.next;
		var tailWrapper = wrapperClone;
		while(w != null) {
			var wClone = (altern_geom_Wrapper().default).create();
			wClone.vertex = w.vertex;
			tailWrapper.next = wClone;
			tailWrapper = wClone;
			w = w.next;
		}
		return wrapperClone;
	}
	static get DUMMY_VECTOR() { return DUMMY_VECTOR; }
	static set DUMMY_VECTOR(value) { DUMMY_VECTOR = value; }
	static get transformId() { return transformId; }
	static set transformId(value) { transformId = value; }
	static computeMeshVerticesLocalOffsets(faceList,camNormal) {
		var wrapper;
		var f;
		ClipMacros.transformId++;
		f = faceList;
		while(f != null) {
			wrapper = f.wrapper;
			while(wrapper != null) {
				var vertex = wrapper.vertex;
				if(vertex.transformId != ClipMacros.transformId) {
					vertex.offset = vertex.x * camNormal.x + vertex.y * camNormal.y + vertex.z * camNormal.z;
					vertex.transformId = ClipMacros.transformId;
				}
				wrapper = wrapper.next;
			}
			f = f.processNext;
		}
	}
	static getClippedVerticesForFace(face,normal,offset,tailWrapper,wrapperClone) {
		var nextWrapper;
		var headWrapper = null;
		var w;
		var wClone;
		var a = tailWrapper.vertex;
		var ao = a.offset;
		var bo;
		var b;
		var ratio;
		var v;
		w = wrapperClone;
		while(w != null) {
			nextWrapper = w.next;
			b = w.vertex;
			bo = b.offset;
			if(bo > offset && ao <= offset || bo <= offset && ao > offset) {
				v = (altern_geom_Vertex().default).create();
				ratio = (offset - ao) / (bo - ao);
				v.cameraX = a.cameraX + (b.cameraX - a.cameraX) * ratio;
				v.cameraY = a.cameraY + (b.cameraY - a.cameraY) * ratio;
				v.cameraZ = a.cameraZ + (b.cameraZ - a.cameraZ) * ratio;
				v.x = a.x + (b.x - a.x) * ratio;
				v.y = a.y + (b.y - a.y) * ratio;
				v.z = a.z + (b.z - a.z) * ratio;
				wClone = (altern_geom_Wrapper().default).create();
				wClone.vertex = v;
				if(headWrapper != null) {
					tailWrapper.next = wClone;
				} else {
					headWrapper = wClone;
				}
				tailWrapper = wClone;
			}
			if(bo > offset) {
				if(headWrapper != null) {
					tailWrapper.next = w;
				} else {
					headWrapper = w;
				}
				tailWrapper = w;
				w.next = null;
			} else {
				w.vertex = null;
				w.next = (altern_geom_Wrapper().default).collector;
				(altern_geom_Wrapper().default).collector = w;
			}
			a = b;
			ao = bo;
			w = nextWrapper;
		}
		return headWrapper;
	}
	static calculateFaceCoordinates2(faceList,faceReference) {
		var calculateId = ++ClipMacros.transformId;
		var origin = faceReference.wrapper.next.vertex;
		var top = faceReference.wrapper.vertex;
		var right = faceReference.wrapper.next.next.vertex;
		var topX = top.x - origin.x;
		var topY = top.y - origin.y;
		var topZ = top.z - origin.z;
		var rightX = right.x - origin.x;
		var rightY = right.y - origin.y;
		var rightZ = right.z - origin.z;
		var d;
		var topD = Math.sqrt(topX * topX + topY * topY + topZ * topZ);
		d = 1 / topD;
		topX *= d;
		topY *= d;
		topZ *= d;
		var rightD = Math.sqrt(rightX * rightX + rightY * rightY + rightZ * rightZ);
		d = 1 / rightD;
		rightX *= d;
		rightY *= d;
		rightZ *= d;
		var vx;
		var vy;
		var vz;
		var f = faceList;
		while(f != null) {
			var w = f.wrapper;
			while(w != null) {
				var v = w.vertex;
				if(v.transformId != calculateId) {
					v.transformId = calculateId;
					vx = v.x - origin.x;
					vy = v.y - origin.y;
					vz = v.z - origin.z;
					v.cameraX = vx * rightX + vy * rightY + vz * rightZ;
					v.cameraY = vx * topX + vy * topY + vz * topZ;
				}
				w = w.next;
			}
			f = f.next;
		}
	}
	static calculateFaceCoordinates(faceList,top,right,origin) {
		var calculateId = ++ClipMacros.transformId;
		var topX = top.x;
		var topY = top.y;
		var topZ = top.z;
		var rightX = right.x;
		var rightY = right.y;
		var rightZ = right.z;
		var vx;
		var vy;
		var vz;
		var f = faceList;
		while(f != null) {
			var w = f.wrapper;
			while(w != null) {
				var v = w.vertex;
				if(v.transformId != calculateId) {
					v.transformId = calculateId;
					vx = v.x - origin.x;
					vy = v.y - origin.y;
					vz = v.z - origin.z;
					v.cameraX = vx * rightX + vy * rightY + vz * rightZ;
					v.cameraY = vx * topX + vy * topY + vz * topZ;
				}
				w = w.next;
			}
			f = f.next;
		}
	}
	static updateClipFace(face,normal,offset) {
		var w = face.wrapper;
		var tailWrapper = w;
		while(w != null) {
			tailWrapper = w;
			w = w.next;
		}
		face.wrapper = ClipMacros.getClippedVerticesForFace(face,normal,offset,tailWrapper,face.wrapper);
	}
	static newPositiveClipFace(face,normal,offset) {
		var clipFace = (altern_geom_Face().default).create();
		clipFace.offset = face.offset;
		clipFace.normalX = face.normalX;
		clipFace.normalY = face.normalY;
		clipFace.normalZ = face.normalZ;
		var wrapper = face.wrapper;
		var wrapperClone = (altern_geom_Wrapper().default).create();
		wrapperClone.vertex = wrapper.vertex;
		var w = wrapper.next;
		var tailWrapper = wrapperClone;
		var wClone;
		while(w != null) {
			wClone = (altern_geom_Wrapper().default).create();
			wClone.vertex = w.vertex;
			tailWrapper.next = wClone;
			tailWrapper = wClone;
			w = w.next;
		}
		clipFace.wrapper = ClipMacros.getClippedVerticesForFace(face,normal,offset,tailWrapper,wrapperClone);
		return clipFace;
	}
	static getOverlapClipFace(clipperFace,face) {
		var v;
		var w;
		var ax;
		var ay;
		var az;
		var bx;
		var by;
		var bz;
		var negativeFace = null;
		ax = clipperFace.normalX;
		ay = clipperFace.normalY;
		az = clipperFace.normalZ;
		var inputNorm = ClipMacros.DUMMY_VECTOR;
		w = clipperFace.wrapper;
		while(w != null) {
			v = w.vertex;
			var v2 = w.next != null ? w.next.vertex : clipperFace.wrapper.vertex;
			bx = v2.x - v.x;
			by = v2.y - v.y;
			bz = v2.z - v.z;
			var d = 1 / Math.sqrt(bx * bx + by * by + bz * bz);
			bx *= d;
			by *= d;
			bz *= d;
			inputNorm.x = bz * ay - by * az;
			inputNorm.y = bx * az - bz * ax;
			inputNorm.z = by * ax - bx * ay;
			var offset = v.x * inputNorm.x + v.y * inputNorm.y + v.z * inputNorm.z;
			ClipMacros.computeMeshVerticesLocalOffsets(face,inputNorm);
			if(negativeFace == null) {
				negativeFace = ClipMacros.newPositiveClipFace(face,inputNorm,offset);
			} else {
				ClipMacros.updateClipFace(face,inputNorm,offset);
			}
			if(negativeFace.wrapper == null) {
				negativeFace = null;
			}
			face = negativeFace;
			if(face == null) {
				break;
			}
			w = w.next;
		}
		if(negativeFace != null) {
			return negativeFace;
		}
		return null;
	}
	static clipWithPlaneList(planeList,disposableFace,clipMask) {
		if(clipMask == null) {
			clipMask = 0;
		}
		var p;
		var f = disposableFace;
		var negativeFace = null;
		var inputNorm = ClipMacros.DUMMY_VECTOR;
		var count = 0;
		p = planeList;
		while(p != null) {
			if((clipMask & 1 << count) != 0) {
				++count;
				p = p.next;
				continue;
			}
			inputNorm.x = -p.x;
			inputNorm.y = -p.y;
			inputNorm.z = -p.z;
			var offset = -p.offset;
			ClipMacros.computeMeshVerticesLocalOffsets(f,inputNorm);
			if(negativeFace == null) {
				negativeFace = ClipMacros.newPositiveClipFace(f,inputNorm,offset);
			} else {
				ClipMacros.updateClipFace(f,inputNorm,offset);
			}
			if(negativeFace.wrapper == null) {
				negativeFace = null;
			}
			f = negativeFace;
			if(f == null) {
				break;
			}
			++count;
			p = p.next;
		}
		if(negativeFace != null) {
			return negativeFace;
		}
		return null;
	}
}


// Meta

ClipMacros.__name__ = ["altern","geom","ClipMacros"];
ClipMacros.prototype.__class__ = ClipMacros.prototype.constructor = $hxClasses["altern.geom.ClipMacros"] = ClipMacros;

// Init



// Statics

var DUMMY_VECTOR = new (util_geom_Vec3().default)();
var transformId = 0;

// Export

exports.default = ClipMacros;