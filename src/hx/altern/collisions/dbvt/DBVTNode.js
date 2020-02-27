// Class: altern.collisions.dbvt.DBVTNode

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function altern_collisions_dbvt_DBVTProxy() {return require("./../../../altern/collisions/dbvt/DBVTProxy");}
function js_Boot() {return require("./../../../js/Boot");}
function systems_collisions_ITCollidable() {return require("./../../../systems/collisions/ITCollidable");}
function altern_ray_IRaycastImpl() {return require("./../../../altern/ray/IRaycastImpl");}
function components_Transform3D() {return require("./../../../components/Transform3D");}
function altern_collisions_dbvt__$AbstractAABB_AbstractAABB_$Impl_$() {return require("./../../../altern/collisions/dbvt/_AbstractAABB/AbstractAABB_Impl_");}

// Constructor

class DBVTNode {
	constructor() {
		this.aabb = (altern_collisions_dbvt__$AbstractAABB_AbstractAABB_$Impl_$().default)._new();
	}
	static createFrom(obj,aabb,transform) {
		var node = new DBVTNode();
		var me = new (altern_collisions_dbvt_DBVTProxy().default)();
		var this1 = node.aabb;
		this1.minX = aabb.minX;
		this1.minY = aabb.minY;
		this1.minZ = aabb.minZ;
		this1.maxX = aabb.maxX;
		this1.maxY = aabb.maxY;
		this1.maxZ = aabb.maxZ;
		me.collidable = (js_Boot().default).__instanceof(obj,(systems_collisions_ITCollidable().default)) ? obj : null;
		me.raycastable = (js_Boot().default).__instanceof(obj,(altern_ray_IRaycastImpl().default)) ? obj : null;
		if(transform != null) {
			me.transform = transform;
			me.inverseTransform = new (components_Transform3D().default)();
			me.inverseTransform.calculateInversion(transform);
			me.localToGlobalTransform = new (components_Transform3D().default)();
			me.globalToLocalTransform = new (components_Transform3D().default)();
		}
		node.proxy = me;
		return node;
	}
}


// Meta

DBVTNode.__name__ = ["altern","collisions","dbvt","DBVTNode"];
DBVTNode.prototype.__class__ = DBVTNode.prototype.constructor = $hxClasses["altern.collisions.dbvt.DBVTNode"] = DBVTNode;

// Init



// Statics



// Export

exports.default = DBVTNode;