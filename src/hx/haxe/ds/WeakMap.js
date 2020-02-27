// Class: haxe.ds.WeakMap

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe_IMap() {return require("./../../haxe/IMap");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}

// Constructor

class WeakMap {
	constructor() {
		throw new (js__$Boot_HaxeError().default)("Not implemented for this platform");
	}
	set(key,value) {
	}
	get(key) {
		return null;
	}
	exists(key) {
		return false;
	}
	remove(key) {
		return false;
	}
	keys() {
		return null;
	}
	iterator() {
		return null;
	}
	toString() {
		return null;
	}
}


// Meta

WeakMap.__name__ = ["haxe","ds","WeakMap"];
WeakMap.__interfaces__ = [(haxe_IMap().default)];
WeakMap.prototype.__class__ = WeakMap.prototype.constructor = $hxClasses["haxe.ds.WeakMap"] = WeakMap;

// Init



// Statics



// Export

exports.default = WeakMap;