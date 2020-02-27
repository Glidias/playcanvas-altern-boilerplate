// Class: altern.culling.TargetBoardTester

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function altern_geom_Face() {return require("./../../altern/geom/Face");}
function altern_culling_DefaultCulling() {return require("./../../altern/culling/DefaultCulling");}
function js_Boot() {return require("./../../js/Boot");}
function altern_culling_IFrustumCollectTri() {return require("./../../altern/culling/IFrustumCollectTri");}
function altern_culling_CullingPlane() {return require("./../../altern/culling/CullingPlane");}
function jeash_geom_Vector3D() {return require("./../../jeash/geom/Vector3D");}
function altern_geom_ClipMacros() {return require("./../../altern/geom/ClipMacros");}
function components_Transform3D() {return require("./../../components/Transform3D");}
function util_geom_Vec3() {return require("./../../util/geom/Vec3");}

// Constructor

class TargetBoardTester {
	constructor() {
		this.delaunatorPts = [];
		this.dfsStackCulling = [];
		this.dfsStack = [];
		this.priorityCover = 0;
		this.nearClip = 0;
		this.planeOrientedFarclip = false;
		this.yLockedNearClip = false;
		this.dummyVec = new (util_geom_Vec3().default)();
		this.nearClipPointRef2 = new (jeash_geom_Vector3D().default)();
		this.nearClipPointRef = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints2 = [];
		this.testFrustumPoints = [];
		this.testVertices = [];
		this.testIndices = [];
		this.RIGHT = new (jeash_geom_Vector3D().default)(1,0,0);
		this.UP = new (jeash_geom_Vector3D().default)(0,1,0);
		this.targLook = new (util_geom_Vec3().default)();
		this.targUp = new (util_geom_Vec3().default)();
		this.targRight = new (util_geom_Vec3().default)();
		this.targPos = new (util_geom_Vec3().default)();
		this.targOrigin = new (util_geom_Vec3().default)();
		this.proot = new (util_geom_Vec3().default)();
		this.position = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints[0] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints[1] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints[2] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints[3] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints[4] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints2[0] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints2[1] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints2[2] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints2[3] = new (jeash_geom_Vector3D().default)();
		this.testFrustumPoints2[4] = new (jeash_geom_Vector3D().default)();
		this.testFrustum = this.setupNewFrustum();
	}
	setObserverPosition(x,y,z) {
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
	}
	setObserverPriority(priority) {
		this.priorityCover = priority;
	}
	setupTargetBoard(pos,up,right,sx,sz,testBoundNode,customDisposableFace) {
		var dx;
		var dy;
		this.targPos.x = pos.x;
		this.targPos.y = pos.y;
		this.targPos.z = pos.z;
		this.targUp.x = up.x;
		this.targUp.y = up.y;
		this.targUp.z = up.z;
		this.targRight.x = right.x;
		this.targRight.y = right.y;
		this.targRight.z = right.z;
		var w;
		var h;
		if(customDisposableFace == null) {
			this.dummyVec.x = this.targRight.x;
			this.dummyVec.y = 0;
			this.dummyVec.z = this.targRight.z;
			this.dummyVec.normalize();
			var _this = this.dummyVec;
			_this.x *= sx;
			_this.y *= sx;
			_this.z *= sx;
			var _this1 = this.targRight;
			var v = this.dummyVec;
			dx = _this1.x * v.x + _this1.y * v.y + _this1.z * v.z;
			dy = this.targRight.y * sz;
			if(dx < 0) {
				dx = -dx;
			} else {
				dx = dx;
			}
			if(dy < 0) {
				dy = -dy;
			} else {
				dy = dy;
			}
			if(dx < dy) {
				w = dy;
			} else {
				w = dx;
			}
			var _this2 = this.targUp;
			var v1 = this.dummyVec;
			dx = _this2.x * v1.x + _this2.y * v1.y + _this2.z * v1.z;
			dy = this.targUp.y * sz;
			if(dx < 0) {
				dx = -dx;
			} else {
				dx = dx;
			}
			if(dy < 0) {
				dy = -dy;
			} else {
				dy = dy;
			}
			if(dx < dy) {
				h = dy;
			} else {
				h = dx;
			}
			if(h >= w) {
				h = h;
			} else {
				h = w;
			}
		} else {
			w = sx;
			h = sz;
		}
		var f = 0;
		this.testFrustumPoints[f].x = this.position.x;
		this.testFrustumPoints[f].y = this.position.y;
		this.testFrustumPoints[f].z = this.position.z;
		++f;
		this.proot.x = this.targPos.x;
		this.proot.y = this.targPos.y;
		this.proot.z = this.targPos.z;
		this.proot.x += this.targUp.x * h;
		this.proot.y += this.targUp.y * h;
		this.proot.z += this.targUp.z * h;
		this.proot.x -= this.targRight.x * w;
		this.proot.y -= this.targRight.y * w;
		this.proot.z -= this.targRight.z * w;
		this.testFrustumPoints[f].x = this.proot.x;
		this.testFrustumPoints[f].y = this.proot.y;
		this.testFrustumPoints[f].z = this.proot.z;
		++f;
		this.proot.x = this.targPos.x;
		this.proot.y = this.targPos.y;
		this.proot.z = this.targPos.z;
		this.proot.x -= this.targUp.x * h;
		this.proot.y -= this.targUp.y * h;
		this.proot.z -= this.targUp.z * h;
		this.proot.x -= this.targRight.x * w;
		this.proot.y -= this.targRight.y * w;
		this.proot.z -= this.targRight.z * w;
		this.testFrustumPoints[f].x = this.proot.x;
		this.testFrustumPoints[f].y = this.proot.y;
		this.testFrustumPoints[f].z = this.proot.z;
		var _this3 = this.targOrigin;
		var source = this.proot;
		_this3.x = source.x;
		_this3.y = source.y;
		_this3.z = source.z;
		++f;
		this.proot.x = this.targPos.x;
		this.proot.y = this.targPos.y;
		this.proot.z = this.targPos.z;
		this.proot.x -= this.targUp.x * h;
		this.proot.y -= this.targUp.y * h;
		this.proot.z -= this.targUp.z * h;
		this.proot.x += this.targRight.x * w;
		this.proot.y += this.targRight.y * w;
		this.proot.z += this.targRight.z * w;
		this.testFrustumPoints[f].x = this.proot.x;
		this.testFrustumPoints[f].y = this.proot.y;
		this.testFrustumPoints[f].z = this.proot.z;
		++f;
		this.proot.x = this.targPos.x;
		this.proot.y = this.targPos.y;
		this.proot.z = this.targPos.z;
		this.proot.x += this.targUp.x * h;
		this.proot.y += this.targUp.y * h;
		this.proot.z += this.targUp.z * h;
		this.proot.x += this.targRight.x * w;
		this.proot.y += this.targRight.y * w;
		this.proot.z += this.targRight.z * w;
		this.testFrustumPoints[f].x = this.proot.x;
		this.testFrustumPoints[f].y = this.proot.y;
		this.testFrustumPoints[f].z = this.proot.z;
		var useFace = customDisposableFace != null ? customDisposableFace : this.disposableFace != null ? (altern_geom_Face().default).setupQuad(this.disposableFace,this.targPos,this.targUp,this.targRight,w,h,TargetBoardTester.IDENTITY) : (altern_geom_Face().default).getQuad(this.targPos,this.targUp,this.targRight,w,h,TargetBoardTester.IDENTITY);
		if(customDisposableFace == null) {
			this.disposableFace = useFace;
		}
		this.testIndices.length = 0;
		this.testVertices.length = 0;
		var startI = 0;
		var di = 0;
		this.dfsStack[di] = testBoundNode;
		this.dfsStackCulling[di] = 63;
		++di;
		this.targLook.x = this.targPos.x - this.position.x;
		this.targLook.y = this.targPos.y - this.position.y;
		this.targLook.z = this.targPos.z - this.position.z;
		this.targLook.normalize();
		this.nearClipPointRef.x = this.position.x + this.nearClip * this.targLook.x;
		this.nearClipPointRef.y = this.position.y + this.nearClip * this.targLook.y;
		this.nearClipPointRef.z = this.position.z + this.nearClip * this.targLook.z;
		while(--di >= 0) {
			var obj = this.dfsStack[di];
			var culling = this.dfsStackCulling[di];
			if(obj.worldToLocalTransform == null) {
				obj.calculateLocalWorldTransforms();
			}
			var t = obj.worldToLocalTransform;
			var _g1 = 0;
			var _g = this.testFrustumPoints.length;
			while(_g1 < _g) {
				var i = _g1++;
				var v2 = this.testFrustumPoints2[i];
				var r = this.testFrustumPoints[i];
				v2.x = t.a * r.x + t.b * r.y + t.c * r.z + t.d;
				v2.y = t.e * r.x + t.f * r.y + t.g * r.z + t.h;
				v2.z = t.i * r.x + t.j * r.y + t.k * r.z + t.l;
			}
			this.dummyVec.x = t.a * this.targPos.x + t.b * this.targPos.y + t.c * this.targPos.z + t.d;
			this.dummyVec.y = t.e * this.targPos.x + t.f * this.targPos.y + t.g * this.targPos.z + t.h;
			this.dummyVec.z = t.i * this.targPos.x + t.j * this.targPos.y + t.k * this.targPos.z + t.l;
			this.nearClipPointRef2.x = t.a * this.nearClipPointRef.x + t.b * this.nearClipPointRef.y + t.c * this.nearClipPointRef.z + t.d;
			this.nearClipPointRef2.y = t.e * this.nearClipPointRef.x + t.f * this.nearClipPointRef.y + t.g * this.nearClipPointRef.z + t.h;
			this.nearClipPointRef2.z = t.i * this.nearClipPointRef.x + t.j * this.nearClipPointRef.y + t.k * this.nearClipPointRef.z + t.l;
			this.createFrustumFromPoints(this.testFrustumPoints2,this.dummyVec,this.nearClipPointRef2);
			if(obj.boundBox != null) {
				culling = (altern_culling_DefaultCulling().default).cullingInFrustumOf(this.testFrustum,culling,obj.boundBox.minX,obj.boundBox.minY,obj.boundBox.minZ,obj.boundBox.maxX,obj.boundBox.maxY,obj.boundBox.maxZ);
			}
			if(culling >= 0) {
				var c = obj.childrenList;
				while(c != null) {
					this.dfsStack[di] = c;
					this.dfsStackCulling[di] = culling;
					++di;
					c = c.next;
				}
				var collectable;
				if(this.priorityCover != 0) {
					var tmp;
					if(obj.collidable != null) {
						var obj1 = obj.collidable;
						if((js_Boot().default).__instanceof(obj1,(altern_culling_IFrustumCollectTri().default))) {
							collectable = obj1;
						} else {
							collectable = null;
						}
						tmp = collectable != null;
					} else {
						tmp = false;
					}
					if(tmp) {
						collectable.collectTrisForFrustum(this.testFrustum,culling,this.testFrustumPoints2,this.testVertices,this.testIndices);
					} else {
						var tmp1;
						if(obj.raycastable != null) {
							var obj2 = obj.raycastable;
							if((js_Boot().default).__instanceof(obj2,(altern_culling_IFrustumCollectTri().default))) {
								collectable = obj2;
							} else {
								collectable = null;
							}
							tmp1 = collectable != null;
						} else {
							tmp1 = false;
						}
						if(tmp1) {
							collectable.collectTrisForFrustum(this.testFrustum,culling,this.testFrustumPoints2,this.testVertices,this.testIndices);
						}
					}
				} else {
					var tmp2;
					if(obj.raycastable != null) {
						var obj3 = obj.raycastable;
						if((js_Boot().default).__instanceof(obj3,(altern_culling_IFrustumCollectTri().default))) {
							collectable = obj3;
						} else {
							collectable = null;
						}
						tmp2 = collectable != null;
					} else {
						tmp2 = false;
					}
					if(tmp2) {
						collectable.collectTrisForFrustum(this.testFrustum,culling,this.testFrustumPoints2,this.testVertices,this.testIndices);
					} else {
						var tmp3;
						if(obj.collidable != null) {
							var obj4 = obj.collidable;
							if((js_Boot().default).__instanceof(obj4,(altern_culling_IFrustumCollectTri().default))) {
								collectable = obj4;
							} else {
								collectable = null;
							}
							tmp3 = collectable != null;
						} else {
							tmp3 = false;
						}
						if(tmp3) {
							collectable.collectTrisForFrustum(this.testFrustum,culling,this.testFrustumPoints2,this.testVertices,this.testIndices);
						}
					}
				}
				t = obj.localToWorldTransform;
				var vx;
				var vy;
				var vz;
				var len = this.testVertices.length;
				var i1 = startI;
				while(i1 < len) {
					vx = this.testVertices[i1];
					vy = this.testVertices[i1 + 1];
					vz = this.testVertices[i1 + 2];
					this.testVertices[i1] = t.a * vx + t.b * vy + t.c * vz + t.d;
					this.testVertices[i1 + 1] = t.e * vx + t.f * vy + t.g * vz + t.h;
					this.testVertices[i1 + 2] = t.i * vx + t.j * vy + t.k * vz + t.l;
					i1 += 3;
				}
				startI = this.testVertices.length;
			}
		}
		var area = useFace.getArea();
		var areaSubtracted = this.collectClipPolygonsFromSoup(this.testVertices,this.testIndices,this.position.x,this.position.y,this.position.z,area,useFace);
		var ratioCover = areaSubtracted / area;
		return ratioCover;
	}
	transformVertices(t,startI) {
		var vx;
		var vy;
		var vz;
		var len = this.testVertices.length;
		var i = startI;
		while(i < len) {
			vx = this.testVertices[i];
			vy = this.testVertices[i + 1];
			vz = this.testVertices[i + 2];
			this.testVertices[i] = t.a * vx + t.b * vy + t.c * vz + t.d;
			this.testVertices[i + 1] = t.e * vx + t.f * vy + t.g * vz + t.h;
			this.testVertices[i + 2] = t.i * vx + t.j * vy + t.k * vz + t.l;
			i += 3;
		}
	}
	setupNewFrustum() {
		var cullingPlane = new (altern_culling_CullingPlane().default)();
		var c = cullingPlane;
		c = c.next = new (altern_culling_CullingPlane().default)();
		c = c.next = new (altern_culling_CullingPlane().default)();
		c = c.next = new (altern_culling_CullingPlane().default)();
		c = c.next = new (altern_culling_CullingPlane().default)();
		c = c.next = new (altern_culling_CullingPlane().default)();
		return cullingPlane;
	}
	createFrustumFromPoints(pts,targPos,nearClipPt) {
		var cullingPlane = this.testFrustum;
		var c = cullingPlane;
		var v;
		var _this = pts[2];
		var a = pts[0];
		var _this1 = new (jeash_geom_Vector3D().default)(_this.x - a.x,_this.y - a.y,_this.z - a.z);
		var _this2 = pts[1];
		var a1 = pts[0];
		var a2 = new (jeash_geom_Vector3D().default)(_this2.x - a1.x,_this2.y - a1.y,_this2.z - a1.z);
		v = new (jeash_geom_Vector3D().default)(_this1.y * a2.z - _this1.z * a2.y,_this1.z * a2.x - _this1.x * a2.z,_this1.x * a2.y - _this1.y * a2.x,1);
		c.x = v.x;
		c.y = v.y;
		c.z = v.z;
		c.offset = v.x * pts[0].x + v.y * pts[0].y + v.z * pts[0].z;
		c = c.next;
		var _this3 = pts[3];
		var a3 = pts[0];
		var _this4 = new (jeash_geom_Vector3D().default)(_this3.x - a3.x,_this3.y - a3.y,_this3.z - a3.z);
		var _this5 = pts[2];
		var a4 = pts[0];
		var a5 = new (jeash_geom_Vector3D().default)(_this5.x - a4.x,_this5.y - a4.y,_this5.z - a4.z);
		v = new (jeash_geom_Vector3D().default)(_this4.y * a5.z - _this4.z * a5.y,_this4.z * a5.x - _this4.x * a5.z,_this4.x * a5.y - _this4.y * a5.x,1);
		c.x = v.x;
		c.y = v.y;
		c.z = v.z;
		c.offset = v.x * pts[0].x + v.y * pts[0].y + v.z * pts[0].z;
		c = c.next;
		var _this6 = pts[4];
		var a6 = pts[0];
		var _this7 = new (jeash_geom_Vector3D().default)(_this6.x - a6.x,_this6.y - a6.y,_this6.z - a6.z);
		var _this8 = pts[3];
		var a7 = pts[0];
		var a8 = new (jeash_geom_Vector3D().default)(_this8.x - a7.x,_this8.y - a7.y,_this8.z - a7.z);
		v = new (jeash_geom_Vector3D().default)(_this7.y * a8.z - _this7.z * a8.y,_this7.z * a8.x - _this7.x * a8.z,_this7.x * a8.y - _this7.y * a8.x,1);
		c.x = v.x;
		c.y = v.y;
		c.z = v.z;
		c.offset = v.x * pts[0].x + v.y * pts[0].y + v.z * pts[0].z;
		c = c.next;
		var _this9 = pts[1];
		var a9 = pts[0];
		var _this10 = new (jeash_geom_Vector3D().default)(_this9.x - a9.x,_this9.y - a9.y,_this9.z - a9.z);
		var _this11 = pts[4];
		var a10 = pts[0];
		var a11 = new (jeash_geom_Vector3D().default)(_this11.x - a10.x,_this11.y - a10.y,_this11.z - a10.z);
		v = new (jeash_geom_Vector3D().default)(_this10.y * a11.z - _this10.z * a11.y,_this10.z * a11.x - _this10.x * a11.z,_this10.x * a11.y - _this10.y * a11.x,1);
		c.x = v.x;
		c.y = v.y;
		c.z = v.z;
		c.offset = v.x * pts[0].x + v.y * pts[0].y + v.z * pts[0].z;
		c = c.next;
		v.x = targPos.x - nearClipPt.x;
		v.y = this.yLockedNearClip ? 0 : targPos.y - nearClipPt.y;
		v.z = targPos.z - nearClipPt.z;
		c.x = v.x;
		c.y = v.y;
		c.z = v.z;
		c.offset = v.x * nearClipPt.x + v.y * nearClipPt.y + v.z * nearClipPt.z;
		c = c.next;
		if(!this.planeOrientedFarclip) {
			v.x = pts[0].x - targPos.x;
			v.y = pts[0].y - targPos.y;
			v.z = pts[0].z - targPos.z;
		} else {
			var _this12 = pts[3];
			var a12 = pts[2];
			var _this13 = new (jeash_geom_Vector3D().default)(_this12.x - a12.x,_this12.y - a12.y,_this12.z - a12.z);
			var _this14 = pts[1];
			var a13 = pts[2];
			var a14 = new (jeash_geom_Vector3D().default)(_this14.x - a13.x,_this14.y - a13.y,_this14.z - a13.z);
			v = new (jeash_geom_Vector3D().default)(_this13.y * a14.z - _this13.z * a14.y,_this13.z * a14.x - _this13.x * a14.z,_this13.x * a14.y - _this13.y * a14.x,1);
		}
		c.x = v.x;
		c.y = v.y;
		c.z = v.z;
		c.offset = v.x * targPos.x + v.y * targPos.y + v.z * targPos.z;
	}
	collectClipPolygonsFromSoup(vertices,indices,observerX,observerY,observerZ,ofArea,disposableFace) {
		var ax;
		var ay;
		var az;
		var len;
		var i;
		var earlyOutFull = false;
		var retFace;
		var p;
		if(this.soupPlaneList == null) {
			p = (altern_culling_CullingPlane().default).create();
			this.soupPlaneList = p;
			p = p.next = (altern_culling_CullingPlane().default).create();
			p = p.next = (altern_culling_CullingPlane().default).create();
		}
		this.soupFaceList = null;
		var mask;
		var areaSubtracted = 0;
		len = indices.length;
		i = 0;
		while(i < len) {
			mask = 0;
			var ai = indices[i] * 3;
			var bi = indices[i + 1] * 3;
			var ci = indices[i + 2] * 3;
			ax = vertices[ai];
			ay = vertices[ai + 1];
			az = vertices[ai + 2];
			var bx = vertices[bi];
			var by = vertices[bi + 1];
			var bz = vertices[bi + 2];
			var cx = vertices[ci];
			var cy = vertices[ci + 1];
			var cz = vertices[ci + 2];
			var abx;
			var aby;
			var abz;
			var acx;
			var acy;
			var acz;
			p = this.soupPlaneList;
			abx = ax - observerX;
			aby = ay - observerY;
			abz = az - observerZ;
			acx = bx - observerX;
			acy = by - observerY;
			acz = bz - observerZ;
			p.x = acz * aby - acy * abz;
			p.y = acx * abz - acz * abx;
			p.z = acy * abx - acx * aby;
			p.offset = ax * p.x + ay * p.y + az * p.z;
			p = p.next;
			abx = bx - observerX;
			aby = by - observerY;
			abz = bz - observerZ;
			acx = cx - observerX;
			acy = cy - observerY;
			acz = cz - observerZ;
			p.x = acz * aby - acy * abz;
			p.y = acx * abz - acz * abx;
			p.z = acy * abx - acx * aby;
			p.offset = bx * p.x + by * p.y + bz * p.z;
			p = p.next;
			abx = cx - observerX;
			aby = cy - observerY;
			abz = cz - observerZ;
			acx = ax - observerX;
			acy = ay - observerY;
			acz = az - observerZ;
			p.x = acz * aby - acy * abz;
			p.y = acx * abz - acz * abx;
			p.z = acy * abx - acx * aby;
			p.offset = cx * p.x + cy * p.y + cz * p.z;
			retFace = (altern_geom_ClipMacros().default).clipWithPlaneList(this.soupPlaneList,disposableFace);
			this.soupNegativeFace = retFace;
			if(retFace != null) {
				this.soupNegativeFace.next = this.soupFaceList;
				this.soupFaceList = this.soupNegativeFace;
				if(retFace.getArea() >= ofArea) {
					earlyOutFull = true;
					break;
				}
			}
			i += 3;
		}
		if(earlyOutFull) {
			var lastRetFace = null;
			retFace = this.soupFaceList;
			while(retFace != null) {
				retFace.destroy();
				lastRetFace = retFace;
				retFace = retFace.next;
			}
			lastRetFace.next = (altern_geom_Face().default).collector;
			(altern_geom_Face().default).collector = this.soupFaceList;
			return ofArea;
		}
		if(this.soupFaceList != null) {
			if(this.soupFaceList.next == null) {
				areaSubtracted = this.soupFaceList.getArea();
				var _this = this.soupFaceList;
				_this.next = (altern_geom_Face().default).collector;
				(altern_geom_Face().default).collector = _this;
				this.soupFaceList = null;
				return areaSubtracted;
			} else {
				(altern_geom_ClipMacros().default).calculateFaceCoordinates(this.soupFaceList,this.targUp,this.targRight,this.targPos);
				areaSubtracted = this.disposeGetTotalArea(this.soupFaceList);
				return areaSubtracted;
			}
		}
		return areaSubtracted;
	}
	disposeGetTotalArea(faceList) {
		var accum = 0;
		var lastFace = null;
		var f = faceList;
		var p;
		var processList = null;
		var firstFace = null;
		var count = 0;
		f = faceList;
		while(f != null) {
			var fNext = f.next;
			f.next = null;
			p = fNext;
			while(p != null) {
				if((!f.visible || !p.visible) && f.overlapsOther2D(p)) {
					if(!f.visible) {
						f.visible = true;
						f.processNext = processList;
						processList = f;
						++count;
					}
					if(!p.visible) {
						p.visible = true;
						p.processNext = processList;
						processList = p;
					}
				}
				p = p.next;
			}
			if(!f.visible) {
				accum += f.getArea();
				f.destroy();
				if(firstFace == null) {
					firstFace = f;
				}
				lastFace = f;
			}
			f = fNext;
		}
		if(lastFace != null) {
			lastFace.next = (altern_geom_Face().default).collector;
			(altern_geom_Face().default).collector = firstFace;
		}
		var retFace;
		if(processList != null && processList.processNext.processNext == null) {
			accum += processList.getArea() + processList.processNext.getArea();
			retFace = (altern_geom_ClipMacros().default).getOverlapClipFace(processList,processList.processNext);
			accum -= retFace != null ? retFace.getArea() : 0;
			var _this = processList.processNext;
			_this.next = (altern_geom_Face().default).collector;
			(altern_geom_Face().default).collector = _this;
			processList.next = (altern_geom_Face().default).collector;
			(altern_geom_Face().default).collector = processList;
			processList.processNext.destroy();
			processList.destroy();
			return accum;
		}
		var retFaceList;
		var newList = null;
		var d = 0;
		var w;
		var v;
		var lastP;
		var delauneyId = ++(altern_geom_ClipMacros().default).transformId;
		f = processList;
		while(f != null) {
			retFaceList = null;
			var processNext = f.processNext;
			lastP = null;
			f.next = newList;
			newList = f;
			p = processNext;
			while(p != null) {
				if(f.overlapsOther2D(p)) {
					retFace = (altern_geom_ClipMacros().default).getOverlapClipFace(f,p);
					if(retFace != null) {
						lastP = p;
						retFace.next = retFaceList;
						retFaceList = retFace;
					}
				}
				p = p.processNext;
			}
			if(retFaceList != null) {
				p = retFaceList;
				while(p != null) {
					w = p.wrapper;
					while(w != null) {
						v = w.vertex;
						if(v.transformId != delauneyId) {
							this.delaunatorPts[d++] = [v.cameraX,v.cameraY];
							v.transformId = delauneyId;
						}
						w = w.next;
					}
					p = p.next;
				}
			}
			f = processNext;
		}
		p = newList;
		while(p != null) {
			w = p.wrapper;
			while(w != null) {
				v = w.vertex;
				if(v.transformId != delauneyId) {
					this.delaunatorPts[d++] = [v.cameraX,v.cameraY];
					v.transformId = delauneyId;
				}
				w = w.next;
			}
			p = p.next;
		}
		this.delaunatorPts.length = d;
		if(newList != null) {
			var delaunator = Delaunator.from(this.delaunatorPts);
			var triangles = delaunator.triangles;
			var i = 0;
			while(i < triangles.length) {
				var ax;
				var ay;
				var bx;
				var by;
				var cx;
				var cy;
				ax = this.delaunatorPts[triangles[i]][0];
				ay = this.delaunatorPts[triangles[i]][1];
				bx = this.delaunatorPts[triangles[i + 1]][0];
				by = this.delaunatorPts[triangles[i + 1]][1];
				cx = this.delaunatorPts[triangles[i + 2]][0];
				cy = this.delaunatorPts[triangles[i + 2]][1];
				var centerX = (ax + bx + cx) / 3;
				var centerY = (ay + by + cy) / 3;
				f = newList;
				var inside = false;
				while(f != null) {
					if(f.isPointInside2D(centerX,centerY)) {
						inside = true;
						break;
					}
					f = f.next;
				}
				if(inside) {
					accum += Math.abs(0.5 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)));
				}
				i += 3;
			}
			p = newList;
			while(p != null) {
				p.destroy();
				lastFace = p;
				p = p.next;
			}
			lastFace.next = (altern_geom_Face().default).collector;
			(altern_geom_Face().default).collector = newList;
		}
		return accum;
	}
	static get IDENTITY() { return IDENTITY; }
	static set IDENTITY(value) { IDENTITY = value; }
	static get PRIORITY_CONCEALMENT() { return PRIORITY_CONCEALMENT; }
	static set PRIORITY_CONCEALMENT(value) { PRIORITY_CONCEALMENT = value; }
	static get PRIORITY_COVER() { return PRIORITY_COVER; }
	static set PRIORITY_COVER(value) { PRIORITY_COVER = value; }
}


// Meta

TargetBoardTester.__name__ = ["altern","culling","TargetBoardTester"];
TargetBoardTester.prototype.__class__ = TargetBoardTester.prototype.constructor = $hxClasses["altern.culling.TargetBoardTester"] = TargetBoardTester;

// Init



// Statics

var IDENTITY = new (components_Transform3D().default)();
var PRIORITY_CONCEALMENT = 0;
var PRIORITY_COVER = 1;

// Export

exports.default = TargetBoardTester;