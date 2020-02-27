// Class: altern.culling.CullingPlane

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class CullingPlane {
	constructor() {
	}
	static create() {
		if(CullingPlane.collector != null) {
			var res = CullingPlane.collector;
			CullingPlane.collector = res.next;
			res.next = null;
			return res;
		} else {
			return new CullingPlane();
		}
	}
}


// Meta

CullingPlane.__name__ = ["altern","culling","CullingPlane"];
CullingPlane.prototype.__class__ = CullingPlane.prototype.constructor = $hxClasses["altern.culling.CullingPlane"] = CullingPlane;

// Init



// Statics



// Export

exports.default = CullingPlane;