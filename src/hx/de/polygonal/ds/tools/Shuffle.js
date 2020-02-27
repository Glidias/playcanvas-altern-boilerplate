// Class: de.polygonal.ds.tools.Shuffle

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../../hxClasses_stub").default;
var $import = require("./../../../../import_stub").default;

// Constructor

class Shuffle {
	constructor(){}
	static _f() {
		return Math.random();
	}
	static setRandom(f) {
		Shuffle._f = f;
	}
	static frand() {
		return Shuffle._f();
	}
}


// Meta

Shuffle.__name__ = ["de","polygonal","ds","tools","Shuffle"];
Shuffle.prototype.__class__ = Shuffle.prototype.constructor = $hxClasses["de.polygonal.ds.tools.Shuffle"] = Shuffle;

// Init



// Statics



// Export

exports.default = Shuffle;