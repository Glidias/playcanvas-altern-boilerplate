// Class: components.Jump

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;

// Constructor

class Jump {
	constructor(timeCooldown,jumpSpeed) {
		this.JUMP_COOLDOWN = timeCooldown;
		this.jump_speed = jumpSpeed;
		this.jump_timer = 0;
		this.enabled = true;
	}
	update(time) {
		this.jump_timer = this.jump_timer - time < 0 ? 0 : this.jump_timer - time;
	}
	attemptJump(velocity,time) {
		var result = this.enabled && this.jump_timer <= 0;
		if(result) {
			velocity.z += this.jump_speed * .04;
			this.jump_timer = this.JUMP_COOLDOWN;
		}
		return result;
	}
	attemptJumpY(velocity,time) {
		var result = this.enabled && this.jump_timer <= 0;
		if(result) {
			velocity.y += this.jump_speed;
			this.jump_timer = this.JUMP_COOLDOWN;
		}
		return result;
	}
	static get EPSILON() { return EPSILON; }
	static set EPSILON(value) { EPSILON = value; }
}


// Meta

Jump.__name__ = ["components","Jump"];
Jump.prototype.__class__ = Jump.prototype.constructor = $hxClasses["components.Jump"] = Jump;

// Init



// Statics

var EPSILON = 0.00001;

// Export

exports.default = Jump;