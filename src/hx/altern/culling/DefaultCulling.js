// Class: altern.culling.DefaultCulling

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function altern_terrain_ICuller() {return require("./../../altern/terrain/ICuller");}
function altern_geom_Face() {return require("./../../altern/geom/Face");}
function altern_geom_Wrapper() {return require("./../../altern/geom/Wrapper");}
function altern_geom_Vertex() {return require("./../../altern/geom/Vertex");}
function util_geom_Vec3() {return require("./../../util/geom/Vec3");}
function altern_geom_ClipMacros() {return require("./../../altern/geom/ClipMacros");}

// Constructor

class DefaultCulling {
	constructor() {
	}
	cullingInFrustum(culling,minX,minY,minZ,maxX,maxY,maxZ) {
		var side = 1;
		var plane = this.frustum;
		while(plane != null) {
			if((culling & side) != 0) {
				if(plane.x >= 0) {
					if(plane.y >= 0) {
						if(plane.z >= 0) {
							if(maxX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.offset) {
								return -1;
							}
							if(minX * plane.x + minY * plane.y + minZ * plane.z > plane.offset) {
								culling &= 63 & ~side;
							}
						} else {
							if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.offset) {
								return -1;
							}
							if(minX * plane.x + minY * plane.y + maxZ * plane.z > plane.offset) {
								culling &= 63 & ~side;
							}
						}
					} else if(plane.z >= 0) {
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.offset) {
							return -1;
						}
						if(minX * plane.x + maxY * plane.y + minZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					} else {
						if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.offset) {
							return -1;
						}
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					}
				} else if(plane.y >= 0) {
					if(plane.z >= 0) {
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.offset) {
							return -1;
						}
						if(maxX * plane.x + minY * plane.y + minZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					} else {
						if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.offset) {
							return -1;
						}
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					}
				} else if(plane.z >= 0) {
					if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.offset) {
						return -1;
					}
					if(maxX * plane.x + maxY * plane.y + minZ * plane.z > plane.offset) {
						culling &= 63 & ~side;
					}
				} else {
					if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.offset) {
						return -1;
					}
					if(maxX * plane.x + maxY * plane.y + maxZ * plane.z > plane.offset) {
						culling &= 63 & ~side;
					}
				}
			}
			side <<= 1;
			plane = plane.next;
		}
		return culling;
	}
	static cullingInFrustumOf(frustum,culling,minX,minY,minZ,maxX,maxY,maxZ) {
		var side = 1;
		var plane = frustum;
		while(plane != null) {
			if((culling & side) != 0) {
				if(plane.x >= 0) {
					if(plane.y >= 0) {
						if(plane.z >= 0) {
							if(maxX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.offset) {
								return -1;
							}
							if(minX * plane.x + minY * plane.y + minZ * plane.z > plane.offset) {
								culling &= 63 & ~side;
							}
						} else {
							if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.offset) {
								return -1;
							}
							if(minX * plane.x + minY * plane.y + maxZ * plane.z > plane.offset) {
								culling &= 63 & ~side;
							}
						}
					} else if(plane.z >= 0) {
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.offset) {
							return -1;
						}
						if(minX * plane.x + maxY * plane.y + minZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					} else {
						if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.offset) {
							return -1;
						}
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					}
				} else if(plane.y >= 0) {
					if(plane.z >= 0) {
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.offset) {
							return -1;
						}
						if(maxX * plane.x + minY * plane.y + minZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					} else {
						if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.offset) {
							return -1;
						}
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					}
				} else if(plane.z >= 0) {
					if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.offset) {
						return -1;
					}
					if(maxX * plane.x + maxY * plane.y + minZ * plane.z > plane.offset) {
						culling &= 63 & ~side;
					}
				} else {
					if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.offset) {
						return -1;
					}
					if(maxX * plane.x + maxY * plane.y + maxZ * plane.z > plane.offset) {
						culling &= 63 & ~side;
					}
				}
			}
			side <<= 1;
			plane = plane.next;
		}
		return culling;
	}
	static isInFrontOfFrustum(ax,ay,az,bx,by,bz,cx,cy,cz,frustumCorners) {
		var x = frustumCorners[0].x;
		var y = frustumCorners[0].y;
		var z = frustumCorners[0].z;
		var acz;
		var normalX;
		var normalY;
		var acx;
		var acy;
		var abz;
		var normalZ;
		var aby;
		var abx = bx - ax;
		aby = by - ay;
		abz = bz - az;
		acx = cx - ax;
		acy = cy - ay;
		acz = cz - az;
		normalX = acz * aby - acy * abz;
		normalY = acx * abz - acz * abx;
		normalZ = acy * abx - acx * aby;
		var offset = ax * normalX + ay * normalY + az * normalZ;
		if(normalX * x + normalY * y + normalZ * z <= offset) {
			return false;
		}
		var c;
		var outside;
		var inside;
		var different;
		outside = false;
		inside = false;
		different = false;
		var _g1 = 0;
		var _g = frustumCorners.length;
		while(_g1 < _g) {
			var i = _g1++;
			c = frustumCorners[i];
			if(normalX * c.x + normalY * c.y + normalZ * c.z >= offset) {
				inside = true;
			} else {
				outside = true;
			}
			if(inside && outside) {
				different = true;
				break;
			}
		}
		return different;
	}
	static createNewTri() {
		var f = new (altern_geom_Face().default)();
		var w;
		var v;
		w = new (altern_geom_Wrapper().default)();
		f.wrapper = w;
		v = new (altern_geom_Vertex().default)();
		w.vertex = v;
		w = w.next = new (altern_geom_Wrapper().default)();
		v = new (altern_geom_Vertex().default)();
		w.vertex = v.next = v;
		w = w.next = new (altern_geom_Wrapper().default)();
		v = new (altern_geom_Vertex().default)();
		w.vertex = v.next = v;
		return f;
	}
	static collectClippedFace() {
		var f = DefaultCulling.clippedFace;
		f.destroy();
		f.next = (altern_geom_Face().default).collector;
		(altern_geom_Face().default).collector = f;
	}
	static collectClippedFace2() {
		var f = DefaultCulling.clippedFace2;
		f.destroy();
		f.next = (altern_geom_Face().default).collector;
		(altern_geom_Face().default).collector = f;
	}
	static get CLIP_NEAR() { return CLIP_NEAR; }
	static set CLIP_NEAR(value) { CLIP_NEAR = value; }
	static triInFrustumCover(frustum,ax,ay,az,bx,by,bz,cx,cy,cz) {
		var lastPlane = null;
		var clipNear = DefaultCulling.CLIP_NEAR;
		var nearClipPlane = null;
		var plane = frustum;
		while(plane != null) {
			if(ax * plane.x + ay * plane.y + az * plane.z < plane.offset && bx * plane.x + by * plane.y + bz * plane.z < plane.offset && cx * plane.x + cy * plane.y + cz * plane.z < plane.offset) {
				return -1;
			}
			lastPlane = plane;
			plane = plane.next;
			if(clipNear && plane != null && plane.next == null) {
				nearClipPlane = plane;
			}
		}
		var result = 0;
		plane = lastPlane;
		if(ax * plane.x + ay * plane.y + az * plane.z < plane.offset || bx * plane.x + by * plane.y + bz * plane.z < plane.offset || cx * plane.x + cy * plane.y + cz * plane.z < plane.offset) {
			if(DefaultCulling.clippingTri == null) {
				DefaultCulling.clippingTri = DefaultCulling.createNewTri();
				DefaultCulling.clippingNormal = new (util_geom_Vec3().default)();
			}
			DefaultCulling.clippingTri.wrapper.vertex.x = ax;
			DefaultCulling.clippingTri.wrapper.vertex.y = ay;
			DefaultCulling.clippingTri.wrapper.vertex.z = az;
			DefaultCulling.clippingTri.wrapper.next.vertex.x = bx;
			DefaultCulling.clippingTri.wrapper.next.vertex.y = by;
			DefaultCulling.clippingTri.wrapper.next.vertex.z = bz;
			DefaultCulling.clippingTri.wrapper.next.next.vertex.x = cx;
			DefaultCulling.clippingTri.wrapper.next.next.vertex.y = cy;
			DefaultCulling.clippingTri.wrapper.next.next.vertex.z = cz;
			DefaultCulling.clippingNormal.x = plane.x;
			DefaultCulling.clippingNormal.y = plane.y;
			DefaultCulling.clippingNormal.z = plane.z;
			(altern_geom_ClipMacros().default).computeMeshVerticesLocalOffsets(DefaultCulling.clippingTri,DefaultCulling.clippingNormal);
			DefaultCulling.clippedFace = (altern_geom_ClipMacros().default).newPositiveClipFace(DefaultCulling.clippingTri,DefaultCulling.clippingNormal,plane.offset);
			result |= 1;
		}
		if(clipNear) {
			plane = nearClipPlane;
			if(ax * plane.x + ay * plane.y + az * plane.z < plane.offset || bx * plane.x + by * plane.y + bz * plane.z < plane.offset || cx * plane.x + cy * plane.y + cz * plane.z < plane.offset) {
				if(DefaultCulling.clippingTri2 == null) {
					DefaultCulling.clippingTri2 = DefaultCulling.createNewTri();
					DefaultCulling.clippingNormal2 = new (util_geom_Vec3().default)();
				}
				DefaultCulling.clippingTri2.wrapper.vertex.x = ax;
				DefaultCulling.clippingTri2.wrapper.vertex.y = ay;
				DefaultCulling.clippingTri2.wrapper.vertex.z = az;
				DefaultCulling.clippingTri2.wrapper.next.vertex.x = bx;
				DefaultCulling.clippingTri2.wrapper.next.vertex.y = by;
				DefaultCulling.clippingTri2.wrapper.next.vertex.z = bz;
				DefaultCulling.clippingTri2.wrapper.next.next.vertex.x = cx;
				DefaultCulling.clippingTri2.wrapper.next.next.vertex.y = cy;
				DefaultCulling.clippingTri2.wrapper.next.next.vertex.z = cz;
				DefaultCulling.clippingNormal2.x = plane.x;
				DefaultCulling.clippingNormal2.y = plane.y;
				DefaultCulling.clippingNormal2.z = plane.z;
				(altern_geom_ClipMacros().default).computeMeshVerticesLocalOffsets(DefaultCulling.clippingTri2,DefaultCulling.clippingNormal2);
				DefaultCulling.clippedFace2 = (altern_geom_ClipMacros().default).newPositiveClipFace(DefaultCulling.clippingTri2,DefaultCulling.clippingNormal2,plane.offset);
				result |= 2;
			}
		}
		return result;
	}
	static pointInFrustum(frustum,x,y,z) {
		var plane = frustum;
		while(plane != null) {
			if(x * plane.x + y * plane.y + z * plane.z < plane.offset) {
				return false;
			}
			plane = plane.next;
		}
		return true;
	}
}


// Meta

DefaultCulling.__name__ = ["altern","culling","DefaultCulling"];
DefaultCulling.__interfaces__ = [(altern_terrain_ICuller().default)];
DefaultCulling.prototype.__class__ = DefaultCulling.prototype.constructor = $hxClasses["altern.culling.DefaultCulling"] = DefaultCulling;

// Init



// Statics

var CLIP_NEAR = false;

// Export

exports.default = DefaultCulling;