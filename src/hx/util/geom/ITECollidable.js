// Class: util.geom.ITECollidable

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
function systems_collisions_ITCollidable() {return require("./../../systems/collisions/ITCollidable");}
function systems_collisions_IECollidable() {return require("./../../systems/collisions/IECollidable");}

// Constructor

class ITECollidable {
	constructor() {}
	
}


// Meta

ITECollidable.__name__ = ["util","geom","ITECollidable"];
ITECollidable.__interfaces__ = [(systems_collisions_ITCollidable().default),(systems_collisions_IECollidable().default)];
ITECollidable.prototype.__class__ = ITECollidable.prototype.constructor = $hxClasses["util.geom.ITECollidable"] = ITECollidable;

// Init



// Statics



// Export

exports.default = ITECollidable;