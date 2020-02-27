// Class: HxOverrides

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $import = require("./import_stub").default;
function js__$Boot_HaxeError() {return require("./js/_Boot/HaxeError");}

// Constructor

class HxOverrides {
	constructor(){}
	static dateStr(date) {
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
	}
	static strDate(s) {
		var _g = s.length;
		switch(_g) {
		case 8:
			var k = s.split(":");
			var d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
		case 10:
			var k1 = s.split("-");
			return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
		case 19:
			var k2 = s.split(" ");
			var y = k2[0].split("-");
			var t = k2[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw new (js__$Boot_HaxeError().default)("Invalid date format : " + s);
		}
	}
	static cca(s,index) {
		var x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static indexOf(a,obj,i) {
		var len = a.length;
		if(i < 0) {
			i += len;
			if(i < 0) {
				i = 0;
			}
		}
		while(i < len) {
			if(a[i] === obj) {
				return i;
			}
			++i;
		}
		return -1;
	}
	static lastIndexOf(a,obj,i) {
		var len = a.length;
		if(i >= len) {
			i = len - 1;
		} else if(i < 0) {
			i += len;
		}
		while(i >= 0) {
			if(a[i] === obj) {
				return i;
			}
			--i;
		}
		return -1;
	}
	static remove(a,obj) {
		var i = a.indexOf(obj);
		if(i == -1) {
			return false;
		}
		a.splice(i,1);
		return true;
	}
	static iter(a) {
		return { cur : 0, arr : a, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	}
}


// Meta

HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.prototype.__class__ = HxOverrides.prototype.constructor = $hxClasses["HxOverrides"] = HxOverrides;

// Init



// Statics



// Export

exports.default = HxOverrides;