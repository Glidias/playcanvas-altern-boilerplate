// Class: IntIterator

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;

// Constructor

class IntIterator {
	constructor(min,max) {
		this.min = min;
		this.max = max;
	}
	hasNext() {
		return this.min < this.max;
	}
	next() {
		return this.min++;
	}
}


// Meta

IntIterator.__name__ = ["IntIterator"];
IntIterator.prototype.__class__ = IntIterator.prototype.constructor = $hxClasses["IntIterator"] = IntIterator;

// Init



// Statics



// Export

exports.default = IntIterator;