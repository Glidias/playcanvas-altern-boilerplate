// Class: haxe.ds._HashMap.HashMap_Impl_

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../../hxClasses_stub").default;
var $import = require("./../../../import_stub").default;
function haxe_ds__$HashMap_HashMapData() {return require("./../../../haxe/ds/_HashMap/HashMapData");}

// Constructor

class HashMap_Impl_ {
	constructor(){}
	static _new() {
		var this1 = new (haxe_ds__$HashMap_HashMapData().default)();
		return this1;
	}
	static set(this1,k,v) {
		var _this = this1.keys;
		var key = k.hashCode();
		_this.h[key] = k;
		var _this1 = this1.values;
		var key1 = k.hashCode();
		_this1.h[key1] = v;
	}
	static get(this1,k) {
		var _this = this1.values;
		var key = k.hashCode();
		return _this.h[key];
	}
	static exists(this1,k) {
		var _this = this1.values;
		var key = k.hashCode();
		return _this.h.hasOwnProperty(key);
	}
	static remove(this1,k) {
		this1.values.remove(k.hashCode());
		return this1.keys.remove(k.hashCode());
	}
	static keys(this1) {
		return this1.keys.iterator();
	}
	static iterator(this1) {
		return this1.values.iterator();
	}
}


// Meta

HashMap_Impl_.__name__ = ["haxe","ds","_HashMap","HashMap_Impl_"];
HashMap_Impl_.prototype.__class__ = HashMap_Impl_.prototype.constructor = $hxClasses["haxe.ds._HashMap.HashMap_Impl_"] = HashMap_Impl_;

// Init



// Statics



// Export

exports.default = HashMap_Impl_;