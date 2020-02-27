// Class: altern.culling.CullingDFS

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function components_BoundBox() {return require("./../../components/BoundBox");}

// Constructor

class CullingDFS {
	constructor() {
		this._aabb = new (components_BoundBox().default)();
		this.initialCulling = 63;
		this.dfsStackCulling = [];
		this.dfsStack = [];
	}
	purge() {
		this.dfsStack.length = 0;
		this.dfsStackCulling.length = 0;
	}
	start() {
		var di = 0;
		this.dfsStack[di] = this.root;
		this.dfsStackCulling[di] = this.initialCulling;
		++di;
		while(--di >= 0) {
			var obj = this.dfsStack[di];
			var culling = this.dfsStackCulling[di];
			if(obj.worldToLocalTransform == null) {
				obj.calculateLocalWorldTransforms();
			}
			var t = obj.worldToLocalTransform;
			if(this.processWorldToLocal != null) {
				this.processWorldToLocal(t,obj);
			}
			if(this.checkBoundBox != null && obj.boundBox != null) {
				var aabb = this._aabb;
				var refAABB = obj.boundBox;
				aabb.minX = refAABB.minX;
				aabb.minY = refAABB.minY;
				aabb.minZ = refAABB.minZ;
				aabb.maxX = refAABB.maxX;
				aabb.maxY = refAABB.maxY;
				aabb.maxZ = refAABB.maxZ;
				var aabb1 = this._aabb;
				var t1 = obj.localToWorldTransform;
				var minX = aabb1.minX;
				var minY = aabb1.minY;
				var minZ = aabb1.minZ;
				var maxX = aabb1.maxX;
				var maxY = aabb1.maxY;
				var maxZ = aabb1.maxZ;
				aabb1.minX = 1.7976931348623157e+308;
				aabb1.minY = 1.7976931348623157e+308;
				aabb1.minZ = 1.7976931348623157e+308;
				aabb1.maxX = -1.7976931348623157e+308;
				aabb1.maxY = -1.7976931348623157e+308;
				aabb1.maxZ = -1.7976931348623157e+308;
				var x = minX;
				var y = minY;
				var z = minZ;
				var ex;
				var ey;
				var ez;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				x = maxX;
				y = minY;
				z = minZ;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				x = minX;
				y = maxY;
				z = minZ;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				x = minX;
				y = minY;
				z = maxZ;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				x = aabb1.maxX;
				y = aabb1.maxY;
				z = aabb1.minZ;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				x = minX;
				y = maxY;
				z = maxZ;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				x = maxX;
				y = minY;
				z = maxZ;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				x = aabb1.maxX;
				y = aabb1.maxY;
				z = aabb1.maxZ;
				ex = x * t1.a + y * t1.b + z * t1.c + t1.d;
				ey = x * t1.e + y * t1.f + z * t1.g + t1.h;
				ez = x * t1.i + y * t1.j + z * t1.k + t1.l;
				if(ex < aabb1.minX) {
					aabb1.minX = ex;
				}
				if(ey < aabb1.minY) {
					aabb1.minY = ey;
				}
				if(ez < aabb1.minZ) {
					aabb1.minZ = ez;
				}
				if(ex > aabb1.maxX) {
					aabb1.maxX = ex;
				}
				if(ey > aabb1.maxY) {
					aabb1.maxY = ey;
				}
				if(ez > aabb1.maxZ) {
					aabb1.maxZ = ez;
				}
				culling = this.checkBoundBox(this._aabb,culling,obj);
			} else {
				culling = 0;
			}
			if(culling >= 0) {
				var c = obj.childrenList;
				while(c != null) {
					if(this.checkChild == null || this.checkChild(c,culling)) {
						this.dfsStack[di] = c;
						this.dfsStackCulling[di] = culling;
						++di;
					}
					c = c.next;
				}
				t = obj.localToWorldTransform;
				if(this.processLocalToWorld != null) {
					this.processLocalToWorld(t,obj);
				}
				if(this.processChild != null) {
					if(!this.processChild(obj,culling)) {
						return false;
					}
				}
			}
		}
		return true;
	}
}


// Meta

CullingDFS.__name__ = ["altern","culling","CullingDFS"];
CullingDFS.prototype.__class__ = CullingDFS.prototype.constructor = $hxClasses["altern.culling.CullingDFS"] = CullingDFS;

// Init



// Statics



// Export

exports.default = CullingDFS;