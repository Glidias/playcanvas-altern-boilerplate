// Class: haxe.ds.EnumValueMap

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
var $extend = require("./../../extend_stub").default;
function haxe_IMap() {return require("./../../haxe/IMap");}
function haxe_ds_BalancedTree() {return require("./../../haxe/ds/BalancedTree");}
function Reflect() {return require("./../../Reflect");}

// Constructor

class EnumValueMap extends (haxe_ds_BalancedTree().default) {
	constructor() {
		super();
	}
	compare(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) {
			return d;
		}
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	compareArgs(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	compareArg(v1,v2) {
		if((Reflect().default).isEnumValue(v1) && (Reflect().default).isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) {
			return this.compareArgs(v1,v2);
		} else {
			return (Reflect().default).compare(v1,v2);
		}
	}
}


// Meta

EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
EnumValueMap.__interfaces__ = [(haxe_IMap().default)];
EnumValueMap.prototype.__class__ = EnumValueMap.prototype.constructor = $hxClasses["haxe.ds.EnumValueMap"] = EnumValueMap;

// Init



// Statics



// Export

exports.default = EnumValueMap;