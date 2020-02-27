// Class: jeash.geom.Point

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class Point {
	constructor(inX,inY) {
		this.x = inX == null ? 0.0 : inX;
		this.y = inY == null ? 0.0 : inY;
	}
	add(v) {
		return new Point(v.x + this.x,v.y + this.y);
	}
	clone() {
		return new Point(this.x,this.y);
	}
	equals(toCompare) {
		if(toCompare.x == this.x) {
			return toCompare.y == this.y;
		} else {
			return false;
		}
	}
	get_length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize(thickness) {
		if(this.x == 0 && this.y == 0) {
			this.x = thickness;
		} else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	offset(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	subtract(v) {
		return new Point(this.x - v.x,this.y - v.y);
	}
	static distance(pt1,pt2) {
		var dx = pt1.x - pt2.x;
		var dy = pt1.y - pt2.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	static interpolate(pt1,pt2,f) {
		return new Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
	}
	static polar(len,angle) {
		return new Point(len * Math.cos(angle),len * Math.sin(angle));
	}
}


// Meta

Point.__name__ = ["jeash","geom","Point"];
Point.prototype.__class__ = Point.prototype.constructor = $hxClasses["jeash.geom.Point"] = Point;

// Init



// Statics



// Export

exports.default = Point;