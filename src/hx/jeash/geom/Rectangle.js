// Class: jeash.geom.Rectangle

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function jeash_geom_Point() {return require("./../../jeash/geom/Point");}

// Constructor

class Rectangle {
	constructor(inX,inY,inWidth,inHeight) {
		this.x = inX == null ? 0 : inX;
		this.y = inY == null ? 0 : inY;
		this.width = inWidth == null ? 0 : inWidth;
		this.height = inHeight == null ? 0 : inHeight;
	}
	get_left() {
		return this.x;
	}
	set_left(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	get_right() {
		return this.x + this.width;
	}
	set_right(r) {
		this.width = r - this.x;
		return r;
	}
	get_top() {
		return this.y;
	}
	set_top(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	get_bottom() {
		return this.y + this.height;
	}
	set_bottom(b) {
		this.height = b - this.y;
		return b;
	}
	get_topLeft() {
		return new (jeash_geom_Point().default)(this.x,this.y);
	}
	set_topLeft(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	get_size() {
		return new (jeash_geom_Point().default)(this.width,this.height);
	}
	set_size(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	get_bottomRight() {
		return new (jeash_geom_Point().default)(this.x + this.width,this.y + this.height);
	}
	set_bottomRight(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	clone() {
		return new Rectangle(this.x,this.y,this.width,this.height);
	}
	contains(inX,inY) {
		if(inX >= this.x && inY >= this.y && inX < this.get_right()) {
			return inY < this.get_bottom();
		} else {
			return false;
		}
	}
	containsPoint(point) {
		return this.contains(point.x,point.y);
	}
	containsRect(rect) {
		if(this.contains(rect.x,rect.y)) {
			return this.containsPoint(rect.get_bottomRight());
		} else {
			return false;
		}
	}
	equals(toCompare) {
		if(this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width) {
			return this.height == toCompare.height;
		} else {
			return false;
		}
	}
	inflate(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	inflatePoint(point) {
		this.inflate(point.x,point.y);
	}
	intersection(toIntersect) {
		var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
		var x1 = this.get_right() > toIntersect.get_right() ? toIntersect.get_right() : this.get_right();
		if(x1 <= x0) {
			return new Rectangle();
		}
		var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom() ? toIntersect.get_bottom() : this.get_bottom();
		if(y1 <= y0) {
			return new Rectangle();
		}
		return new Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	intersects(toIntersect) {
		var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
		var x1 = this.get_right() > toIntersect.get_right() ? toIntersect.get_right() : this.get_right();
		if(x1 <= x0) {
			return false;
		}
		var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom() ? toIntersect.get_bottom() : this.get_bottom();
		return y1 > y0;
	}
	union(toUnion) {
		var x0 = this.x > toUnion.x ? toUnion.x : this.x;
		var x1 = this.get_right() < toUnion.get_right() ? toUnion.get_right() : this.get_right();
		var y0 = this.y > toUnion.y ? toUnion.y : this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom() ? toUnion.get_bottom() : this.get_bottom();
		return new Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	isEmpty() {
		if(this.width == 0) {
			return this.height == 0;
		} else {
			return false;
		}
	}
	offset(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	offsetPoint(point) {
		this.x += point.x;
		this.y += point.y;
	}
	setEmpty() {
		this.x = this.y = this.width = this.height = 0;
	}
	transform(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) {
			tx0 = tx;
		}
		if(ty < ty0) {
			ty0 = ty;
		}
		if(tx > tx1) {
			tx1 = tx;
		}
		if(ty > ty1) {
			ty1 = ty;
		}
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) {
			tx0 = tx;
		}
		if(ty < ty0) {
			ty0 = ty;
		}
		if(tx > tx1) {
			tx1 = tx;
		}
		if(ty > ty1) {
			ty1 = ty;
		}
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) {
			tx0 = tx;
		}
		if(ty < ty0) {
			ty0 = ty;
		}
		if(tx > tx1) {
			tx1 = tx;
		}
		if(ty > ty1) {
			ty1 = ty;
		}
		return new Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	extendBounds(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) {
			this.set_right(r.get_right());
		}
		if(r.get_bottom() > this.get_bottom()) {
			this.set_bottom(r.get_bottom());
		}
	}
}


// Meta

Rectangle.__name__ = ["jeash","geom","Rectangle"];
Rectangle.prototype.__class__ = Rectangle.prototype.constructor = $hxClasses["jeash.geom.Rectangle"] = Rectangle;

// Init



// Statics



// Export

exports.default = Rectangle;