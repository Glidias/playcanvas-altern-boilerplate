// Class: hxbit.Macros

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;

// Constructor

class Macros {
	constructor(){}
	static get IN_ENUM_SER() { return IN_ENUM_SER; }
	static set IN_ENUM_SER(value) { IN_ENUM_SER = value; }
}


// Meta

Macros.__name__ = ["hxbit","Macros"];
Macros.prototype.__class__ = Macros.prototype.constructor = $hxClasses["hxbit.Macros"] = Macros;

// Init



// Statics

var IN_ENUM_SER = false;

// Export

exports.default = Macros;