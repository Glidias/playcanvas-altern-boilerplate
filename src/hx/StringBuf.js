// Class: StringBuf

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $import = require("./import_stub").default;
function Std() {return require("./Std");}
function HxOverrides() {return require("./HxOverrides");}

// Constructor

class StringBuf {
	constructor() {
		this.b = "";
	}
	get_length() {
		return this.b.length;
	}
	add(x) {
		this.b += (Std().default).string(x);
	}
	addChar(c) {
		this.b += String.fromCharCode(c);
	}
	addSub(s,pos,len) {
		this.b += len == null ? (HxOverrides().default).substr(s,pos,null) : (HxOverrides().default).substr(s,pos,len);
	}
	toString() {
		return this.b;
	}
}


// Meta

StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.__class__ = StringBuf.prototype.constructor = $hxClasses["StringBuf"] = StringBuf;

// Init



// Statics



// Export

exports.default = StringBuf;