// Class: altern.terrain.TerrainChunkStateList

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function Std() {return require("./../../Std");}

// Constructor

class TerrainChunkStateList {
	constructor() {
	}
	append(entity) {
		entity.parent = this;
		if(this.head != null) {
			this.tail.next = entity;
			entity.prev = this.tail;
			entity.next = null;
			this.tail = entity;
		} else {
			this.head = this.tail = entity;
			entity.next = entity.prev = null;
		}
		this.validate("");
	}
	appendList(entity,lastEntity) {
		var e = entity;
		while(e != null) {
			e.parent = this;
			e = e.next;
		}
		var e1 = entity;
		while(e1 != null) e1 = e1.next;
		if(this.head != null) {
			this.tail.next = entity;
			entity.prev = this.tail;
			this.tail = lastEntity;
		} else {
			this.head = entity;
			this.tail = lastEntity;
		}
	}
	validate(msg) {
		if(this.head != null && this.head.next == null && this.head != this.tail) {
			throw new (js__$Boot_HaxeError().default)("WRONG: Head doesn't match tail when head.next is null" + msg + " : " + (Std().default).string(this.head) + ", " + (Std().default).string(this.tail));
		}
		if(this.head != null && this.tail == null) {
			throw new (js__$Boot_HaxeError().default)("WRONG2_headTail:" + msg + " : " + (Std().default).string(this.head) + ", " + (Std().default).string(this.tail));
		}
		if(this.head != null && this.head == this.tail && this.head.next != null) {
			throw new (js__$Boot_HaxeError().default)("Both head tail is same but why got head.next??");
		}
	}
	getAvailable() {
		var entity = this.head;
		if(entity == null) {
			return null;
		}
		this.head = this.head.next;
		if(this.head != null) {
			this.head.prev = null;
		}
		if(this.tail == entity) {
			this.tail = null;
		}
		entity.next = null;
		entity.parent = null;
		return entity;
	}
	remove(entity) {
		if(this.head == entity) {
			this.head = this.head.next;
		}
		if(this.tail == entity) {
			this.tail = this.tail.prev;
		}
		if(entity.prev != null) {
			entity.prev.next = entity.next;
		}
		if(entity.next != null) {
			entity.next.prev = entity.prev;
		}
		entity.parent = null;
		entity.next = null;
		entity.prev = null;
	}
	removeAll() {
		while(this.head != null) {
			var entity = this.head;
			this.head = this.head.next;
			entity.prev = null;
			entity.next = null;
			entity.parent = null;
		}
		this.tail = null;
	}
}


// Meta

TerrainChunkStateList.__name__ = ["altern","terrain","TerrainChunkStateList"];
TerrainChunkStateList.prototype.__class__ = TerrainChunkStateList.prototype.constructor = $hxClasses["altern.terrain.TerrainChunkStateList"] = TerrainChunkStateList;

// Init



// Statics



// Export

exports.default = TerrainChunkStateList;