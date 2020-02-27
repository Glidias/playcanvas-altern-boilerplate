// Class: systems.collisions.CollisionEvent

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function util_geom_Vec3() {return require("./../../util/geom/Vec3");}

// Constructor

class CollisionEvent {
	constructor() {
		this.pos = new (util_geom_Vec3().default)();
		this.normal = new (util_geom_Vec3().default)();
		this.dest = new (util_geom_Vec3().default)();
	}
	getNumEvents() {
		var ct = 1;
		var m = this;
		while(true) {
			m = m.next;
			if(!(m != null)) {
				break;
			}
			++ct;
		}
		return ct;
	}
	write(pos,normal,offset,t,dest,geomtype) {
		var output = this.pos;
		output.x = pos.x;
		output.y = pos.y;
		output.z = pos.z;
		var output1 = this.normal;
		output1.x = normal.x;
		output1.y = normal.y;
		output1.z = normal.z;
		var output2 = this.dest;
		output2.x = dest.x;
		output2.y = dest.y;
		output2.z = dest.z;
		this.offset = offset;
		this.t = t;
		this.geomtype = geomtype;
	}
	calcFallbackPosition(radiusX,radiusY,radiusZ,resultPosition) {
		resultPosition.x = this.dest.x;
		resultPosition.y = this.dest.y;
		resultPosition.z = this.dest.z;
	}
	dispose() {
		this.next = CollisionEvent.COLLECTOR;
		CollisionEvent.COLLECTOR = this;
	}
	static get GEOMTYPE_POINT() { return GEOMTYPE_POINT; }
	static set GEOMTYPE_POINT(value) { GEOMTYPE_POINT = value; }
	static get GEOMTYPE_EDGE() { return GEOMTYPE_EDGE; }
	static set GEOMTYPE_EDGE(value) { GEOMTYPE_EDGE = value; }
	static get GEOMTYPE_POLYGON() { return GEOMTYPE_POLYGON; }
	static set GEOMTYPE_POLYGON(value) { GEOMTYPE_POLYGON = value; }
	static get GEOMTYPE_THING() { return GEOMTYPE_THING; }
	static set GEOMTYPE_THING(value) { GEOMTYPE_THING = value; }
	static get TOLERANCE_POLYGON_OVERLAP() { return TOLERANCE_POLYGON_OVERLAP; }
	static set TOLERANCE_POLYGON_OVERLAP(value) { TOLERANCE_POLYGON_OVERLAP = value; }
	static get TOLERANCE_BACKWARDS_T() { return TOLERANCE_BACKWARDS_T; }
	static set TOLERANCE_BACKWARDS_T(value) { TOLERANCE_BACKWARDS_T = value; }
	static get TOLERANCE_TRANSVERSE_DISPLACEMENT() { return TOLERANCE_TRANSVERSE_DISPLACEMENT; }
	static set TOLERANCE_TRANSVERSE_DISPLACEMENT(value) { TOLERANCE_TRANSVERSE_DISPLACEMENT = value; }
	static get TOLERANCE_QUADRATIC_DISCRIMINANT() { return TOLERANCE_QUADRATIC_DISCRIMINANT; }
	static set TOLERANCE_QUADRATIC_DISCRIMINANT(value) { TOLERANCE_QUADRATIC_DISCRIMINANT = value; }
	static get COLLECTOR() { return COLLECTOR; }
	static set COLLECTOR(value) { COLLECTOR = value; }
	static Get(collision,normal,offset,t,dest,geomtype) {
		var c = CollisionEvent.COLLECTOR != null ? CollisionEvent.COLLECTOR : CollisionEvent.COLLECTOR = new CollisionEvent();
		CollisionEvent.COLLECTOR = CollisionEvent.COLLECTOR.next;
		var output = c.pos;
		output.x = collision.x;
		output.y = collision.y;
		output.z = collision.z;
		var output1 = c.normal;
		output1.x = normal.x;
		output1.y = normal.y;
		output1.z = normal.z;
		var output2 = c.dest;
		output2.x = dest.x;
		output2.y = dest.y;
		output2.z = dest.z;
		c.offset = offset;
		c.t = t;
		c.geomtype = geomtype;
		c.next = null;
		return c;
	}
	static GetAs3(pos,normal,offset,t,dest,geomtype) {
		var c = CollisionEvent.COLLECTOR != null ? CollisionEvent.COLLECTOR : CollisionEvent.COLLECTOR = new CollisionEvent();
		CollisionEvent.COLLECTOR = CollisionEvent.COLLECTOR.next;
		var output = c.pos;
		output.x = pos.x;
		output.y = pos.y;
		output.z = pos.z;
		var output1 = c.normal;
		output1.x = normal.x;
		output1.y = normal.y;
		output1.z = normal.z;
		var output2 = c.dest;
		output2.x = dest.x;
		output2.y = dest.y;
		output2.z = dest.z;
		c.offset = offset;
		c.t = t;
		c.geomtype = geomtype;
		c.next = null;
		return c;
	}
	static get(pos,normal,offset,t,dest,geomtype) {
		return CollisionEvent.Get(pos,normal,offset,t,dest,geomtype);
	}
	static getGeomTypeString(type) {
		switch(type) {
		case 1:
			return "POINT";
		case 2:
			return "EDGE";
		case 3:
			return "POLYGON";
		case 4:
			return "THING";
		default:
			return "UNDEF";
		}
	}
}


// Meta

CollisionEvent.__name__ = ["systems","collisions","CollisionEvent"];
CollisionEvent.prototype.__class__ = CollisionEvent.prototype.constructor = $hxClasses["systems.collisions.CollisionEvent"] = CollisionEvent;

// Init



// Statics

var GEOMTYPE_POINT = 1;
var GEOMTYPE_EDGE = 2;
var GEOMTYPE_POLYGON = 3;
var GEOMTYPE_THING = 4;
var TOLERANCE_POLYGON_OVERLAP = 1e-005;
var TOLERANCE_BACKWARDS_T = 1e-006;
var TOLERANCE_TRANSVERSE_DISPLACEMENT = 1e-006;
var TOLERANCE_QUADRATIC_DISCRIMINANT = 1e-006;
var COLLECTOR = new CollisionEvent();

// Export

exports.default = CollisionEvent;