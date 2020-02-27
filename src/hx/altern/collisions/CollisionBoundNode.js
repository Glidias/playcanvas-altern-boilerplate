// Class: altern.collisions.CollisionBoundNode

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function systems_collisions_IECollidable() {return require("./../../systems/collisions/IECollidable");}
function components_Transform3D() {return require("./../../components/Transform3D");}
function jeash_geom_Vector3D() {return require("./../../jeash/geom/Vector3D");}
function util_geom_AABBUtils() {return require("./../../util/geom/AABBUtils");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function js_Boot() {return require("./../../js/Boot");}
function altern_ray_IRaycastImpl() {return require("./../../altern/ray/IRaycastImpl");}

// Constructor

class CollisionBoundNode {
	constructor() {
	}
	calculateLocalGlobalTransforms() {
		var trm = this.localToGlobalTransform;
		if(trm != null) {
			trm = trm;
		} else {
			trm = new (components_Transform3D().default)();
		}
		trm.copy(this.transform);
		var root = this;
		while(root._parent != null) {
			root = root._parent;
			trm.append(root.transform);
		}
		this.globalToLocalTransform.calculateInversion(this.localToGlobalTransform);
	}
	calculateLocalWorldTransforms() {
		if(this.worldToLocalTransform == null) {
			this.worldToLocalTransform = new (components_Transform3D().default)();
		}
		if(this.localToWorldTransform == null) {
			this.localToWorldTransform = new (components_Transform3D().default)();
		}
		var trm = this.localToWorldTransform;
		if(trm != null) {
			trm = trm;
		} else {
			trm = new (components_Transform3D().default)();
		}
		trm.copy(this.transform);
		var root = this;
		while(root._parent != null) {
			root = root._parent;
			trm.append(root.transform);
		}
		this.worldToLocalTransform.calculateInversion(this.localToWorldTransform);
	}
	mirrorClone() {
		var c = CollisionBoundNode.create(this.transform,this.inverseTransform);
		c.collidable = this.collidable;
		c.boundBox = this.boundBox;
		c.raycastable = this.raycastable;
		var child = this.childrenList;
		var lastChild = null;
		while(child != null) {
			var newChild = child.mirrorClone();
			if(c.childrenList != null) {
				lastChild.next = newChild;
			} else {
				c.childrenList = newChild;
			}
			lastChild = newChild;
			newChild._parent = c;
			child = child.next;
		}
		return c;
	}
	updateTransform(refTransform) {
		this.transform.copy(refTransform);
		this.inverseTransform.calculateInversion(this.transform);
	}
	collectGeometry(collider) {
		this.globalToLocalTransform.combine(this.inverseTransform,collider.matrix);
		collider.calculateSphere(this.globalToLocalTransform);
		this.localToGlobalTransform.combine(collider.inverseMatrix,this.transform);
		if(this.collidable != null) {
			this.collidable.collectGeometryAndTransforms(collider,this.localToGlobalTransform);
		}
		if(this.childrenList != null) {
			this.visitChildren(collider);
		}
	}
	intersectRay(origin,direction,output) {
		var minData = this.raycastable != null ? this.raycastable.intersectRay(origin,direction,output) : null;
		var minTime = minData != null ? minData.w : output.w != 0 ? output.w : direction.w != 0 ? direction.w : 1e22;
		var childOrigin = null;
		var childDirection = null;
		var child = this.childrenList;
		while(child != null) {
			if(childOrigin == null) {
				childOrigin = new (jeash_geom_Vector3D().default)();
				childDirection = new (jeash_geom_Vector3D().default)();
			}
			childOrigin.x = child.inverseTransform.a * origin.x + child.inverseTransform.b * origin.y + child.inverseTransform.c * origin.z + child.inverseTransform.d;
			childOrigin.y = child.inverseTransform.e * origin.x + child.inverseTransform.f * origin.y + child.inverseTransform.g * origin.z + child.inverseTransform.h;
			childOrigin.z = child.inverseTransform.i * origin.x + child.inverseTransform.j * origin.y + child.inverseTransform.k * origin.z + child.inverseTransform.l;
			childDirection.x = child.inverseTransform.a * direction.x + child.inverseTransform.b * direction.y + child.inverseTransform.c * direction.z;
			childDirection.y = child.inverseTransform.e * direction.x + child.inverseTransform.f * direction.y + child.inverseTransform.g * direction.z;
			childDirection.z = child.inverseTransform.i * direction.x + child.inverseTransform.j * direction.y + child.inverseTransform.k * direction.z;
			childDirection.w = direction.w != 0 ? Math.sqrt(childDirection.x * childDirection.x + childDirection.y * childDirection.y + childDirection.z * childDirection.z) / Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z) * direction.w : 1e22;
			if(child.boundBox != null && !(util_geom_AABBUtils().default).intersectRay(child.boundBox,childOrigin,childDirection)) {
				child = child.next;
				continue;
			}
			var data = child.intersectRay(childOrigin,childDirection,output);
			if(data != null && data.w < minTime) {
				minTime = data.w;
				minData = data;
			}
			child = child.next;
		}
		return minData;
	}
	visitChildren(collider) {
		var child = this.childrenList;
		while(child != null) {
			child.globalToLocalTransform.combine(child.inverseTransform,this.globalToLocalTransform);
			var intersects = true;
			collider.calculateSphere(child.globalToLocalTransform);
			if(child.boundBox != null) {
				var aabb = child.boundBox;
				var sphere = collider.sphere;
				if(sphere.x + sphere.w > aabb.minX && sphere.x - sphere.w < aabb.maxX && sphere.y + sphere.w > aabb.minY && sphere.y - sphere.w < aabb.maxY && sphere.z + sphere.w > aabb.minZ) {
					intersects = sphere.z - sphere.w < aabb.maxZ;
				} else {
					intersects = false;
				}
			}
			if(intersects) {
				child.localToGlobalTransform.combine(this.localToGlobalTransform,child.transform);
				if(child.collidable != null) {
					child.collidable.collectGeometryAndTransforms(collider,child.localToGlobalTransform);
				}
				if(child.childrenList != null) {
					child.visitChildren(collider);
				}
			}
			child = child.next;
		}
	}
	addChild(child) {
		if(child == null) {
			throw new (js__$Boot_HaxeError().default)("Parameter child must be non-null.");
		}
		if(child == this) {
			throw new (js__$Boot_HaxeError().default)("An object cannot be added as a child of itself.");
		}
		var container = this._parent;
		while(container != null) {
			if(container == child) {
				throw new (js__$Boot_HaxeError().default)("An object cannot be added as a child to one of it's children (or children's children, etc.).");
			}
			container = container._parent;
		}
		if(child._parent != this) {
			if(child._parent != null) {
				child._parent.removeChild(child);
			}
			this.addToList(child);
			child._parent = this;
		} else {
			child = this.removeFromList(child);
			if(child == null) {
				throw new (js__$Boot_HaxeError().default)("Cannot add child.");
			}
			this.addToList(child);
		}
		return child;
	}
	removeChild(child) {
		if(child == null) {
			throw new (js__$Boot_HaxeError().default)("Parameter child must be non-null.");
		}
		if(child._parent != this) {
			throw new (js__$Boot_HaxeError().default)("The supplied CollisionBoundNode must be a child of the caller.");
		}
		child = this.removeFromList(child);
		if(child == null) {
			throw new (js__$Boot_HaxeError().default)("Cannot remove child.");
		}
		child._parent = null;
		return child;
	}
	addToList(child,item) {
		child.next = item;
		if(item == this.childrenList) {
			this.childrenList = child;
		} else {
			var current = this.childrenList;
			while(current != null) {
				if(current.next == item) {
					current.next = child;
					break;
				}
				current = current.next;
			}
		}
	}
	removeFromList(child) {
		var prev = null;
		var current = this.childrenList;
		while(current != null) {
			if(current == child) {
				if(prev != null) {
					prev.next = current.next;
				} else {
					this.childrenList = current.next;
				}
				current.next = null;
				return child;
			}
			prev = current;
			current = current.next;
		}
		return null;
	}
	_prepend(child) {
		child.next = this.childrenList;
		this.childrenList = child;
		child._parent = this;
	}
	_removeHead() {
		var removed = this.childrenList;
		if(removed != null) {
			this.childrenList = removed.next;
		}
		removed._parent = null;
	}
	static calculateLocalToGlobal2(obj,trm) {
		if(trm != null) {
			trm = trm;
		} else {
			trm = new (components_Transform3D().default)();
		}
		trm.copy(obj.transform);
		var root = obj;
		while(root._parent != null) {
			root = root._parent;
			trm.append(root.transform);
		}
		return trm;
	}
	static calculateGlobalToLocal2(obj,trm) {
		if(trm != null) {
			trm = trm;
		} else {
			trm = new (components_Transform3D().default)();
		}
		trm.copy(obj.inverseTransform);
		var root = obj;
		while(root._parent != null) {
			root = root._parent;
			trm.prepend(root.inverseTransform);
		}
		return trm;
	}
	static create(transform,inverseTransform) {
		var n = new CollisionBoundNode();
		n.transform = transform;
		if(inverseTransform == null) {
			n.inverseTransform = new (components_Transform3D().default)();
			n.inverseTransform.calculateInversion(n.transform);
		} else {
			n.inverseTransform = inverseTransform;
		}
		n.localToGlobalTransform = new (components_Transform3D().default)();
		n.globalToLocalTransform = new (components_Transform3D().default)();
		return n;
	}
	static createNew(transform,inverseTransform,collidable,raycastable) {
		var n = CollisionBoundNode.create(transform != null ? transform : new (components_Transform3D().default)(),inverseTransform);
		n.collidable = collidable;
		n.raycastable = raycastable != null ? raycastable : (js_Boot().default).__instanceof(collidable,(altern_ray_IRaycastImpl().default)) ? collidable : null;
		return n;
	}
}


// Meta

CollisionBoundNode.__name__ = ["altern","collisions","CollisionBoundNode"];
CollisionBoundNode.__interfaces__ = [(systems_collisions_IECollidable().default)];
CollisionBoundNode.prototype.__class__ = CollisionBoundNode.prototype.constructor = $hxClasses["altern.collisions.CollisionBoundNode"] = CollisionBoundNode;

// Init



// Statics



// Export

exports.default = CollisionBoundNode;