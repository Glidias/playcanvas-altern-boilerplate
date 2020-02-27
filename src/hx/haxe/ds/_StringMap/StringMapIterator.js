// Class: haxe.ds._StringMap.StringMapIterator

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;

// Constructor

class StringMapIterator {
	constructor(map,keys) {
		this.map = map;
		this.keys = keys;
		this.index = 0;
		this.count = keys.length;
	}
	hasNext() {
		return this.index < this.count;
	}
	next() {
		var _this = this.map;
		var key = this.keys[this.index++];
		if(__map_reserved[key] != null) {
			return _this.getReserved(key);
		} else {
			return _this.h[key];
		}
	}
}


// Meta

StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
StringMapIterator.prototype.__class__ = StringMapIterator.prototype.constructor = $hxClasses["haxe.ds._StringMap.StringMapIterator"] = StringMapIterator;

// Init



// Statics



// Export

exports.default = StringMapIterator;