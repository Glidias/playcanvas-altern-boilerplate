// Class: _Map.Map_Impl_

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function haxe_ds_StringMap() {return require("./../haxe/ds/StringMap");}
function haxe_ds_IntMap() {return require("./../haxe/ds/IntMap");}
function haxe_ds_EnumValueMap() {return require("./../haxe/ds/EnumValueMap");}
function haxe_ds_ObjectMap() {return require("./../haxe/ds/ObjectMap");}

// Constructor

class Map_Impl_ {
	constructor(){}
	static set(this1,key,value) {
		this1.set(key,value);
	}
	static get(this1,key) {
		return this1.get(key);
	}
	static exists(this1,key) {
		return this1.exists(key);
	}
	static remove(this1,key) {
		return this1.remove(key);
	}
	static keys(this1) {
		return this1.keys();
	}
	static iterator(this1) {
		return this1.iterator();
	}
	static toString(this1) {
		return this1.toString();
	}
	static arrayWrite(this1,k,v) {
		this1.set(k,v);
		return v;
	}
	static toStringMap(t) {
		return new (haxe_ds_StringMap().default)();
	}
	static toIntMap(t) {
		return new (haxe_ds_IntMap().default)();
	}
	static toEnumValueMapMap(t) {
		return new (haxe_ds_EnumValueMap().default)();
	}
	static toObjectMap(t) {
		return new (haxe_ds_ObjectMap().default)();
	}
	static fromStringMap(map) {
		return map;
	}
	static fromIntMap(map) {
		return map;
	}
	static fromObjectMap(map) {
		return map;
	}
}


// Meta

Map_Impl_.__name__ = ["_Map","Map_Impl_"];
Map_Impl_.prototype.__class__ = Map_Impl_.prototype.constructor = $hxClasses["_Map.Map_Impl_"] = Map_Impl_;

// Init



// Statics



// Export

exports.default = Map_Impl_;