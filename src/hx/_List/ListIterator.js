// Class: _List.ListIterator

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;

// Constructor

class ListIterator {
	constructor(head) {
		this.head = head;
	}
	hasNext() {
		return this.head != null;
	}
	next() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
}


// Meta

ListIterator.__name__ = ["_List","ListIterator"];
ListIterator.prototype.__class__ = ListIterator.prototype.constructor = $hxClasses["_List.ListIterator"] = ListIterator;

// Init



// Statics



// Export

exports.default = ListIterator;