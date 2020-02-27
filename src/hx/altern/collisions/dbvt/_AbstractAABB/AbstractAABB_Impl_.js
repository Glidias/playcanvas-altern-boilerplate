// Class: altern.collisions.dbvt._AbstractAABB.AbstractAABB_Impl_

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../../hxClasses_stub").default;
var $import = require("./../../../../import_stub").default;
function components_BoundBox() {return require("./../../../../components/BoundBox");}

// Constructor

class AbstractAABB_Impl_ {
	constructor(){}
	static get_minX(this1) {
		return this1.minX;
	}
	static get_minY(this1) {
		return this1.minY;
	}
	static get_minZ(this1) {
		return this1.minZ;
	}
	static get_maxX(this1) {
		return this1.maxX;
	}
	static get_maxY(this1) {
		return this1.maxY;
	}
	static get_maxZ(this1) {
		return this1.maxZ;
	}
	static _new(minX,maxX,minY,maxY,minZ,maxZ) {
		if(maxZ == null) {
			maxZ = 0;
		}
		if(minZ == null) {
			minZ = 0;
		}
		if(maxY == null) {
			maxY = 0;
		}
		if(minY == null) {
			minY = 0;
		}
		if(maxX == null) {
			maxX = 0;
		}
		if(minX == null) {
			minX = 0;
		}
		var this1;
		var b = new (components_BoundBox().default)();
		b.minX = minX;
		b.maxX = maxX;
		b.minY = minY;
		b.maxY = maxY;
		b.minZ = minZ;
		b.maxZ = maxZ;
		this1 = b;
		return this1;
	}
	static init(this1,minX,maxX,minY,maxY,minZ,maxZ) {
		if(maxZ == null) {
			maxZ = 0;
		}
		if(minZ == null) {
			minZ = 0;
		}
		if(maxY == null) {
			maxY = 0;
		}
		if(minY == null) {
			minY = 0;
		}
		if(maxX == null) {
			maxX = 0;
		}
		if(minX == null) {
			minX = 0;
		}
		this1.minX = minX;
		this1.maxX = maxX;
		this1.minY = minY;
		this1.maxY = maxY;
		this1.minZ = minZ;
		this1.maxZ = maxZ;
	}
	static combine(this1,aabb1,aabb2) {
		if(aabb1.minX < aabb2.minX) {
			this1.minX = aabb1.minX;
		} else {
			this1.minX = aabb2.minX;
		}
		if(aabb1.maxX > aabb2.maxX) {
			this1.maxX = aabb1.maxX;
		} else {
			this1.maxX = aabb2.maxX;
		}
		if(aabb1.minY < aabb2.minY) {
			this1.minY = aabb1.minY;
		} else {
			this1.minY = aabb2.minY;
		}
		if(aabb1.maxY > aabb2.maxY) {
			this1.maxY = aabb1.maxY;
		} else {
			this1.maxY = aabb2.maxY;
		}
		if(aabb1.minZ < aabb2.minZ) {
			this1.minZ = aabb1.minZ;
		} else {
			this1.minZ = aabb2.minZ;
		}
		if(aabb1.maxZ > aabb2.maxZ) {
			this1.maxZ = aabb1.maxZ;
		} else {
			this1.maxZ = aabb2.maxZ;
		}
		var margin = 0;
		this1.minX -= margin;
		this1.minY -= margin;
		this1.minZ -= margin;
		this1.maxX += margin;
		this1.maxY += margin;
		this1.maxZ += margin;
	}
	static matchWith(this1,aabb) {
		this1.minX = aabb.minX;
		this1.minY = aabb.minY;
		this1.minZ = aabb.minZ;
		this1.maxX = aabb.maxX;
		this1.maxY = aabb.maxY;
		this1.maxZ = aabb.maxZ;
	}
	static surfaceArea(this1) {
		var h = this1.maxY - this1.minY;
		var d = this1.maxZ - this1.minZ;
		return 2 * ((this1.maxX - this1.minX) * (h + d) + h * d);
	}
	static intersectsWithPoint(this1,x,y,z) {
		if(x >= this1.minX && x <= this1.maxX && y >= this1.minY && y <= this1.maxY && z >= this1.minZ) {
			return z <= this1.maxZ;
		} else {
			return false;
		}
	}
}


// Meta

AbstractAABB_Impl_.__name__ = ["altern","collisions","dbvt","_AbstractAABB","AbstractAABB_Impl_"];
AbstractAABB_Impl_.prototype.__class__ = AbstractAABB_Impl_.prototype.constructor = $hxClasses["altern.collisions.dbvt._AbstractAABB.AbstractAABB_Impl_"] = AbstractAABB_Impl_;

// Init



// Statics



// Export

exports.default = AbstractAABB_Impl_;