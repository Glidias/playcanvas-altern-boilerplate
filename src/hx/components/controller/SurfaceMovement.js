// Class: components.controller.SurfaceMovement

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class SurfaceMovement {
	constructor() {
		this.walk_state = 0;
		this.strafe_state = 0;
		this.friction = 0;
		this.WALK_SPEED = 115;
		this.WALKBACK_SPEED = 32;
		this.STRAFE_SPEED = 37;
	}
	resetAllStates() {
		this.walk_state = 0;
		this.strafe_state = 0;
	}
	setWalkSpeeds(forwardSpeed,backspeed) {
		if(backspeed == null) {
			backspeed = -1;
		}
		this.WALK_SPEED = forwardSpeed;
		this.WALKBACK_SPEED = backspeed != -1 ? backspeed : forwardSpeed;
	}
	setStrafeSpeed(val) {
		this.STRAFE_SPEED = val;
	}
	setAllSpeeds(val) {
		this.WALK_SPEED = val;
		this.WALKBACK_SPEED = val;
		this.STRAFE_SPEED = val;
	}
	respond_move_forward() {
		this.walk_state = 1;
	}
	respond_move_back() {
		this.walk_state = -1;
	}
	respond_move_stop() {
		this.walk_state = 0;
	}
	respond_strafe_left() {
		this.strafe_state = -1;
	}
	respond_strafe_right() {
		this.strafe_state = 1;
	}
	respond_strafe_stop() {
		this.strafe_state = 0;
	}
	static get WALK_FORWARD() { return WALK_FORWARD; }
	static set WALK_FORWARD(value) { WALK_FORWARD = value; }
	static get WALK_STOP() { return WALK_STOP; }
	static set WALK_STOP(value) { WALK_STOP = value; }
	static get WALK_BACK() { return WALK_BACK; }
	static set WALK_BACK(value) { WALK_BACK = value; }
	static get STRAFE_LEFT() { return STRAFE_LEFT; }
	static set STRAFE_LEFT(value) { STRAFE_LEFT = value; }
	static get STRAFE_STOP() { return STRAFE_STOP; }
	static set STRAFE_STOP(value) { STRAFE_STOP = value; }
	static get STRAFE_RIGHT() { return STRAFE_RIGHT; }
	static set STRAFE_RIGHT(value) { STRAFE_RIGHT = value; }
	static get STOP_VELOCITY_SQ_LENGTH() { return STOP_VELOCITY_SQ_LENGTH; }
	static set STOP_VELOCITY_SQ_LENGTH(value) { STOP_VELOCITY_SQ_LENGTH = value; }
	static updateWith(time,rotation,velocity,walkState,strafeState,forwardVec,rightVec,WALK_SPEED,WALKBACK_SPEED,STRAFE_SPEED,friction,ground_normal) {
		if(friction == null) {
			friction = .25;
		}
		var multiplier;
		if(ground_normal != null) {
			velocity.x *= friction;
			velocity.y *= friction;
			velocity.z *= friction;
			if(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z < 1) {
				velocity.x = 0;
				velocity.y = 0;
				velocity.z = 0;
			}
			if(rotation != null) {
				forwardVec.x = -Math.sin(rotation.z);
				forwardVec.y = Math.cos(rotation.z);
				forwardVec.z = 0;
			}
			if(forwardVec.x * ground_normal.x + forwardVec.y * ground_normal.y + forwardVec.z * ground_normal.z > 0) {
				multiplier = forwardVec.x * ground_normal.x + forwardVec.y * ground_normal.y + forwardVec.z * ground_normal.z;
				forwardVec.x -= forwardVec.x * multiplier;
				forwardVec.y -= forwardVec.y * multiplier;
				forwardVec.z -= forwardVec.z * multiplier;
			}
			var sc = 1 / Math.sqrt(forwardVec.x * forwardVec.x + forwardVec.y * forwardVec.y + forwardVec.z * forwardVec.z);
			forwardVec.x *= sc;
			forwardVec.y *= sc;
			forwardVec.z *= sc;
			if(walkState != 0) {
				if(walkState != -1) {
					multiplier = WALK_SPEED;
				} else {
					multiplier = -WALKBACK_SPEED;
				}
				velocity.x += forwardVec.x * multiplier;
				velocity.y += forwardVec.y * multiplier;
				velocity.z += forwardVec.z * multiplier;
			}
			rightVec.x = forwardVec.y * ground_normal.z - forwardVec.z * ground_normal.y;
			rightVec.y = forwardVec.z * ground_normal.x - ground_normal.z * forwardVec.x;
			rightVec.z = forwardVec.x * ground_normal.y - forwardVec.y * ground_normal.x;
			var sc1 = 1 / Math.sqrt(rightVec.x * rightVec.x + rightVec.y * rightVec.y + rightVec.z * rightVec.z);
			rightVec.x *= sc1;
			rightVec.y *= sc1;
			rightVec.z *= sc1;
			if(strafeState != 0) {
				if(strafeState != -1) {
					multiplier = STRAFE_SPEED;
				} else {
					multiplier = -STRAFE_SPEED;
				}
				velocity.x += rightVec.x * multiplier;
				velocity.y += rightVec.y * multiplier;
				velocity.z += rightVec.z * multiplier;
			}
		}
	}
}


// Meta

SurfaceMovement.__name__ = ["components","controller","SurfaceMovement"];
SurfaceMovement.prototype.__class__ = SurfaceMovement.prototype.constructor = $hxClasses["components.controller.SurfaceMovement"] = SurfaceMovement;

// Init



// Statics

var WALK_FORWARD = 1;
var WALK_STOP = 0;
var WALK_BACK = -1;
var STRAFE_LEFT = -1;
var STRAFE_STOP = 0;
var STRAFE_RIGHT = 1;
var STOP_VELOCITY_SQ_LENGTH = 1;

// Export

exports.default = SurfaceMovement;