// Class: haxe.Log

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function js_Boot() {return require("./../js/Boot");}

// Constructor

class Log {
	constructor(){}
	static trace(v,infos) {
		(js_Boot().default).__trace(v,infos);
	}
	static clear() {
		(js_Boot().default).__clear_trace();
	}
}


// Meta

Log.__name__ = ["haxe","Log"];
Log.prototype.__class__ = Log.prototype.constructor = $hxClasses["haxe.Log"] = Log;

// Init



// Statics



// Export

exports.default = Log;