// Class: haxe.ds.TreeNode

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function Std() {return require("./../../Std");}

// Constructor

class TreeNode {
	constructor(l,k,v,r,h) {
		if(h == null) {
			h = -1;
		}
		this.left = l;
		this.key = k;
		this.value = v;
		this.right = r;
		if(h == -1) {
			var tmp;
			var _this = this.left;
			var _this1 = this.right;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				var _this2 = this.left;
				if(_this2 == null) {
					tmp = 0;
				} else {
					tmp = _this2._height;
				}
			} else {
				var _this3 = this.right;
				if(_this3 == null) {
					tmp = 0;
				} else {
					tmp = _this3._height;
				}
			}
			this._height = tmp + 1;
		} else {
			this._height = h;
		}
	}
	toString() {
		return (this.left == null ? "" : this.left.toString() + ", ") + ("" + (Std().default).string(this.key) + "=" + (Std().default).string(this.value)) + (this.right == null ? "" : ", " + this.right.toString());
	}
}


// Meta

TreeNode.__name__ = ["haxe","ds","TreeNode"];
TreeNode.prototype.__class__ = TreeNode.prototype.constructor = $hxClasses["haxe.ds.TreeNode"] = TreeNode;

// Init



// Statics



// Export

exports.default = TreeNode;