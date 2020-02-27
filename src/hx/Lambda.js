// Class: Lambda

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $iterator = require("./iterator_stub").default;
var $import = require("./import_stub").default;
function List() {return require("./List");}

// Constructor

class Lambda {
	constructor(){}
	static array(it) {
		var a = [];
		var i = $iterator(it)();
		while(i.hasNext()) {
			var i1 = i.next();
			a.push(i1);
		}
		return a;
	}
	static list(it) {
		var l = new (List().default)();
		var i = $iterator(it)();
		while(i.hasNext()) {
			var i1 = i.next();
			l.add(i1);
		}
		return l;
	}
	static map(it,f) {
		var l = new (List().default)();
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			l.add(f(x1));
		}
		return l;
	}
	static mapi(it,f) {
		var l = new (List().default)();
		var i = 0;
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			l.add(f(i++,x1));
		}
		return l;
	}
	static flatten(it) {
		var l = new (List().default)();
		var e = $iterator(it)();
		while(e.hasNext()) {
			var e1 = e.next();
			var x = $iterator(e1)();
			while(x.hasNext()) {
				var x1 = x.next();
				l.add(x1);
			}
		}
		return l;
	}
	static flatMap(it,f) {
		return Lambda.flatten(Lambda.map(it,f));
	}
	static has(it,elt) {
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			if(x1 == elt) {
				return true;
			}
		}
		return false;
	}
	static exists(it,f) {
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			if(f(x1)) {
				return true;
			}
		}
		return false;
	}
	static foreach(it,f) {
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			if(!f(x1)) {
				return false;
			}
		}
		return true;
	}
	static iter(it,f) {
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			f(x1);
		}
	}
	static filter(it,f) {
		var l = new (List().default)();
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			if(f(x1)) {
				l.add(x1);
			}
		}
		return l;
	}
	static fold(it,f,first) {
		var x = $iterator(it)();
		while(x.hasNext()) {
			var x1 = x.next();
			first = f(x1,first);
		}
		return first;
	}
	static count(it,pred) {
		var n = 0;
		if(pred == null) {
			var _ = $iterator(it)();
			while(_.hasNext()) {
				var _1 = _.next();
				++n;
			}
		} else {
			var x = $iterator(it)();
			while(x.hasNext()) {
				var x1 = x.next();
				if(pred(x1)) {
					++n;
				}
			}
		}
		return n;
	}
	static empty(it) {
		return !$iterator(it)().hasNext();
	}
	static indexOf(it,v) {
		var i = 0;
		var v2 = $iterator(it)();
		while(v2.hasNext()) {
			var v21 = v2.next();
			if(v == v21) {
				return i;
			}
			++i;
		}
		return -1;
	}
	static find(it,f) {
		var v = $iterator(it)();
		while(v.hasNext()) {
			var v1 = v.next();
			if(f(v1)) {
				return v1;
			}
		}
		return null;
	}
	static concat(a,b) {
		var l = new (List().default)();
		var x = $iterator(a)();
		while(x.hasNext()) {
			var x1 = x.next();
			l.add(x1);
		}
		var x2 = $iterator(b)();
		while(x2.hasNext()) {
			var x3 = x2.next();
			l.add(x3);
		}
		return l;
	}
}


// Meta

Lambda.__name__ = ["Lambda"];
Lambda.prototype.__class__ = Lambda.prototype.constructor = $hxClasses["Lambda"] = Lambda;

// Init



// Statics



// Export

exports.default = Lambda;