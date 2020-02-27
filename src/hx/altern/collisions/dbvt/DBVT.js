// Class: altern.collisions.dbvt.DBVT

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function altern_ray_IRaycastImpl() {return require("./../../../altern/ray/IRaycastImpl");}
function systems_collisions_ITCollidable() {return require("./../../../systems/collisions/ITCollidable");}
function altern_collisions_dbvt_DBVTNode() {return require("./../../../altern/collisions/dbvt/DBVTNode");}
function util_geom_GeomUtil() {return require("./../../../util/geom/GeomUtil");}
function jeash_geom_Vector3D() {return require("./../../../jeash/geom/Vector3D");}
function altern_collisions_dbvt__$AbstractAABB_AbstractAABB_$Impl_$() {return require("./../../../altern/collisions/dbvt/_AbstractAABB/AbstractAABB_Impl_");}

// Constructor

class DBVT {
	constructor() {
		this._stack = [];
		this.freeNodes = [];
		this.numFreeNodes = 0;
		this.aabb = (altern_collisions_dbvt__$AbstractAABB_AbstractAABB_$Impl_$().default)._new();
	}
	purge() {
		this._stack.length = 0;
	}
	moveLeaf(leaf) {
		this.deleteLeaf(leaf);
		this.insertLeaf(leaf);
	}
	insertLeaf(leaf) {
		if(this.root == null) {
			this.root = leaf;
			return;
		}
		var lb = leaf.aabb;
		var sibling = this.root;
		var oldArea;
		var newArea;
		while(sibling.proxy == null) {
			var c1 = sibling.child1;
			var c2 = sibling.child2;
			var b = sibling.aabb;
			var c1b = c1.aabb;
			var c2b = c2.aabb;
			var h = b.maxY - b.minY;
			var d = b.maxZ - b.minZ;
			oldArea = 2 * ((b.maxX - b.minX) * (h + d) + h * d);
			var this1 = this.aabb;
			if(lb.minX < b.minX) {
				this1.minX = lb.minX;
			} else {
				this1.minX = b.minX;
			}
			if(lb.maxX > b.maxX) {
				this1.maxX = lb.maxX;
			} else {
				this1.maxX = b.maxX;
			}
			if(lb.minY < b.minY) {
				this1.minY = lb.minY;
			} else {
				this1.minY = b.minY;
			}
			if(lb.maxY > b.maxY) {
				this1.maxY = lb.maxY;
			} else {
				this1.maxY = b.maxY;
			}
			if(lb.minZ < b.minZ) {
				this1.minZ = lb.minZ;
			} else {
				this1.minZ = b.minZ;
			}
			if(lb.maxZ > b.maxZ) {
				this1.maxZ = lb.maxZ;
			} else {
				this1.maxZ = b.maxZ;
			}
			var margin = 0;
			this1.minX -= margin;
			this1.minY -= margin;
			this1.minZ -= margin;
			this1.maxX += margin;
			this1.maxY += margin;
			this1.maxZ += margin;
			var this2 = this.aabb;
			var h1 = this2.maxY - this2.minY;
			var d1 = this2.maxZ - this2.minZ;
			newArea = 2 * ((this2.maxX - this2.minX) * (h1 + d1) + h1 * d1);
			var creatingCost = newArea * 2;
			var incrementalCost = (newArea - oldArea) * 2;
			var discendingCost1 = incrementalCost;
			var this3 = this.aabb;
			if(lb.minX < c1b.minX) {
				this3.minX = lb.minX;
			} else {
				this3.minX = c1b.minX;
			}
			if(lb.maxX > c1b.maxX) {
				this3.maxX = lb.maxX;
			} else {
				this3.maxX = c1b.maxX;
			}
			if(lb.minY < c1b.minY) {
				this3.minY = lb.minY;
			} else {
				this3.minY = c1b.minY;
			}
			if(lb.maxY > c1b.maxY) {
				this3.maxY = lb.maxY;
			} else {
				this3.maxY = c1b.maxY;
			}
			if(lb.minZ < c1b.minZ) {
				this3.minZ = lb.minZ;
			} else {
				this3.minZ = c1b.minZ;
			}
			if(lb.maxZ > c1b.maxZ) {
				this3.maxZ = lb.maxZ;
			} else {
				this3.maxZ = c1b.maxZ;
			}
			var margin1 = 0;
			this3.minX -= margin1;
			this3.minY -= margin1;
			this3.minZ -= margin1;
			this3.maxX += margin1;
			this3.maxY += margin1;
			this3.maxZ += margin1;
			if(c1.proxy != null) {
				var this4 = this.aabb;
				var h2 = this4.maxY - this4.minY;
				var d2 = this4.maxZ - this4.minZ;
				discendingCost1 += 2 * ((this4.maxX - this4.minX) * (h2 + d2) + h2 * d2);
			} else {
				var this5 = this.aabb;
				var h3 = this5.maxY - this5.minY;
				var d3 = this5.maxZ - this5.minZ;
				var h4 = c1b.maxY - c1b.minY;
				var d4 = c1b.maxZ - c1b.minZ;
				discendingCost1 += 2 * ((this5.maxX - this5.minX) * (h3 + d3) + h3 * d3) - 2 * ((c1b.maxX - c1b.minX) * (h4 + d4) + h4 * d4);
			}
			var discendingCost2 = incrementalCost;
			var this6 = this.aabb;
			if(lb.minX < c2b.minX) {
				this6.minX = lb.minX;
			} else {
				this6.minX = c2b.minX;
			}
			if(lb.maxX > c2b.maxX) {
				this6.maxX = lb.maxX;
			} else {
				this6.maxX = c2b.maxX;
			}
			if(lb.minY < c2b.minY) {
				this6.minY = lb.minY;
			} else {
				this6.minY = c2b.minY;
			}
			if(lb.maxY > c2b.maxY) {
				this6.maxY = lb.maxY;
			} else {
				this6.maxY = c2b.maxY;
			}
			if(lb.minZ < c2b.minZ) {
				this6.minZ = lb.minZ;
			} else {
				this6.minZ = c2b.minZ;
			}
			if(lb.maxZ > c2b.maxZ) {
				this6.maxZ = lb.maxZ;
			} else {
				this6.maxZ = c2b.maxZ;
			}
			var margin2 = 0;
			this6.minX -= margin2;
			this6.minY -= margin2;
			this6.minZ -= margin2;
			this6.maxX += margin2;
			this6.maxY += margin2;
			this6.maxZ += margin2;
			if(c2.proxy != null) {
				var this7 = this.aabb;
				var h5 = this7.maxY - this7.minY;
				var d5 = this7.maxZ - this7.minZ;
				discendingCost2 += 2 * ((this7.maxX - this7.minX) * (h5 + d5) + h5 * d5);
			} else {
				var this8 = this.aabb;
				var h6 = this8.maxY - this8.minY;
				var d6 = this8.maxZ - this8.minZ;
				var h7 = c2b.maxY - c2b.minY;
				var d7 = c2b.maxZ - c2b.minZ;
				discendingCost2 += 2 * ((this8.maxX - this8.minX) * (h6 + d6) + h6 * d6) - 2 * ((c2b.maxX - c2b.minX) * (h7 + d7) + h7 * d7);
			}
			if(discendingCost1 < discendingCost2) {
				if(creatingCost < discendingCost1) {
					break;
				} else {
					sibling = c1;
				}
			} else if(creatingCost < discendingCost2) {
				break;
			} else {
				sibling = c2;
			}
		}
		var oldParent = sibling.parent;
		var newParent;
		if(this.numFreeNodes > 0) {
			newParent = this.freeNodes[--this.numFreeNodes];
		} else {
			newParent = new (altern_collisions_dbvt_DBVTNode().default)();
		}
		newParent.parent = oldParent;
		newParent.child1 = leaf;
		newParent.child2 = sibling;
		var this9 = newParent.aabb;
		var aabb1 = leaf.aabb;
		var aabb2 = sibling.aabb;
		if(aabb1.minX < aabb2.minX) {
			this9.minX = aabb1.minX;
		} else {
			this9.minX = aabb2.minX;
		}
		if(aabb1.maxX > aabb2.maxX) {
			this9.maxX = aabb1.maxX;
		} else {
			this9.maxX = aabb2.maxX;
		}
		if(aabb1.minY < aabb2.minY) {
			this9.minY = aabb1.minY;
		} else {
			this9.minY = aabb2.minY;
		}
		if(aabb1.maxY > aabb2.maxY) {
			this9.maxY = aabb1.maxY;
		} else {
			this9.maxY = aabb2.maxY;
		}
		if(aabb1.minZ < aabb2.minZ) {
			this9.minZ = aabb1.minZ;
		} else {
			this9.minZ = aabb2.minZ;
		}
		if(aabb1.maxZ > aabb2.maxZ) {
			this9.maxZ = aabb1.maxZ;
		} else {
			this9.maxZ = aabb2.maxZ;
		}
		var margin3 = 0;
		this9.minX -= margin3;
		this9.minY -= margin3;
		this9.minZ -= margin3;
		this9.maxX += margin3;
		this9.maxY += margin3;
		this9.maxZ += margin3;
		newParent.height = sibling.height + 1;
		sibling.parent = newParent;
		leaf.parent = newParent;
		if(sibling == this.root) {
			this.root = newParent;
		} else if(oldParent.child1 == sibling) {
			oldParent.child1 = newParent;
		} else {
			oldParent.child2 = newParent;
		}
		while(true) {
			newParent = this.balance(newParent);
			var c11 = newParent.child1;
			var c21 = newParent.child2;
			var this10 = newParent.aabb;
			var aabb11 = c11.aabb;
			var aabb21 = c21.aabb;
			if(aabb11.minX < aabb21.minX) {
				this10.minX = aabb11.minX;
			} else {
				this10.minX = aabb21.minX;
			}
			if(aabb11.maxX > aabb21.maxX) {
				this10.maxX = aabb11.maxX;
			} else {
				this10.maxX = aabb21.maxX;
			}
			if(aabb11.minY < aabb21.minY) {
				this10.minY = aabb11.minY;
			} else {
				this10.minY = aabb21.minY;
			}
			if(aabb11.maxY > aabb21.maxY) {
				this10.maxY = aabb11.maxY;
			} else {
				this10.maxY = aabb21.maxY;
			}
			if(aabb11.minZ < aabb21.minZ) {
				this10.minZ = aabb11.minZ;
			} else {
				this10.minZ = aabb21.minZ;
			}
			if(aabb11.maxZ > aabb21.maxZ) {
				this10.maxZ = aabb11.maxZ;
			} else {
				this10.maxZ = aabb21.maxZ;
			}
			var margin4 = 0;
			this10.minX -= margin4;
			this10.minY -= margin4;
			this10.minZ -= margin4;
			this10.maxX += margin4;
			this10.maxY += margin4;
			this10.maxZ += margin4;
			var h11 = c11.height;
			var h21 = c21.height;
			if(h11 < h21) {
				newParent.height = h21 + 1;
			} else {
				newParent.height = h11 + 1;
			}
			newParent = newParent.parent;
			if(!(newParent != null)) {
				break;
			}
		}
	}
	getBalance(node) {
		if(node.proxy != null) {
			return 0;
		}
		return node.child1.height - node.child2.height;
	}
	deleteLeaf(leaf) {
		if(leaf == this.root) {
			this.root = null;
			return;
		}
		var parent = leaf.parent;
		var sibling;
		if(parent.child1 == leaf) {
			sibling = parent.child2;
		} else {
			sibling = parent.child1;
		}
		if(parent == this.root) {
			this.root = sibling;
			sibling.parent = null;
			return;
		}
		var grandParent = parent.parent;
		sibling.parent = grandParent;
		if(grandParent.child1 == parent) {
			grandParent.child1 = sibling;
		} else {
			grandParent.child2 = sibling;
		}
		if(this.numFreeNodes < 16384) {
			this.freeNodes[this.numFreeNodes++] = parent;
		}
		while(true) {
			grandParent = this.balance(grandParent);
			var c1 = grandParent.child1;
			var c2 = grandParent.child2;
			var this1 = grandParent.aabb;
			var aabb1 = c1.aabb;
			var aabb2 = c2.aabb;
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
			var h1 = c1.height;
			var h2 = c2.height;
			if(h1 < h2) {
				grandParent.height = h2 + 1;
			} else {
				grandParent.height = h1 + 1;
			}
			grandParent = grandParent.parent;
			if(!(grandParent != null)) {
				break;
			}
		}
	}
	balance(node) {
		var nh = node.height;
		if(nh < 2) {
			return node;
		}
		var p = node.parent;
		var l = node.child1;
		var r = node.child2;
		var lh = l.height;
		var rh = r.height;
		var balance = lh - rh;
		var t;
		if(balance > 1) {
			var ll = l.child1;
			var lr = l.child2;
			var llh = ll.height;
			var lrh = lr.height;
			if(llh > lrh) {
				l.child2 = node;
				node.parent = l;
				node.child1 = lr;
				lr.parent = node;
				var this1 = node.aabb;
				var aabb1 = lr.aabb;
				var aabb2 = r.aabb;
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
				t = lrh - rh;
				node.height = lrh - (t & t >> 31) + 1;
				var this2 = l.aabb;
				var aabb11 = ll.aabb;
				var aabb21 = node.aabb;
				if(aabb11.minX < aabb21.minX) {
					this2.minX = aabb11.minX;
				} else {
					this2.minX = aabb21.minX;
				}
				if(aabb11.maxX > aabb21.maxX) {
					this2.maxX = aabb11.maxX;
				} else {
					this2.maxX = aabb21.maxX;
				}
				if(aabb11.minY < aabb21.minY) {
					this2.minY = aabb11.minY;
				} else {
					this2.minY = aabb21.minY;
				}
				if(aabb11.maxY > aabb21.maxY) {
					this2.maxY = aabb11.maxY;
				} else {
					this2.maxY = aabb21.maxY;
				}
				if(aabb11.minZ < aabb21.minZ) {
					this2.minZ = aabb11.minZ;
				} else {
					this2.minZ = aabb21.minZ;
				}
				if(aabb11.maxZ > aabb21.maxZ) {
					this2.maxZ = aabb11.maxZ;
				} else {
					this2.maxZ = aabb21.maxZ;
				}
				var margin1 = 0;
				this2.minX -= margin1;
				this2.minY -= margin1;
				this2.minZ -= margin1;
				this2.maxX += margin1;
				this2.maxY += margin1;
				this2.maxZ += margin1;
				t = llh - nh;
				l.height = llh - (t & t >> 31) + 1;
			} else {
				l.child1 = node;
				node.parent = l;
				node.child1 = ll;
				ll.parent = node;
				var this3 = node.aabb;
				var aabb12 = ll.aabb;
				var aabb22 = r.aabb;
				if(aabb12.minX < aabb22.minX) {
					this3.minX = aabb12.minX;
				} else {
					this3.minX = aabb22.minX;
				}
				if(aabb12.maxX > aabb22.maxX) {
					this3.maxX = aabb12.maxX;
				} else {
					this3.maxX = aabb22.maxX;
				}
				if(aabb12.minY < aabb22.minY) {
					this3.minY = aabb12.minY;
				} else {
					this3.minY = aabb22.minY;
				}
				if(aabb12.maxY > aabb22.maxY) {
					this3.maxY = aabb12.maxY;
				} else {
					this3.maxY = aabb22.maxY;
				}
				if(aabb12.minZ < aabb22.minZ) {
					this3.minZ = aabb12.minZ;
				} else {
					this3.minZ = aabb22.minZ;
				}
				if(aabb12.maxZ > aabb22.maxZ) {
					this3.maxZ = aabb12.maxZ;
				} else {
					this3.maxZ = aabb22.maxZ;
				}
				var margin2 = 0;
				this3.minX -= margin2;
				this3.minY -= margin2;
				this3.minZ -= margin2;
				this3.maxX += margin2;
				this3.maxY += margin2;
				this3.maxZ += margin2;
				t = llh - rh;
				node.height = llh - (t & t >> 31) + 1;
				var this4 = l.aabb;
				var aabb13 = node.aabb;
				var aabb23 = lr.aabb;
				if(aabb13.minX < aabb23.minX) {
					this4.minX = aabb13.minX;
				} else {
					this4.minX = aabb23.minX;
				}
				if(aabb13.maxX > aabb23.maxX) {
					this4.maxX = aabb13.maxX;
				} else {
					this4.maxX = aabb23.maxX;
				}
				if(aabb13.minY < aabb23.minY) {
					this4.minY = aabb13.minY;
				} else {
					this4.minY = aabb23.minY;
				}
				if(aabb13.maxY > aabb23.maxY) {
					this4.maxY = aabb13.maxY;
				} else {
					this4.maxY = aabb23.maxY;
				}
				if(aabb13.minZ < aabb23.minZ) {
					this4.minZ = aabb13.minZ;
				} else {
					this4.minZ = aabb23.minZ;
				}
				if(aabb13.maxZ > aabb23.maxZ) {
					this4.maxZ = aabb13.maxZ;
				} else {
					this4.maxZ = aabb23.maxZ;
				}
				var margin3 = 0;
				this4.minX -= margin3;
				this4.minY -= margin3;
				this4.minZ -= margin3;
				this4.maxX += margin3;
				this4.maxY += margin3;
				this4.maxZ += margin3;
				t = nh - lrh;
				l.height = nh - (t & t >> 31) + 1;
			}
			if(p != null) {
				if(p.child1 == node) {
					p.child1 = l;
				} else {
					p.child2 = l;
				}
			} else {
				this.root = l;
			}
			l.parent = p;
			return l;
		} else if(balance < -1) {
			var rl = r.child1;
			var rr = r.child2;
			var rlh = rl.height;
			var rrh = rr.height;
			if(rlh > rrh) {
				r.child2 = node;
				node.parent = r;
				node.child2 = rr;
				rr.parent = node;
				var this5 = node.aabb;
				var aabb14 = l.aabb;
				var aabb24 = rr.aabb;
				if(aabb14.minX < aabb24.minX) {
					this5.minX = aabb14.minX;
				} else {
					this5.minX = aabb24.minX;
				}
				if(aabb14.maxX > aabb24.maxX) {
					this5.maxX = aabb14.maxX;
				} else {
					this5.maxX = aabb24.maxX;
				}
				if(aabb14.minY < aabb24.minY) {
					this5.minY = aabb14.minY;
				} else {
					this5.minY = aabb24.minY;
				}
				if(aabb14.maxY > aabb24.maxY) {
					this5.maxY = aabb14.maxY;
				} else {
					this5.maxY = aabb24.maxY;
				}
				if(aabb14.minZ < aabb24.minZ) {
					this5.minZ = aabb14.minZ;
				} else {
					this5.minZ = aabb24.minZ;
				}
				if(aabb14.maxZ > aabb24.maxZ) {
					this5.maxZ = aabb14.maxZ;
				} else {
					this5.maxZ = aabb24.maxZ;
				}
				var margin4 = 0;
				this5.minX -= margin4;
				this5.minY -= margin4;
				this5.minZ -= margin4;
				this5.maxX += margin4;
				this5.maxY += margin4;
				this5.maxZ += margin4;
				t = lh - rrh;
				node.height = lh - (t & t >> 31) + 1;
				var this6 = r.aabb;
				var aabb15 = rl.aabb;
				var aabb25 = node.aabb;
				if(aabb15.minX < aabb25.minX) {
					this6.minX = aabb15.minX;
				} else {
					this6.minX = aabb25.minX;
				}
				if(aabb15.maxX > aabb25.maxX) {
					this6.maxX = aabb15.maxX;
				} else {
					this6.maxX = aabb25.maxX;
				}
				if(aabb15.minY < aabb25.minY) {
					this6.minY = aabb15.minY;
				} else {
					this6.minY = aabb25.minY;
				}
				if(aabb15.maxY > aabb25.maxY) {
					this6.maxY = aabb15.maxY;
				} else {
					this6.maxY = aabb25.maxY;
				}
				if(aabb15.minZ < aabb25.minZ) {
					this6.minZ = aabb15.minZ;
				} else {
					this6.minZ = aabb25.minZ;
				}
				if(aabb15.maxZ > aabb25.maxZ) {
					this6.maxZ = aabb15.maxZ;
				} else {
					this6.maxZ = aabb25.maxZ;
				}
				var margin5 = 0;
				this6.minX -= margin5;
				this6.minY -= margin5;
				this6.minZ -= margin5;
				this6.maxX += margin5;
				this6.maxY += margin5;
				this6.maxZ += margin5;
				t = rlh - nh;
				r.height = rlh - (t & t >> 31) + 1;
			} else {
				r.child1 = node;
				node.parent = r;
				node.child2 = rl;
				rl.parent = node;
				var this7 = node.aabb;
				var aabb16 = l.aabb;
				var aabb26 = rl.aabb;
				if(aabb16.minX < aabb26.minX) {
					this7.minX = aabb16.minX;
				} else {
					this7.minX = aabb26.minX;
				}
				if(aabb16.maxX > aabb26.maxX) {
					this7.maxX = aabb16.maxX;
				} else {
					this7.maxX = aabb26.maxX;
				}
				if(aabb16.minY < aabb26.minY) {
					this7.minY = aabb16.minY;
				} else {
					this7.minY = aabb26.minY;
				}
				if(aabb16.maxY > aabb26.maxY) {
					this7.maxY = aabb16.maxY;
				} else {
					this7.maxY = aabb26.maxY;
				}
				if(aabb16.minZ < aabb26.minZ) {
					this7.minZ = aabb16.minZ;
				} else {
					this7.minZ = aabb26.minZ;
				}
				if(aabb16.maxZ > aabb26.maxZ) {
					this7.maxZ = aabb16.maxZ;
				} else {
					this7.maxZ = aabb26.maxZ;
				}
				var margin6 = 0;
				this7.minX -= margin6;
				this7.minY -= margin6;
				this7.minZ -= margin6;
				this7.maxX += margin6;
				this7.maxY += margin6;
				this7.maxZ += margin6;
				t = lh - rlh;
				node.height = lh - (t & t >> 31) + 1;
				var this8 = r.aabb;
				var aabb17 = node.aabb;
				var aabb27 = rr.aabb;
				if(aabb17.minX < aabb27.minX) {
					this8.minX = aabb17.minX;
				} else {
					this8.minX = aabb27.minX;
				}
				if(aabb17.maxX > aabb27.maxX) {
					this8.maxX = aabb17.maxX;
				} else {
					this8.maxX = aabb27.maxX;
				}
				if(aabb17.minY < aabb27.minY) {
					this8.minY = aabb17.minY;
				} else {
					this8.minY = aabb27.minY;
				}
				if(aabb17.maxY > aabb27.maxY) {
					this8.maxY = aabb17.maxY;
				} else {
					this8.maxY = aabb27.maxY;
				}
				if(aabb17.minZ < aabb27.minZ) {
					this8.minZ = aabb17.minZ;
				} else {
					this8.minZ = aabb27.minZ;
				}
				if(aabb17.maxZ > aabb27.maxZ) {
					this8.maxZ = aabb17.maxZ;
				} else {
					this8.maxZ = aabb27.maxZ;
				}
				var margin7 = 0;
				this8.minX -= margin7;
				this8.minY -= margin7;
				this8.minZ -= margin7;
				this8.maxX += margin7;
				this8.maxY += margin7;
				this8.maxZ += margin7;
				t = nh - rrh;
				r.height = nh - (t & t >> 31) + 1;
			}
			if(p != null) {
				if(p.child1 == node) {
					p.child1 = r;
				} else {
					p.child2 = r;
				}
			} else {
				this.root = r;
			}
			r.parent = p;
			return r;
		}
		return node;
	}
	fix(node) {
		var c1 = node.child1;
		var c2 = node.child2;
		var this1 = node.aabb;
		var aabb1 = c1.aabb;
		var aabb2 = c2.aabb;
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
		var h1 = c1.height;
		var h2 = c2.height;
		if(h1 < h2) {
			node.height = h2 + 1;
		} else {
			node.height = h1 + 1;
		}
	}
	collectGeometryAndTransforms(collider,baseTransform) {
		var s = 0;
		var stack = this._stack;
		stack[s++] = this.root;
		var colliderSphere = DBVT.COLLIDER_SPHERE;
		colliderSphere.x = collider.sphere.x;
		colliderSphere.y = collider.sphere.y;
		colliderSphere.z = collider.sphere.z;
		colliderSphere.w = collider.sphere.w;
		while(--s >= 0) {
			var node = stack[s];
			if(colliderSphere.x + colliderSphere.w > node.aabb.minX && colliderSphere.x - colliderSphere.w < node.aabb.maxX && colliderSphere.y + colliderSphere.w > node.aabb.minY && colliderSphere.y - colliderSphere.w < node.aabb.maxY && colliderSphere.z + colliderSphere.w > node.aabb.minZ && colliderSphere.z - colliderSphere.w < node.aabb.maxZ) {
				if(node.child1 != null) {
					stack[s++] = node.child1;
				}
				if(node.child2 != null) {
					stack[s++] = node.child2;
				}
				if(node.proxy != null && node.proxy.collidable != null) {
					if(node.proxy.transform != null) {
						node.proxy.globalToLocalTransform.combine(node.proxy.inverseTransform,collider.matrix);
						collider.calculateSphere(node.proxy.globalToLocalTransform);
						node.proxy.localToGlobalTransform.combine(collider.inverseMatrix,node.proxy.transform);
						node.proxy.collidable.collectGeometryAndTransforms(collider,node.proxy.localToGlobalTransform);
					} else {
						node.proxy.collidable.collectGeometryAndTransforms(collider,baseTransform);
					}
				}
			}
		}
	}
	intersectRay(origin,direction,output) {
		var s = 0;
		var stack = this._stack;
		stack[s++] = this.root;
		var minData = null;
		var minTime = output.w != 0 ? output.w : direction.w != 0 ? direction.w : 1e22;
		while(--s >= 0) {
			var node = stack[s];
			if((util_geom_GeomUtil().default).boundIntersectRay(origin,direction,node.aabb.minX,node.aabb.minY,node.aabb.minZ,node.aabb.maxX,node.aabb.maxY,node.aabb.maxZ,output)) {
				if(node.child1 != null) {
					stack[s++] = node.child1;
				}
				if(node.child2 != null) {
					stack[s++] = node.child2;
				}
				if(node.proxy != null && node.proxy.raycastable != null) {
					var childOrigin = output;
					var childDirection = direction;
					if(node.proxy.transform != null) {
						childOrigin = new (jeash_geom_Vector3D().default)();
						childDirection = new (jeash_geom_Vector3D().default)();
						var childInverseTransform = node.proxy.inverseTransform;
						childOrigin.x = childInverseTransform.a * origin.x + childInverseTransform.b * origin.y + childInverseTransform.c * origin.z + childInverseTransform.d;
						childOrigin.y = childInverseTransform.e * origin.x + childInverseTransform.f * origin.y + childInverseTransform.g * origin.z + childInverseTransform.h;
						childOrigin.z = childInverseTransform.i * origin.x + childInverseTransform.j * origin.y + childInverseTransform.k * origin.z + childInverseTransform.l;
						childDirection.x = childInverseTransform.a * direction.x + childInverseTransform.b * direction.y + childInverseTransform.c * direction.z;
						childDirection.y = childInverseTransform.e * direction.x + childInverseTransform.f * direction.y + childInverseTransform.g * direction.z;
						childDirection.z = childInverseTransform.i * direction.x + childInverseTransform.j * direction.y + childInverseTransform.k * direction.z;
						childDirection.w = minTime;
					}
					var data = node.proxy.raycastable.intersectRay(childOrigin,childDirection,output);
					if(data != null && data.w < minTime) {
						minTime = data.w;
						minData = data;
					}
				}
			}
		}
		return minData;
	}
	static get COLLIDER_SPHERE() { return COLLIDER_SPHERE; }
	static set COLLIDER_SPHERE(value) { COLLIDER_SPHERE = value; }
}


// Meta

DBVT.__name__ = ["altern","collisions","dbvt","DBVT"];
DBVT.__interfaces__ = [(altern_ray_IRaycastImpl().default),(systems_collisions_ITCollidable().default)];
DBVT.prototype.__class__ = DBVT.prototype.constructor = $hxClasses["altern.collisions.dbvt.DBVT"] = DBVT;

// Init



// Statics

var COLLIDER_SPHERE = new (jeash_geom_Vector3D().default)();

// Export

exports.default = DBVT;