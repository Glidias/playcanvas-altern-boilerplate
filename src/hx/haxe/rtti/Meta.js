// Class: haxe.rtti.Meta

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}

// Constructor

class Meta {
	constructor(){}
	static getType(t) {
		var meta = Meta.getMeta(t);
		if(meta == null || meta.obj == null) {
			return { };
		} else {
			return meta.obj;
		}
	}
	static isInterface(t) {
		throw new (js__$Boot_HaxeError().default)("Something went wrong");
	}
	static getMeta(t) {
		return t.__meta__;
	}
	static getStatics(t) {
		var meta = Meta.getMeta(t);
		if(meta == null || meta.statics == null) {
			return { };
		} else {
			return meta.statics;
		}
	}
	static getFields(t) {
		var meta = Meta.getMeta(t);
		if(meta == null || meta.fields == null) {
			return { };
		} else {
			return meta.fields;
		}
	}
}


// Meta

Meta.__name__ = ["haxe","rtti","Meta"];
Meta.prototype.__class__ = Meta.prototype.constructor = $hxClasses["haxe.rtti.Meta"] = Meta;

// Init



// Statics



// Export

exports.default = Meta;