// Class: util.TypeDefs

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;

// Constructor

class TypeDefs {
	constructor(){}
	static createFloatVector(size,fixed) {
		var arr = [];
		arr.length = size;
		return arr;
	}
	static createIntVector(size,fixed) {
		var arr = [];
		arr.length = size;
		return arr;
	}
	static createUIntVector(size,fixed) {
		var arr = [];
		arr.length = size;
		return arr;
	}
	static createVector(size,fixed) {
		var arr = [];
		arr.length = size;
		return arr;
	}
	static setVectorLen(vec,len,setFixed) {
		if(setFixed == null) {
			setFixed = -1;
		}
		vec.length = len;
	}
}


// Meta

TypeDefs.__name__ = ["util","TypeDefs"];
TypeDefs.prototype.__class__ = TypeDefs.prototype.constructor = $hxClasses["util.TypeDefs"] = TypeDefs;

// Init



// Statics



// Export

exports.default = TypeDefs;