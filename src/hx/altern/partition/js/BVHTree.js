// Class: altern.partition.js.BVHTree

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function altern_culling_IFrustumCollectTri() {return require("./../../../altern/culling/IFrustumCollectTri");}
function altern_ray_IRaycastImpl() {return require("./../../../altern/ray/IRaycastImpl");}
function systems_collisions_ITCollidable() {return require("./../../../systems/collisions/ITCollidable");}
function altern_culling_DefaultCulling() {return require("./../../../altern/culling/DefaultCulling");}
function altern_geom_Face() {return require("./../../../altern/geom/Face");}
function util_geom_Geometry() {return require("./../../../util/geom/Geometry");}
function jeash_geom_Vector3D() {return require("./../../../jeash/geom/Vector3D");}

// Constructor

class BVHTree {
	constructor(bvh) {
		this.aabbTriCount = 0;
		this.aabbTris = new Int32Array(64);
		this._stackCulling = [];
		this._stack = [];
		this.geom = new (util_geom_Geometry().default)();
		this._result = new (jeash_geom_Vector3D().default)();
		this.bvh = bvh;
	}
	setBufferAlloc(amt) {
		this.aabbTris = new Int32Array(amt);
	}
	collectGeometryFromAABB(aabb) {
		var s = 0;
		var stack = this._stack;
		stack[s++] = this.bvh._rootNode;
		var bboxArray = this.bvh._bboxArray;
		var triArray = this.bvh._trianglesArray;
		this.geom.numIndices = 0;
		this.geom.numVertices = 0;
		var ii = 0;
		var vi = 0;
		this.aabbTriCount = 0;
		while(--s >= 0) {
			var node = stack[s];
			if(!(aabb.maxX < node._extentsMin.x || aabb.maxY < node._extentsMin.y || aabb.maxZ < node._extentsMin.z || aabb.minX > node._extentsMax.x || aabb.minY > node._extentsMax.y || aabb.minZ > node._extentsMax.z)) {
				if(node._node0 != null) {
					stack[s++] = node._node0;
				}
				if(node._node1 != null) {
					stack[s++] = node._node1;
				}
				var _g1 = node._startIndex;
				var _g = node._endIndex;
				while(_g1 < _g) {
					var i = _g1++;
					var triIndex = bboxArray[i * 7];
					this.aabbTris[this.aabbTriCount++] = triIndex;
					triIndex *= 9;
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.indices[ii] = ii++;
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.indices[ii] = ii++;
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.indices[ii] = ii++;
				}
			}
		}
		if(ii > 0) {
			this.geom.numVertices = this.geom.numIndices = ii;
		}
		return this.geom;
	}
	collectGeometryAndTransforms(collider,baseTransform) {
		var s = 0;
		var stack = this._stack;
		stack[s++] = this.bvh._rootNode;
		var bboxArray = this.bvh._bboxArray;
		var triArray = this.bvh._trianglesArray;
		this.geom.numIndices = 0;
		this.geom.numVertices = 0;
		var ii = 0;
		var vi = 0;
		while(--s >= 0) {
			var node = stack[s];
			var sphere = collider.sphere;
			if(sphere.x + sphere.w > node._extentsMin.x && sphere.x - sphere.w < node._extentsMax.x && sphere.y + sphere.w > node._extentsMin.y && sphere.y - sphere.w < node._extentsMax.y && sphere.z + sphere.w > node._extentsMin.z && sphere.z - sphere.w < node._extentsMax.z) {
				if(node._node0 != null) {
					stack[s++] = node._node0;
				}
				if(node._node1 != null) {
					stack[s++] = node._node1;
				}
				var _g1 = node._startIndex;
				var _g = node._endIndex;
				while(_g1 < _g) {
					var i = _g1++;
					var triIndex = bboxArray[i * 7];
					triIndex *= 9;
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.indices[ii] = ii++;
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.indices[ii] = ii++;
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.vertices[vi++] = triArray[triIndex++];
					this.geom.indices[ii] = ii++;
				}
			}
		}
		if(ii > 0) {
			this.geom.numVertices = this.geom.numIndices = ii;
			collider.geometries[collider.numGeometries] = this.geom;
			collider.transforms[collider.numGeometries] = baseTransform;
			collider.numGeometries++;
		}
	}
	purge() {
		this._stack.length = 0;
	}
	intersectRay(origin,direction,output) {
		var res = this.bvh.intersectRay(origin,direction,true);
		if(res != null && res.length != 0) {
			var directionLength = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
			var highestResult = null;
			var cd = direction.w != 0 ? direction.w : 1e+22;
			cd *= cd;
			var _g1 = 0;
			var _g = res.length;
			while(_g1 < _g) {
				var i = _g1++;
				var r = res[i];
				var dx = r.intersectionPoint.x - origin.x;
				var dy = r.intersectionPoint.y - origin.y;
				var dz = r.intersectionPoint.z - origin.z;
				var d = dx * dx + dy * dy + dz * dz;
				if(d <= cd) {
					highestResult = r;
					cd = d;
				}
			}
			if(highestResult != null) {
				this._result.x = highestResult.intersectionPoint.x;
				this._result.y = highestResult.intersectionPoint.y;
				this._result.z = highestResult.intersectionPoint.z;
				this._result.w = Math.sqrt(cd) / directionLength;
				this.allResults = res;
				this.lastResult = highestResult;
				return this._result;
			}
		}
		return null;
	}
	collectTrisForFrustum(frustum,culling,frustumCorners,vertices,indices) {
		var vi = vertices.length;
		var ii = indices.length;
		var s = 0;
		var stack = this._stack;
		var stackCulling = this._stackCulling;
		stack[s] = this.bvh._rootNode;
		stackCulling[s] = culling;
		++s;
		var bboxArray = this.bvh._bboxArray;
		var triArray = this.bvh._trianglesArray;
		this.geom.numIndices = 0;
		this.geom.numVertices = 0;
		this.aabbTriCount = 0;
		while(--s >= 0) {
			var node = stack[s];
			var nodeCulling = stackCulling[s];
			nodeCulling = (altern_culling_DefaultCulling().default).cullingInFrustumOf(frustum,nodeCulling,node._extentsMin.x,node._extentsMin.y,node._extentsMin.z,node._extentsMax.x,node._extentsMax.y,node._extentsMax.z);
			if(nodeCulling >= 0) {
				if(node._node0 != null) {
					stack[s] = node._node0;
					stackCulling[s] = nodeCulling;
					++s;
				}
				if(node._node1 != null) {
					stack[s] = node._node1;
					stackCulling[s] = nodeCulling;
					++s;
				}
				var _g1 = node._startIndex;
				var _g = node._endIndex;
				while(_g1 < _g) {
					var i = _g1++;
					var triIndex = bboxArray[i * 7];
					triIndex *= 9;
					var ax = triArray[triIndex++];
					var ay = triArray[triIndex++];
					var az = triArray[triIndex++];
					var bx = triArray[triIndex++];
					var by = triArray[triIndex++];
					var bz = triArray[triIndex++];
					var cx = triArray[triIndex++];
					var cy = triArray[triIndex++];
					var cz = triArray[triIndex++];
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
							vertices[vi++] = ay;
							vertices[vi++] = az;
							indices[ii] = ii++;
							vertices[vi++] = bx;
							vertices[vi++] = by;
							vertices[vi++] = bz;
							indices[ii] = ii++;
							vertices[vi++] = cx;
							vertices[vi++] = cy;
							vertices[vi++] = cz;
							indices[ii] = ii++;
						} else {
							var w;
							var f;
							var a;
							var wn;
							var b;
							var c;
							f = (altern_culling_DefaultCulling().default).clippedFace;
							if((triFrustumCover & 1) != 0 && f != null) {
								a = f.wrapper.vertex;
								w = f.wrapper.next;
								wn = w.next;
								while(wn != null) {
									b = w.vertex;
									c = wn.vertex;
									vertices[vi++] = a.x;
									vertices[vi++] = a.y;
									vertices[vi++] = a.z;
									indices[ii] = ii++;
									vertices[vi++] = b.x;
									vertices[vi++] = b.y;
									vertices[vi++] = b.z;
									indices[ii] = ii++;
									vertices[vi++] = c.x;
									vertices[vi++] = c.y;
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
									vertices[vi++] = a.y;
									vertices[vi++] = a.z;
									indices[ii] = ii++;
									vertices[vi++] = b.x;
									vertices[vi++] = b.y;
									vertices[vi++] = b.z;
									indices[ii] = ii++;
									vertices[vi++] = c.x;
									vertices[vi++] = c.y;
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
				}
			}
		}
	}
	static get FLOAT_MAX() { return FLOAT_MAX; }
	static set FLOAT_MAX(value) { FLOAT_MAX = value; }
}


// Meta

BVHTree.__name__ = ["altern","partition","js","BVHTree"];
BVHTree.__interfaces__ = [(altern_culling_IFrustumCollectTri().default),(altern_ray_IRaycastImpl().default),(systems_collisions_ITCollidable().default)];
BVHTree.prototype.__class__ = BVHTree.prototype.constructor = $hxClasses["altern.partition.js.BVHTree"] = BVHTree;

// Init



// Statics

var FLOAT_MAX = 3.40282346638528e+38;

// Export

exports.default = BVHTree;