// Class: util.geom.Geometry

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function altern_culling_IFrustumCollectTri() {return require("./../../altern/culling/IFrustumCollectTri");}
function altern_ray_IRaycastImpl() {return require("./../../altern/ray/IRaycastImpl");}
function util_geom_ITECollidable() {return require("./../../util/geom/ITECollidable");}
function altern_culling_DefaultCulling() {return require("./../../altern/culling/DefaultCulling");}
function altern_geom_Face() {return require("./../../altern/geom/Face");}
function components_Transform3D() {return require("./../../components/Transform3D");}
function jeash_geom_Vector3D() {return require("./../../jeash/geom/Vector3D");}

// Constructor

class Geometry {
	constructor() {
		this.vertices = [];
		this.indices = [];
		this.numVertices = 0;
		this.numIndices = 0;
	}
	setVertices(val) {
		this.vertices = val;
		this.numVertices = val.length / 3 | 0;
	}
	setIndices(val) {
		this.indices = val;
		this.numIndices = val.length;
	}
	collectGeometry(collider) {
		collider.geometries[collider.numGeometries] = this;
		collider.transforms[collider.numGeometries] = collider.inverseMatrix;
		collider.numGeometries++;
	}
	collectGeometryAndTransforms(collider,baseTransform) {
		collider.geometries[collider.numGeometries] = this;
		collider.transforms[collider.numGeometries] = baseTransform;
		collider.numGeometries++;
	}
	intersectRay(origin,direction,res) {
		var ox = origin.x;
		var oy = origin.y;
		var oz = origin.z;
		var dx = direction.x;
		var dy = direction.y;
		var dz = direction.z;
		var nax;
		var nay;
		var naz;
		var nbx;
		var nby;
		var nbz;
		var ncx;
		var ncy;
		var ncz;
		var nrmX;
		var nrmY;
		var nrmZ;
		var point = null;
		var minTime = res.w != 0 ? res.w : direction.w != 0 ? direction.w : 1e+22;
		var numTriangles = Math.floor(this.numIndices / 3);
		var count = numTriangles * 3;
		var pIndex = 0;
		var i = 0;
		while(i < count) {
			var indexA = this.indices[i];
			var indexB = this.indices[i + 1];
			var indexC = this.indices[i + 2];
			pIndex = indexA * 3;
			var ax = this.vertices[pIndex++];
			var ay = this.vertices[pIndex++];
			var az = this.vertices[pIndex];
			pIndex = indexB * 3;
			var bx = this.vertices[pIndex++];
			var by = this.vertices[pIndex++];
			var bz = this.vertices[pIndex];
			pIndex = indexC * 3;
			var cx = this.vertices[pIndex++];
			var cy = this.vertices[pIndex++];
			var cz = this.vertices[pIndex];
			var abx = bx - ax;
			var aby = by - ay;
			var abz = bz - az;
			var acx = cx - ax;
			var acy = cy - ay;
			var acz = cz - az;
			var normalX = acz * aby - acy * abz;
			var normalY = acx * abz - acz * abx;
			var normalZ = acy * abx - acx * aby;
			var len = normalX * normalX + normalY * normalY + normalZ * normalZ;
			if(len > 0.001) {
				len = 1 / Math.sqrt(len);
				normalX *= len;
				normalY *= len;
				normalZ *= len;
			}
			var dot = dx * normalX + dy * normalY + dz * normalZ;
			if(dot < 0) {
				var offset = ox * normalX + oy * normalY + oz * normalZ - (ax * normalX + ay * normalY + az * normalZ);
				if(offset > 0) {
					var time = -offset / dot;
					if(point == null || time < minTime) {
						var rx = ox + dx * time;
						var ry = oy + dy * time;
						var rz = oz + dz * time;
						abx = bx - ax;
						aby = by - ay;
						abz = bz - az;
						acx = rx - ax;
						acy = ry - ay;
						acz = rz - az;
						if((acz * aby - acy * abz) * normalX + (acx * abz - acz * abx) * normalY + (acy * abx - acx * aby) * normalZ >= 0) {
							abx = cx - bx;
							aby = cy - by;
							abz = cz - bz;
							acx = rx - bx;
							acy = ry - by;
							acz = rz - bz;
							if((acz * aby - acy * abz) * normalX + (acx * abz - acz * abx) * normalY + (acy * abx - acx * aby) * normalZ >= 0) {
								abx = ax - cx;
								aby = ay - cy;
								abz = az - cz;
								acx = rx - cx;
								acy = ry - cy;
								acz = rz - cz;
								if((acz * aby - acy * abz) * normalX + (acx * abz - acz * abx) * normalY + (acy * abx - acx * aby) * normalZ >= 0) {
									if(time < minTime) {
										minTime = time;
										if(point == null) {
											point = Geometry.sampleRayPoint;
										}
										point.x = rx;
										point.y = ry;
										point.z = rz;
										nax = ax;
										nay = ay;
										naz = az;
										nrmX = normalX;
										nbx = bx;
										nby = by;
										nbz = bz;
										nrmY = normalY;
										ncx = cx;
										ncy = cy;
										ncz = cz;
										nrmZ = normalZ;
									}
								}
							}
						}
					}
				}
			}
			i += 3;
		}
		if(point != null) {
			res.x = point.x;
			res.y = point.y;
			res.z = point.z;
			res.w = minTime;
			return res;
		} else {
			return null;
		}
	}
	collectTrisForFrustum(frustum,culling,frustumCorners,vertices,indices) {
		var vi = vertices.length;
		var ii = indices.length;
		var len = this.numIndices;
		var i = 0;
		var pIndex;
		while(i < len) {
			var indexA = this.indices[i];
			var indexB = this.indices[i + 1];
			var indexC = this.indices[i + 2];
			pIndex = indexA * 3;
			var ax = this.vertices[pIndex++];
			var ay = this.vertices[pIndex++];
			var az = this.vertices[pIndex];
			pIndex = indexB * 3;
			var bx = this.vertices[pIndex++];
			var by = this.vertices[pIndex++];
			var bz = this.vertices[pIndex];
			pIndex = indexC * 3;
			var cx = this.vertices[pIndex++];
			var cy = this.vertices[pIndex++];
			var cz = this.vertices[pIndex];
			var triFrustumCover;
			var tmp;
			if((altern_culling_DefaultCulling().default).isInFrontOfFrustum(ax,ay,az,bx,by,bz,cx,cy,cz,frustumCorners)) {
				triFrustumCover = (altern_culling_DefaultCulling().default).triInFrustumCover(frustum,ax,ay,az,bx,by,bz,cx,cy,cz);
				tmp = triFrustumCover >= 0;
			} else {
				tmp = false;
			}
			if(tmp) {
				if(triFrustumCover == 0) {
					vertices[vi++] = ax;
					indices[ii] = ii++;
					vertices[vi++] = ay;
					indices[ii] = ii++;
					vertices[vi++] = az;
					indices[ii] = ii++;
					vertices[vi++] = bx;
					indices[ii] = ii++;
					vertices[vi++] = by;
					indices[ii] = ii++;
					vertices[vi++] = bz;
					indices[ii] = ii++;
					vertices[vi++] = cx;
					indices[ii] = ii++;
					vertices[vi++] = cy;
					indices[ii] = ii++;
					vertices[vi++] = cz;
					indices[ii] = ii++;
				} else {
					var w;
					var f;
					var a;
					var b;
					var c;
					var wn;
					f = (altern_culling_DefaultCulling().default).clippedFace;
					if((triFrustumCover & 1) != 0 && f != null) {
						a = f.wrapper.vertex;
						w = f.wrapper.next;
						wn = w.next;
						while(wn != null) {
							b = w.vertex;
							c = wn.vertex;
							vertices[vi++] = a.x;
							indices[ii] = ii++;
							vertices[vi++] = a.y;
							indices[ii] = ii++;
							vertices[vi++] = a.z;
							indices[ii] = ii++;
							vertices[vi++] = b.x;
							indices[ii] = ii++;
							vertices[vi++] = b.y;
							indices[ii] = ii++;
							vertices[vi++] = b.z;
							indices[ii] = ii++;
							vertices[vi++] = c.x;
							indices[ii] = ii++;
							vertices[vi++] = c.y;
							indices[ii] = ii++;
							vertices[vi++] = c.z;
							indices[ii] = ii++;
							w = w.next;
							wn = wn.next;
						}
						var f1 = (altern_culling_DefaultCulling().default).clippedFace;
						f1.destroy();
						f1.next = (altern_geom_Face().default).collector;
						(altern_geom_Face().default).collector = f1;
					}
					f = (altern_culling_DefaultCulling().default).clippedFace2;
					if((triFrustumCover & 2) != 0 && f != null) {
						a = f.wrapper.vertex;
						w = f.wrapper.next;
						wn = w.next;
						while(wn != null) {
							b = w.vertex;
							c = wn.vertex;
							vertices[vi++] = a.x;
							indices[ii] = ii++;
							vertices[vi++] = a.y;
							indices[ii] = ii++;
							vertices[vi++] = a.z;
							indices[ii] = ii++;
							vertices[vi++] = b.x;
							indices[ii] = ii++;
							vertices[vi++] = b.y;
							indices[ii] = ii++;
							vertices[vi++] = b.z;
							indices[ii] = ii++;
							vertices[vi++] = c.x;
							indices[ii] = ii++;
							vertices[vi++] = c.y;
							indices[ii] = ii++;
							vertices[vi++] = c.z;
							indices[ii] = ii++;
							w = w.next;
							wn = wn.next;
						}
						var f2 = (altern_culling_DefaultCulling().default).clippedFace2;
						f2.destroy();
						f2.next = (altern_geom_Face().default).collector;
						(altern_geom_Face().default).collector = f2;
					}
				}
			}
			i += 3;
		}
	}
	static get IDENTITY() { return IDENTITY; }
	static set IDENTITY(value) { IDENTITY = value; }
	static get sampleRayPoint() { return sampleRayPoint; }
	static set sampleRayPoint(value) { sampleRayPoint = value; }
}


// Meta

Geometry.__name__ = ["util","geom","Geometry"];
Geometry.__interfaces__ = [(altern_culling_IFrustumCollectTri().default),(altern_ray_IRaycastImpl().default),(util_geom_ITECollidable().default)];
Geometry.prototype.__class__ = Geometry.prototype.constructor = $hxClasses["util.geom.Geometry"] = Geometry;

// Init



// Statics

var IDENTITY = new (components_Transform3D().default)();
var sampleRayPoint = new (jeash_geom_Vector3D().default)();

// Export

exports.default = Geometry;