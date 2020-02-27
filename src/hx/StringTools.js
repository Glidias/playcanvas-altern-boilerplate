// Class: StringTools

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $import = require("./import_stub").default;
function HxOverrides() {return require("./HxOverrides");}
function EReg() {return require("./EReg");}
function StringBuf() {return require("./StringBuf");}
function Std() {return require("./Std");}

// Constructor

class StringTools {
	constructor(){}
	static urlEncode(s) {
		return encodeURIComponent(s);
	}
	static urlDecode(s) {
		return decodeURIComponent(s.split("+").join(" "));
	}
	static htmlEscape(s,quotes) {
		s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		if(quotes) {
			return s.split("\"").join("&quot;").split("'").join("&#039;");
		} else {
			return s;
		}
	}
	static htmlUnescape(s) {
		return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
	}
	static startsWith(s,start) {
		if(s.length >= start.length) {
			return (HxOverrides().default).substr(s,0,start.length) == start;
		} else {
			return false;
		}
	}
	static endsWith(s,end) {
		var elen = end.length;
		var slen = s.length;
		if(slen >= elen) {
			return (HxOverrides().default).substr(s,slen - elen,elen) == end;
		} else {
			return false;
		}
	}
	static isSpace(s,pos) {
		var c = (HxOverrides().default).cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		var l = s.length;
		var r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return (HxOverrides().default).substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		var l = s.length;
		var r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return (HxOverrides().default).substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
	static lpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		while(s.length < l) s = c + s;
		return s;
	}
	static rpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		while(s.length < l) s += c;
		return s;
	}
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
	static hex(n,digits) {
		var s = "";
		var hexChars = "0123456789ABCDEF";
		while(true) {
			s = hexChars.charAt(n & 15) + s;
			n >>>= 4;
			if(!(n > 0)) {
				break;
			}
		}
		if(digits != null) {
			while(s.length < digits) s = "0" + s;
		}
		return s;
	}
	static fastCodeAt(s,index) {
		return s.charCodeAt(index);
	}
	static isEof(c) {
		return c != c;
	}
	static quoteUnixArg(argument) {
		if(argument == "") {
			return "''";
		}
		if(!new (EReg().default)("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
			return argument;
		}
		return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
	}
	static get winMetaCharacters() { return winMetaCharacters; }
	static set winMetaCharacters(value) { winMetaCharacters = value; }
	static quoteWinArg(argument,escapeMetaCharacters) {
		if(!new (EReg().default)("^[^ \t\\\\\"]+$","").match(argument)) {
			var result_b = "";
			var needquote = argument.indexOf(" ") != -1 || argument.indexOf("\t") != -1 || argument == "";
			if(needquote) {
				result_b += "\"";
			}
			var bs_buf = new (StringBuf().default)();
			var _g1 = 0;
			var _g = argument.length;
			while(_g1 < _g) {
				var i = _g1++;
				var _g2 = (HxOverrides().default).cca(argument,i);
				if(_g2 == null) {
					var c = _g2;
					if(bs_buf.b.length > 0) {
						result_b += (Std().default).string(bs_buf.b);
						bs_buf = new (StringBuf().default)();
					}
					result_b += String.fromCharCode(c);
				} else {
					switch(_g2) {
					case 34:
						var bs = bs_buf.b;
						result_b += bs == null ? "null" : "" + bs;
						result_b += bs == null ? "null" : "" + bs;
						bs_buf = new (StringBuf().default)();
						result_b += "\\\"";
						break;
					case 92:
						bs_buf.b += "\\";
						break;
					default:
						var c1 = _g2;
						if(bs_buf.b.length > 0) {
							result_b += (Std().default).string(bs_buf.b);
							bs_buf = new (StringBuf().default)();
						}
						result_b += String.fromCharCode(c1);
					}
				}
			}
			result_b += (Std().default).string(bs_buf.b);
			if(needquote) {
				result_b += (Std().default).string(bs_buf.b);
				result_b += "\"";
			}
			argument = result_b;
		}
		if(escapeMetaCharacters) {
			var result_b1 = "";
			var _g11 = 0;
			var _g3 = argument.length;
			while(_g11 < _g3) {
				var i1 = _g11++;
				var c2 = (HxOverrides().default).cca(argument,i1);
				if(StringTools.winMetaCharacters.indexOf(c2) >= 0) {
					result_b1 += "^";
				}
				result_b1 += String.fromCharCode(c2);
			}
			return result_b1;
		} else {
			return argument;
		}
	}
}


// Meta

StringTools.__name__ = ["StringTools"];
StringTools.prototype.__class__ = StringTools.prototype.constructor = $hxClasses["StringTools"] = StringTools;

// Init



// Statics

var winMetaCharacters = [32,40,41,37,33,94,34,60,62,38,124,10,13,44,59];

// Export

exports.default = StringTools;