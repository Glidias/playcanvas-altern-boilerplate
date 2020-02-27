// Class: haxe.macro.ComplexTypeTools

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe_macro_Printer() {return require("./../../haxe/macro/Printer");}

// Constructor

class ComplexTypeTools {
	constructor(){}
	static toString(c) {
		return new (haxe_macro_Printer().default)().printComplexType(c);
	}
}


// Meta

ComplexTypeTools.__name__ = ["haxe","macro","ComplexTypeTools"];
ComplexTypeTools.prototype.__class__ = ComplexTypeTools.prototype.constructor = $hxClasses["haxe.macro.ComplexTypeTools"] = ComplexTypeTools;

// Init



// Statics



// Export

exports.default = ComplexTypeTools;