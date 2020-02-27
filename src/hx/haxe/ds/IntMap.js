// Class: haxe.ds.IntMap

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe_IMap() {return require("./../../haxe/IMap");}
function HxOverrides() {return require("./../../HxOverrides");}
function Std() {return require("./../../Std");}

// Constructor

class IntMap {
	constructor() {
		this.h = { };
	}
	set(key,value) {
		this.h[key] = value;
	}
	get(key) {
		return this.h[key];
	}
	exists(key) {
		return this.h.hasOwnProperty(key);
	}
	remove(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	keys() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) {
			a.push(key | 0);
		}
		return (HxOverrides().default).iter(a);
	}
	iterator() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	toString() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		var i = it;
		while(i.hasNext()) {
			var i1 = i.next();
			s_b += i1 == null ? "null" : "" + i1;
			s_b += " => ";
			s_b += (Std().default).string((Std().default).string(this.h[i1]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
}


// Meta

IntMap.__name__ = ["haxe","ds","IntMap"];
IntMap.__interfaces__ = [(haxe_IMap().default)];
IntMap.prototype.__class__ = IntMap.prototype.constructor = $hxClasses["haxe.ds.IntMap"] = IntMap;

// Init



// Statics



// Export

exports.default = IntMap;