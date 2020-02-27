// Class: haxe.ds.StringMap

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe_IMap() {return require("./../../haxe/IMap");}
function HxOverrides() {return require("./../../HxOverrides");}
function haxe_ds__$StringMap_StringMapIterator() {return require("./../../haxe/ds/_StringMap/StringMapIterator");}
function Std() {return require("./../../Std");}

// Constructor

class StringMap {
	constructor() {
		this.h = { };
	}
	isReserved(key) {
		return __map_reserved[key] != null;
	}
	set(key,value) {
		if(__map_reserved[key] != null) {
			this.setReserved(key,value);
		} else {
			this.h[key] = value;
		}
	}
	get(key) {
		if(__map_reserved[key] != null) {
			return this.getReserved(key);
		}
		return this.h[key];
	}
	exists(key) {
		if(__map_reserved[key] != null) {
			return this.existsReserved(key);
		}
		return this.h.hasOwnProperty(key);
	}
	setReserved(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	getReserved(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	existsReserved(key) {
		if(this.rh == null) {
			return false;
		}
		return this.rh.hasOwnProperty("$" + key);
	}
	remove(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) {
				return false;
			}
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) {
				return false;
			}
			delete(this.h[key]);
			return true;
		}
	}
	keys() {
		return (HxOverrides().default).iter(this.arrayKeys());
	}
	arrayKeys() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
	iterator() {
		return new (haxe_ds__$StringMap_StringMapIterator().default)(this,this.arrayKeys());
	}
	toString() {
		var s_b = "";
		s_b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			s_b += k == null ? "null" : "" + k;
			s_b += " => ";
			s_b += (Std().default).string((Std().default).string(__map_reserved[k] != null ? this.getReserved(k) : this.h[k]));
			if(i < keys.length - 1) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
}


// Meta

StringMap.__name__ = ["haxe","ds","StringMap"];
StringMap.__interfaces__ = [(haxe_IMap().default)];
StringMap.prototype.__class__ = StringMap.prototype.constructor = $hxClasses["haxe.ds.StringMap"] = StringMap;

// Init

var __map_reserved = {};;

// Statics



// Export

exports.default = StringMap;