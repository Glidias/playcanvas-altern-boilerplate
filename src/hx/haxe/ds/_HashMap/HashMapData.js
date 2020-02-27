// Class: haxe.ds._HashMap.HashMapData

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function haxe_ds_IntMap() {return require("./../../../haxe/ds/IntMap");}

// Constructor

class HashMapData {
	constructor() {
		this.keys = new (haxe_ds_IntMap().default)();
		this.values = new (haxe_ds_IntMap().default)();
	}
	
}


// Meta

HashMapData.__name__ = ["haxe","ds","_HashMap","HashMapData"];
HashMapData.prototype.__class__ = HashMapData.prototype.constructor = $hxClasses["haxe.ds._HashMap.HashMapData"] = HashMapData;

// Init



// Statics



// Export

exports.default = HashMapData;