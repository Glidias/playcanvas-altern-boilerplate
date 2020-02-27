// Class: List

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $import = require("./import_stub").default;
function _$List_ListNode() {return require("./_List/ListNode");}
function _$List_ListIterator() {return require("./_List/ListIterator");}
function Std() {return require("./Std");}

// Constructor

class List {
	constructor() {
		this.length = 0;
	}
	add(item) {
		var x = new (_$List_ListNode().default)(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	push(item) {
		var x = new (_$List_ListNode().default)(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	first() {
		if(this.h == null) {
			return null;
		} else {
			return this.h.item;
		}
	}
	last() {
		if(this.q == null) {
			return null;
		} else {
			return this.q.item;
		}
	}
	pop() {
		if(this.h == null) {
			return null;
		}
		var x = this.h.item;
		this.h = this.h.next;
		if(this.h == null) {
			this.q = null;
		}
		this.length--;
		return x;
	}
	isEmpty() {
		return this.h == null;
	}
	clear() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	remove(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	iterator() {
		return new (_$List_ListIterator().default)(this.h);
	}
	toString() {
		var s_b = "";
		var first = true;
		var l = this.h;
		s_b += "{";
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += ", ";
			}
			s_b += (Std().default).string((Std().default).string(l.item));
			l = l.next;
		}
		s_b += "}";
		return s_b;
	}
	join(sep) {
		var s_b = "";
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += sep == null ? "null" : "" + sep;
			}
			s_b += (Std().default).string(l.item);
			l = l.next;
		}
		return s_b;
	}
	filter(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			if(f(v)) {
				l2.add(v);
			}
		}
		return l2;
	}
	map(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			b.add(f(v));
		}
		return b;
	}
}


// Meta

List.__name__ = ["List"];
List.prototype.__class__ = List.prototype.constructor = $hxClasses["List"] = List;

// Init



// Statics



// Export

exports.default = List;