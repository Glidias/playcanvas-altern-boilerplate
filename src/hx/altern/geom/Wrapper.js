// Class: altern.geom.Wrapper

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class Wrapper {
	constructor() {
	}
	static create() {
		if(Wrapper.collector != null) {
			var res = Wrapper.collector;
			Wrapper.collector = Wrapper.collector.next;
			res.next = null;
			return res;
		} else {
			return new Wrapper();
		}
	}
}


// Meta

Wrapper.__name__ = ["altern","geom","Wrapper"];
Wrapper.prototype.__class__ = Wrapper.prototype.constructor = $hxClasses["altern.geom.Wrapper"] = Wrapper;

// Init



// Statics



// Export

exports.default = Wrapper;