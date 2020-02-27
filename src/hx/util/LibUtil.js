// Class: util.LibUtil

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function js_Boot() {return require("./../js/Boot");}

// Constructor

class LibUtil {
	constructor(){}
	static validInt(val) {
		if(val != null) {
			return !isNaN(val);
		} else {
			return false;
		}
	}
	static is(obj,type) {
		if((js_Boot().default).__instanceof(obj,type)) {
			return obj;
		} else {
			return null;
		}
	}
	static as(obj,type) {
		if((js_Boot().default).__instanceof(obj,type)) {
			return obj;
		} else {
			return null;
		}
	}
}


// Meta

LibUtil.__name__ = ["util","LibUtil"];
LibUtil.prototype.__class__ = LibUtil.prototype.constructor = $hxClasses["util.LibUtil"] = LibUtil;

// Init



// Statics



// Export

exports.default = LibUtil;