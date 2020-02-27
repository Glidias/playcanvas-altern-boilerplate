// Class: hxbit.Schema

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
function hxbit_Serializable() {return require("./../hxbit/Serializable");}
function hxbit_Serializer() {return require("./../hxbit/Serializer");}
function haxe_crypto_Crc32() {return require("./../haxe/crypto/Crc32");}
function haxe_io_Bytes() {return require("./../haxe/io/Bytes");}
function hxbit_enumSer_hxbit_$PropTypeDesc() {return require("./../hxbit/enumSer/hxbit_PropTypeDesc");}
function hxbit_PropTypeDesc() {return require("./../hxbit/PropTypeDesc");}

// Constructor

class Schema {
	constructor() {
		this.__uid = (hxbit_Serializer().default).SEQ << 24 | ++(hxbit_Serializer().default).UID;
		this.fieldsNames = [];
		this.fieldsTypes = [];
	}
	get_checkSum() {
		var s = new (hxbit_Serializer().default)();
		s.begin();
		var old = this.__uid;
		this.__uid = 0;
		s.addKnownRef(this);
		this.__uid = old;
		var bytes = s.end();
		return (haxe_crypto_Crc32().default).make(bytes);
	}
	getCLID() {
		return Schema.__clid;
	}
	serialize(__ctx) {
		__ctx.out.b.push(this.isFinal ? 1 : 0);
		var a = this.fieldsNames;
		if(a == null) {
			__ctx.out.b.push(0);
		} else {
			var v = a.length + 1;
			if(v >= 0 && v < 128) {
				__ctx.out.b.push(v);
			} else {
				__ctx.out.b.push(128);
				__ctx.out.addInt32(v);
			}
			var _g = 0;
			while(_g < a.length) {
				var v1 = a[_g];
				++_g;
				if(v1 == null) {
					__ctx.out.b.push(0);
				} else {
					var b = (haxe_io_Bytes().default).ofString(v1);
					var v2 = b.length + 1;
					if(v2 >= 0 && v2 < 128) {
						__ctx.out.b.push(v2);
					} else {
						__ctx.out.b.push(128);
						__ctx.out.addInt32(v2);
					}
					var _this = __ctx.out;
					var b1 = _this.b;
					var b2 = b.b;
					var _g1 = 0;
					var _g2 = b.length;
					while(_g1 < _g2) {
						var i = _g1++;
						_this.b.push(b2[i]);
					}
				}
			}
		}
		var a1 = this.fieldsTypes;
		if(a1 == null) {
			__ctx.out.b.push(0);
		} else {
			var v3 = a1.length + 1;
			if(v3 >= 0 && v3 < 128) {
				__ctx.out.b.push(v3);
			} else {
				__ctx.out.b.push(128);
				__ctx.out.addInt32(v3);
			}
			var _g3 = 0;
			while(_g3 < a1.length) {
				var v4 = a1[_g3];
				++_g3;
				(hxbit_enumSer_hxbit_$PropTypeDesc().default).doSerialize(__ctx,v4);
			}
		}
	}
	getSerializeSchema() {
		var schema = new Schema();
		schema.fieldsNames.push("isFinal");
		schema.fieldsTypes.push((hxbit_PropTypeDesc().default).PBool);
		schema.fieldsNames.push("fieldsNames");
		schema.fieldsTypes.push((hxbit_PropTypeDesc().default).PArray((hxbit_PropTypeDesc().default).PString));
		schema.fieldsNames.push("fieldsTypes");
		schema.fieldsTypes.push((hxbit_PropTypeDesc().default).PArray((hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc")));
		schema.isFinal = (hxbit_Serializer().default).isClassFinal(Schema.__clid);
		return schema;
	}
	unserializeInit() {
	}
	unserialize(__ctx) {
		this.isFinal = __ctx.input.b[__ctx.inPos++] != 0;
		var e0;
		var v = __ctx.input.b[__ctx.inPos++];
		if(v == 128) {
			v = __ctx.input.getInt32(__ctx.inPos);
			__ctx.inPos += 4;
		}
		var len = v;
		var tmp;
		if(len == 0) {
			tmp = null;
		} else {
			--len;
			var a = [];
			var _g1 = 0;
			var _g = len;
			while(_g1 < _g) {
				var i = _g1++;
				var v1 = __ctx.input.b[__ctx.inPos++];
				if(v1 == 128) {
					v1 = __ctx.input.getInt32(__ctx.inPos);
					__ctx.inPos += 4;
				}
				var len1 = v1;
				if(len1 == 0) {
					e0 = null;
				} else {
					--len1;
					var s = __ctx.input.getString(__ctx.inPos,len1);
					__ctx.inPos += len1;
					e0 = s;
				}
				a[i] = e0;
			}
			tmp = a;
		}
		this.fieldsNames = tmp;
		var e01;
		var v2 = __ctx.input.b[__ctx.inPos++];
		if(v2 == 128) {
			v2 = __ctx.input.getInt32(__ctx.inPos);
			__ctx.inPos += 4;
		}
		var len2 = v2;
		var tmp1;
		if(len2 == 0) {
			tmp1 = null;
		} else {
			--len2;
			var a1 = [];
			var _g11 = 0;
			var _g2 = len2;
			while(_g11 < _g2) {
				var i1 = _g11++;
				var __e = (hxbit_enumSer_hxbit_$PropTypeDesc().default).doUnserialize(__ctx);
				e01 = __e;
				a1[i1] = e01;
			}
			tmp1 = a1;
		}
		this.fieldsTypes = tmp1;
	}
	static get __clid() { return __clid; }
	static set __clid(value) { __clid = value; }
}


// Meta

Schema.__name__ = ["hxbit","Schema"];
Schema.__interfaces__ = [(hxbit_Serializable().default)];
Schema.prototype.__class__ = Schema.prototype.constructor = $hxClasses["hxbit.Schema"] = Schema;

// Init



// Statics

var __clid = (hxbit_Serializer().default).registerClass(Schema);

// Export

exports.default = Schema;