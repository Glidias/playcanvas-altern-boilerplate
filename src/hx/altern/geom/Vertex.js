// Class: altern.geom.Vertex

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class Vertex {
	constructor() {
		this.transformId = 0;
	}
	static create() {
		if(Vertex.collector != null) {
			var res = Vertex.collector;
			Vertex.collector = res.next;
			res.next = null;
			res.transformId = 0;
			res.temp = true;
			return res;
		} else {
			return new Vertex();
		}
	}
}


// Meta

Vertex.__name__ = ["altern","geom","Vertex"];
Vertex.prototype.__class__ = Vertex.prototype.constructor = $hxClasses["altern.geom.Vertex"] = Vertex;

// Init



// Statics



// Export

exports.default = Vertex;