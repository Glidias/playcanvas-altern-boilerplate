// Class: haxe.ds.ObjectMap

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

class ObjectMap {
	constructor() {
		this.h = { __keys__ : { }};
	}
	set(key,value) {
		var id = key.__id__ || (key.__id__ = ++ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	get(key) {
		return this.h[key.__id__];
	}
	exists(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	remove(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	keys() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return (HxOverrides().default).iter(a);
	}
	iterator() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	toString() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		var i = it;
		while(i.hasNext()) {
			var i1 = i.next();
			s_b += (Std().default).string((Std().default).string(i1));
			s_b += " => ";
			s_b += (Std().default).string((Std().default).string(this.h[i1.__id__]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	static get count() { return count; }
	static set count(value) { count = value; }
	static assignId(obj) {
		return obj.__id__ = ++ObjectMap.count;
	}
	static getId(obj) {
		return obj.__id__;
	}
}


// Meta

ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
ObjectMap.__interfaces__ = [(haxe_IMap().default)];
ObjectMap.prototype.__class__ = ObjectMap.prototype.constructor = $hxClasses["haxe.ds.ObjectMap"] = ObjectMap;

// Init



// Statics

var count = 0;

// Export

exports.default = ObjectMap;