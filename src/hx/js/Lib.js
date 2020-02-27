// Class: js.Lib

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function js_Boot() {return require("./../js/Boot");}

// Constructor

class Lib {
	constructor(){}
	static debug() {
		debugger;
	}
	static alert(v) {
		alert((js_Boot().default).__string_rec(v,""));
	}
	static eval(code) {
		return eval(code);
	}
	static get_undefined() {
		return undefined;
	}
}


// Meta

Lib.__name__ = ["js","Lib"];
Lib.prototype.__class__ = Lib.prototype.constructor = $hxClasses["js.Lib"] = Lib;

// Init



// Statics



// Export

exports.default = Lib;