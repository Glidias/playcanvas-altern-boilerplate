// Class: haxe.macro.Error

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;

// Constructor

class Error {
	constructor(m,p) {
		this.message = m;
		this.pos = p;
	}
	toString() {
		return this.message;
	}
}


// Meta

Error.__name__ = ["haxe","macro","Error"];
Error.prototype.__class__ = Error.prototype.constructor = $hxClasses["haxe.macro.Error"] = Error;

// Init



// Statics



// Export

exports.default = Error;