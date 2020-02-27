// Class: util.geom.GeomCollisionSceneUtil

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function components_Transform3D() {return require("./../../components/Transform3D");}
function components_BoundBox() {return require("./../../components/BoundBox");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}

// Constructor

class GeomCollisionSceneUtil {
	constructor(){}
	static get toRootTransform() { return toRootTransform; }
	static set toRootTransform(value) { toRootTransform = value; }
	static get fromRootTransform() { return fromRootTransform; }
	static set fromRootTransform(value) { fromRootTransform = value; }
	static calculateHierarchyBoundBox(object,boundBoxSpace,result) {
		if(result == null) {
			result = new (components_BoundBox().default)();
		}
		if(boundBoxSpace != null && object != boundBoxSpace) {
			var objectRoot;
			var toSpaceTransform = null;
			GeomCollisionSceneUtil.toRootTransform.copy(object.transform);
			var root = object;
			while(root._parent != null) {
				root = root._parent;
				GeomCollisionSceneUtil.toRootTransform.append(root.transform);
				if(root == boundBoxSpace) {
					toSpaceTransform = GeomCollisionSceneUtil.toRootTransform;
				}
			}
			objectRoot = root;
			if(toSpaceTransform == null) {
				GeomCollisionSceneUtil.fromRootTransform.copy(boundBoxSpace.inverseTransform);
				root = boundBoxSpace;
				while(root._parent != null) {
					root = root._parent;
					GeomCollisionSceneUtil.fromRootTransform.prepend(root.inverseTransform);
				}
				if(objectRoot == root) {
					GeomCollisionSceneUtil.toRootTransform.append(GeomCollisionSceneUtil.fromRootTransform);
					toSpaceTransform = GeomCollisionSceneUtil.toRootTransform;
				} else {
					throw new (js__$Boot_HaxeError().default)("Object and boundBoxSpace must be located in the same hierarchy.");
				}
			}
			GeomCollisionSceneUtil.updateBoundBoxHierarchically(object,result,toSpaceTransform);
		} else {
			GeomCollisionSceneUtil.updateBoundBoxHierarchically(object,result);
		}
		return result;
	}
	static transformBounds(bounds,t) {
		var x;
		var y;
		var z;
		x = bounds.minX;
		y = bounds.minY;
		z = bounds.minZ;
		bounds.minX = t.a * x + t.b * y + t.c * z + t.d;
		bounds.minY = t.e * x + t.f * y + t.g * z + t.h;
		bounds.minZ = t.i * x + t.j * y + t.k * z + t.l;
		x = bounds.maxX;
		y = bounds.maxY;
		z = bounds.maxZ;
		bounds.maxX = t.a * x + t.b * y + t.c * z + t.d;
		bounds.maxY = t.e * x + t.f * y + t.g * z + t.h;
		bounds.maxZ = t.i * x + t.j * y + t.k * z + t.l;
	}
	static updateBounds(boundBox,tBounds) {
		if(tBounds.minX < boundBox.minX) {
			boundBox.minX = tBounds.minX;
		}
		if(tBounds.maxX > boundBox.maxX) {
			boundBox.maxX = tBounds.maxX;
		}
		if(tBounds.minY < boundBox.minY) {
			boundBox.minY = tBounds.minY;
		}
		if(tBounds.maxY > boundBox.maxY) {
			boundBox.maxY = tBounds.maxY;
		}
		if(tBounds.minZ < boundBox.minZ) {
			boundBox.minZ = tBounds.minZ;
		}
		if(tBounds.maxZ > boundBox.maxZ) {
			boundBox.maxZ = tBounds.maxZ;
		}
	}
	static updateBoundBoxHierarchically(object,boundBox,transform) {
		if(object.boundBox != null) {
			var tBounds = object.boundBox;
			if(tBounds.minX < boundBox.minX) {
				boundBox.minX = tBounds.minX;
			}
			if(tBounds.maxX > boundBox.maxX) {
				boundBox.maxX = tBounds.maxX;
			}
			if(tBounds.minY < boundBox.minY) {
				boundBox.minY = tBounds.minY;
			}
			if(tBounds.maxY > boundBox.maxY) {
				boundBox.maxY = tBounds.maxY;
			}
			if(tBounds.minZ < boundBox.minZ) {
				boundBox.minZ = tBounds.minZ;
			}
			if(tBounds.maxZ > boundBox.maxZ) {
				boundBox.maxZ = tBounds.maxZ;
			}
		}
		var child = object.childrenList;
		while(child != null) {
			child.localToGlobalTransform.copy(child.transform);
			if(transform != null) {
				child.localToGlobalTransform.append(transform);
			}
			GeomCollisionSceneUtil.updateBoundBoxHierarchically(child,boundBox,child.localToGlobalTransform);
			child = child.next;
		}
	}
}


// Meta

GeomCollisionSceneUtil.__name__ = ["util","geom","GeomCollisionSceneUtil"];
GeomCollisionSceneUtil.prototype.__class__ = GeomCollisionSceneUtil.prototype.constructor = $hxClasses["util.geom.GeomCollisionSceneUtil"] = GeomCollisionSceneUtil;

// Init



// Statics

var toRootTransform = new (components_Transform3D().default)();
var fromRootTransform = new (components_Transform3D().default)();

// Export

exports.default = GeomCollisionSceneUtil;