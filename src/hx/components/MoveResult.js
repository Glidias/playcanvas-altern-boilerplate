// Class: components.MoveResult

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
var $extend = require("./../extend_stub").default;
function util_geom_Vec3() {return require("./../util/geom/Vec3");}
function systems_collisions_CollisionEvent() {return require("./../systems/collisions/CollisionEvent");}

// Constructor

class MoveResult extends (util_geom_Vec3().default) {
	constructor() {
		super();
	}
	init() {
		this.preventDefault = false;
	}
	disposeCollisions() {
		if(this.collisions != null) {
			var tail = this.collisions;
			while(tail.next != null) tail = tail.next;
			tail.next = (systems_collisions_CollisionEvent().default).COLLECTOR;
			(systems_collisions_CollisionEvent().default).COLLECTOR = this.collisions;
			this.collisions = null;
		}
	}
	setIntegrationNewVelAtCollideTime(resultPos,resultVel,ellip,t) {
		var c = this.collisions;
		var laterCollision = null;
		var earliestCollision = null;
		while(c != null) {
			if(c.t == t) {
				earliestCollision = c;
				break;
			}
			laterCollision = c;
			c = c.next;
		}
		if(earliestCollision != null) {
			if(laterCollision != null) {
				t = laterCollision.t - earliestCollision.t;
				t = 1 / t;
				var radiusX = ellip.x;
				var radiusY = ellip.y;
				var radiusZ = ellip.z;
				resultVel.x = laterCollision.dest.x;
				resultVel.y = laterCollision.dest.y;
				resultVel.z = laterCollision.dest.z;
				resultVel.x -= resultPos.x;
				resultVel.y -= resultPos.y;
				resultVel.z -= resultPos.z;
				resultVel.x *= t;
				resultVel.y *= t;
				resultVel.z *= t;
			} else {
				t = 1 - earliestCollision.t;
				t = 1 / t;
				resultVel.x = this.x - resultPos.x;
				resultVel.y = this.y - resultPos.y;
				resultVel.z = this.z - resultPos.z;
				resultVel.x *= t;
				resultVel.y *= t;
				resultVel.z *= t;
			}
		}
	}
	initIntegration(startPos,resultPos,resultVel,ellip) {
		resultPos.x = startPos.x;
		resultPos.y = startPos.y;
		resultPos.z = startPos.z;
		var t;
		var c = this.collisions;
		if(c != null) {
			var earliestCollision = null;
			var nextCollision = null;
			while(c != null) {
				earliestCollision = c;
				c = c.next;
				if(c == null) {
					break;
				}
				if(c.t != 0) {
					nextCollision = c;
				}
			}
			if(earliestCollision.t != 0) {
				var radiusX = ellip.x;
				var radiusY = ellip.y;
				var radiusZ = ellip.z;
				resultVel.x = earliestCollision.dest.x;
				resultVel.y = earliestCollision.dest.y;
				resultVel.z = earliestCollision.dest.z;
				t = 1 / earliestCollision.t;
				resultVel.x -= startPos.x;
				resultVel.y -= startPos.y;
				resultVel.z -= startPos.z;
			} else if(nextCollision != null) {
				var radiusX1 = ellip.x;
				var radiusY1 = ellip.y;
				var radiusZ1 = ellip.z;
				resultVel.x = nextCollision.dest.x;
				resultVel.y = nextCollision.dest.y;
				resultVel.z = nextCollision.dest.z;
				t = 1 / nextCollision.t;
				resultVel.x -= startPos.x;
				resultVel.y -= startPos.y;
				resultVel.z -= startPos.z;
			} else {
				resultVel.x = this.x - startPos.x;
				resultVel.y = this.y - startPos.y;
				resultVel.z = this.z - startPos.z;
			}
		} else {
			resultVel.x = this.x - startPos.x;
			resultVel.y = this.y - startPos.y;
			resultVel.z = this.z - startPos.z;
		}
	}
	findNearestCollisionEvent(fromTime) {
		var c = this.collisions;
		if(c == null) {
			return null;
		} else {
			var earliestCollision = null;
			while(c != null) {
				if(c.t <= fromTime) {
					break;
				}
				earliestCollision = c;
				c = c.next;
			}
			return earliestCollision;
		}
	}
	truncateCollisionEvents(afterTime) {
		var c = this.collisions;
		var tailCollisionEvent = null;
		while(c != null) {
			if(c.t <= afterTime) {
				break;
			}
			tailCollisionEvent = c;
			c = c.next;
		}
		if(tailCollisionEvent != null) {
			var lastHead = this.collisions;
			this.collisions = tailCollisionEvent.next;
			tailCollisionEvent.next = (systems_collisions_CollisionEvent().default).COLLECTOR;
			(systems_collisions_CollisionEvent().default).COLLECTOR = lastHead;
		}
	}
	addCollisionEvent(e) {
		e.next = this.collisions;
		this.collisions = e;
	}
}


// Meta

MoveResult.__name__ = ["components","MoveResult"];
MoveResult.prototype.__class__ = MoveResult.prototype.constructor = $hxClasses["components.MoveResult"] = MoveResult;

// Init



// Statics



// Export

exports.default = MoveResult;